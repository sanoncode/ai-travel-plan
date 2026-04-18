// /api/ai/generate-trip.js

/* eslint-env node */
export default async function handler(req, res) {
  
  const API_KEY = process.env.OPENAI_API_KEY
  const SYSTEM_PROMPT = process.env.SYSTEM_PROMPT
  try {
    const { formData } = JSON.parse(req.body);
    
    const response = await fetch(" ", {
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

    const data = await response.json();
    console.log(data, 'data')

    const text = data.choices[0].message.content;

    res.status(200).json({
      parsed: JSON.parse(text), // sama kayak flow lo sekarang
    });
  } catch (err) {
    res.status(500).json({ error: "AI_FAILED" });
  }
}