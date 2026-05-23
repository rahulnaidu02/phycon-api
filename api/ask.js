export default async function handler(req, res) {

  // CORS HEADERS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {
    const { question } = req.body;

    const systemPrompt = `
You are the AI voice assistant for PHYCON.

PHYCON is the world's first voice-first community for physical AI and conversational AI founders.

Topics include:
- conversational AI architecture
- robotics
- physical AI
- founder traction
- pilots
- fundraising
- deployment
- voice-native systems
- real-world autonomy
- customer acquisition
- manufacturing scale
- agent systems
- multimodal AI

Core founder principles:
- validate with buyers early
- retrofit-first strategies matter
- traction before overbuilding
- pilots are critical
- operators are often the real customer
- real-world deployment matters more than demos

Keep responses practical, concise, founder-oriented, and conversational.
`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "qwen/qwen-2.5-72b-instruct",
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: question
          }
        ]
      })
    });

    const data = await response.json();

    const answer =
      data?.choices?.[0]?.message?.content ||
      "No response generated.";

    return res.status(200).json({
      answer
    });

  } catch (error) {

    return res.status(500).json({
      error: error.message
    });
  }
}
