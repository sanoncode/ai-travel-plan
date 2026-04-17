// /api/ai/generate-trip.js
export default async function handler(req, res) {
  try {
    const { formData } = JSON.parse(req.body);

    const response = await fetch("", {
      method: "POST",
      headers: {
        Authorization: `fBearer ${process.env.GROQAI_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // murah
        messages: [
          {
            role: "system",
            content: "You are a travel planner AI",
          },
          {
            role: "user",
            content: `Generate trip plan: ${JSON.stringify(formData)}`,
          },
        ],
      }),
    });

    const data = await response.json();

    const text = data.choices[0].message.content;

    res.status(200).json({
      parsed: JSON.parse(text), // sama kayak flow lo sekarang
    });
  } catch (err) {
    res.status(500).json({ error: "AI_FAILED" });
  }
}