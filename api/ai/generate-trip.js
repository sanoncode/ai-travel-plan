// /api/ai/generate-trip.js

import { supabase } from "../lib/supabaseServer.js";

/* eslint-env node */
export default async function handler(req, res) {
  // const API_URL = process.env.AI_API_URL;

  const API_KEY = process.env.OPENAI_API_KEY;
  const SYSTEM_PROMPT = process.env.SYSTEM_PROMPT;

  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "NO_TOKEN" });
    }

    const token = authHeader.split(" ")[1];

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser(token);

    if (userError || !user) {
      return res.status(401).json({ error: "INVALID_TOKEN" });
    }

    const userId = user.id;

    const formData = req.body.formData

    const aiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // murah
        messages: [
          {
            role: "system",
            content: `${SYSTEM_PROMPT}`,
          },
          {
            role: "user",
            content: `Generate trip plan: ${JSON.stringify(formData)}`,
          },
        ],
      }),
    });
        if (!aiResponse.ok) {
      const text = await aiResponse.text();
      console.error("AI ERROR:", text);
      return res.status(500).json({ error: "AI_FAILED" });
    }


    const data = await aiResponse.json();
    const parsed = JSON.parse(data.choices[0].message.content);

    const { data: trip, error: supaError } = await supabase
      .from("trips")
      .insert([
        {
          user_id: userId,
          form_data: formData,
          result: parsed,
        },
      ])
      .select()
      .single();

    if (supaError) {
        console.error('SUPABASE ERROR', supaError )
        return res.status(500).json({ error: "SUPA_ERROR" });
    }

    res.status(200).json(trip);
  } catch (err) {
    console.error("FULL ERROR:", err);
    res.status(500).json({ error: err.message });
  }
}
