// /api/ai/generate-trip.js

import { checkLimitTrip } from "../../server/lib/limitTrip.js";
import { supabase } from "../../server/lib/supabaseServer.js";
import { API_ERRORS } from '../../src/lib/errors/apiErrors.js'
/* eslint-env node */
export default async function handler(req, res) {
  const API_URL = process.env.AI_API_URL;

  const API_KEY = process.env.OPENAI_API_KEY;
  const SYSTEM_PROMPT = process.env.SYSTEM_PROMPT;

  try {
    
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: API_ERRORS.NO_TOKEN });
    }

    const token = authHeader.split(" ")[1];

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser(token);

    if (userError || !user) {
      return res.status(401).json({ error: API_ERRORS.INVALID_TOKEN });
    }

    const userId = user.id;

    const isLimitReached = await checkLimitTrip({userId})
    
    if (isLimitReached) {

      return res.status(429).json({
        error: API_ERRORS.DAILY_LIMIT_REACHED,
      })
    }

    const formData = req.body.formData

    const aiResponse = await fetch(`${API_URL}`, {
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
        const errorData = await aiResponse.json()
        const code = errorData.error?.code
        const type = errorData.error?.type
       if (code === "insufficient_quota") {
        return res.status(429).json({
          error: API_ERRORS.AI_QUOTA_EXCEEDED,
        });
      }

      if (type === "rate_limit_error") {
        return res.status(429).json({
          error: API_ERRORS.AI_RATE_LIMIT,
        });
      }

      return res.status(500).json({
        error: API_ERRORS.AI_FAILED,
      });
    }
      const now = new Date()
      const createdDate = now.toISOString().split("T")[0] 
      // hasil: "2026-04-30" || hari ini

    const data = await aiResponse.json();

    const parsed = JSON.parse(data.choices[0].message.content);

    const { data: trip, error: supaError } = await supabase
      .from("trips")
      .insert([
        {
          user_id: userId,
          form_data: formData,
          result: parsed,
          created_date: createdDate
        },
      ])
      .select()
      .single();

    if (supaError) {
      
      return res.status(500).json({ error: API_ERRORS.SUPA_ERROR });
    }

    res.status(200).json(trip);
  } catch (err) {
    console.log(err, 'err')
    res.status(500).json({ error: API_ERRORS.UNKNOWN_ERROR });
  }
}
