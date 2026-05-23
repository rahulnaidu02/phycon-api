export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { question } = req.body;

  const prfaq = `
Physical AI Founder Coach

Core philosophy:
- Validate the buyer, not only the user
- Paid pilots beat compliments
- Narrow wedges beat bloated first products
- Retrofit-first should always be considered
- Manufacturing risk must be earned, not hand-waved
- Operators and technicians matter
- End-user love matters only if it translates into buyer ROI
- The first product does not need to express the full vision
- Do not confuse momentum with traction
- Physical AI companies need field evidence

Important concepts:
- In physical AI, the end user is often NOT the buyer
- Buyers may be operators, facilities managers, contractors, fleet owners, hospitals, logistics operators, or deployment owners
- The founder must validate:
  - Who pays
  - Who deploys
  - Who services
  - Who owns operational risk
  - Who expands from pilot to scale

Important traction guidance:
Real traction includes:
- Paid pilots
- LOIs with specific terms
- Customer-funded prototypes
- Strategic design partnerships
- Field deployments
- Expansion commitments

Weak traction includes:
- "Interesting"
- "Keep me posted"
- Positive demo reactions
- Investor curiosity
- User excitement without payment

COPA lesson:
COPA initially validated end-user excitement around premium portable sanitation, but the real buyer was the portable restroom operator. Operators cared about:
- Fleet economics
- Serviceability
- Route planning
- Maintenance
- Deployment logistics
- Reliability
- ROI

Important startup guidance:
Before building full hardware ask:
- What is the narrowest wedge?
- Could telemetry alone prove value?
- Could retrofit modules work?
- Could dashboards or workflow automation prove ROI?
- What is the smallest paid pilot?

Physical AI founder mistakes:
- Overbuilding too early
- Confusing user love with buyer validation
- Spending heavily before pilot commitments
- Combining too many innovations at once
- Avoiding pricing conversations
- Talking mostly to advisors instead of buyers

Investor guidance:
Investors care about:
- Manufacturing risk
- Gross margins
- Deployment complexity
- Serviceability
- Paid pilots
- Clear buyer
- Scalability
- Team capability

Good founder behavior:
- Sequence risk intelligently
- Reduce variables
- Test buyer willingness to pay early
- Focus on operational workflows
- Validate before scaling manufacturing
- Ask for specific commitments

Good customer questions:
- Who signs the pilot?
- What budget does this come from?
- What would make you buy now?
- What proof do you need?
- What would stop deployment?
- What is the operational pain today?
- What would make this a must-have?

Good operator questions:
- What causes emergency calls?
- What breaks most often?
- What complaints happen most?
- What data would help operations?
- What would reduce labor?
- What would reduce downtime?

Retrofit-first guidance:
Instead of building full hardware immediately, founders should consider:
- Sensors
- Telemetry
- Dashboards
- Workflow software
- Monitoring systems
- Alerting systems
- Add-on automation modules

Co-founder guidance:
Solo founders can build physical AI startups, but they must compensate with:
- Advisors
- Contractors
- Industry angels
- Design partners
- Clear scope
- Strong capital discipline

Trade show guidance:
Trade shows are useful for:
- Buyer discovery
- Pilot conversations
- Objection discovery
- Industry networking
- Customer interviews

But not useful for vanity metrics.

Good founder mindset:
- Separate signal from noise
- Validate narrowly
- Dream big but sequence risk carefully
- Focus on deployment reality
- Push toward paid pilots
`;

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
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
              content: `You are PhyCon Founder, a practical advisor for physical AI, robotics, IoT, automation, hardware, and connected infrastructure founders.

Use the provided PRFAQ knowledge when answering.

Rules:
- Be concise
- Be practical
- Avoid generic startup advice
- Do not blindly encourage founders
- Push founders toward buyer validation and paid pilots
- If uncertain, explain what needs to be tested
- Avoid buzzword-heavy responses
- Focus on operational reality`
            },
            {
              role: "system",
              content: prfaq
            },
            {
              role: "user",
              content: question
            }
          ],
          temperature: 0.5,
          max_tokens: 500
        })
      }
    );

    const data = await response.json();

    res.status(200).json({
      answer: data.choices?.[0]?.message?.content || "No answer"
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
}
