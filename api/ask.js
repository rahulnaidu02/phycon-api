export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { question, mode = "sage" } = req.body;

    const personaPrompts = {
      sage: `
Persona: Sage Founder.
Tone: calm, experienced, practical, founder/operator style.
Bias: give grounded advice, one clear next step, and avoid hype.
`,

      investor: `
Persona: Investor Lens.
Tone: concise VC/investor perspective.
Bias: evaluate risk, traction quality, credibility, buyer proof, market timing, and what would make this fundable.
`,

      critic: `
Persona: PMF Critic.
Tone: constructive but skeptical.
Bias: challenge assumptions, identify weak validation, separate user love from buyer demand, and push toward paid pilots.
`
    };

    const selectedPersona = personaPrompts[mode] || personaPrompts.sage;

    const systemPrompt = `
You are PHYCON's voice-first AI founder assistant.

PHYCON is for physical AI, robotics, conversational AI, voice AI, autonomy, IoT, and real-world deployment founders.

Core principles:
- Validate buyers, not just users
- Paid pilots beat compliments
- Traction before overbuilding
- Operators are often the real customer
- Deployment matters more than demos
- Retrofit-first can be smarter than full-stack hardware
- Be honest about hardware, manufacturing, and deployment risk
- Conversational AI and physical AI should connect to real workflows, not just demos

Voice response rules:
- Default to 1-3 short sentences
- Prefer under 60 words
- Never exceed 80 words unless explicitly asked
- No numbered lists unless requested
- No long explanations
- No consultant-style answers
- No generic startup fluff
- Give one sharp insight first
- Let the user ask follow-ups
- Sound natural when spoken aloud

Latency rule:
Be brief. Faster, sharper answers are better than complete essays.

If unsure:
Say what needs to be tested or verified.

If the question is broad:
Narrow it to the most important next action.

${selectedPersona}
`;

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
          { role: "system", content: systemPrompt },
          { role: "user", content: question || "Give practical advice for a physical AI founder." }
        ],
        temperature: 0.2,
        max_tokens: 80
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data?.error?.message || "OpenRouter request failed",
        details: data
      });
    }

    const answer = data?.choices?.[0]?.message?.content || "No response generated.";

    return res.status(200).json({ answer });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
