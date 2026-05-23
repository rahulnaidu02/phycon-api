export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { question } = req.body;

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://phyconfounder.base44.app",
      "X-OpenRouter-Title": "PhyCon Founder"
    },
    body: JSON.stringify({
      model: "qwen/qwen-2.5-7b-instruct",
      messages: [
        {
          role: "system",
          content: "You are a practical advisor for physical AI and hardware founders. Give grounded and actionable advice."
        },
        {
          role: "user",
          content: question
        }
      ]
    })
  });

  const data = await response.json();

  res.status(200).json({
    answer: data.choices?.[0]?.message?.content || "No answer"
  });
}