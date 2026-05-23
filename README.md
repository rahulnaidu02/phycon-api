PHYCON

Conversational AI × Physical AI
Voice-first infrastructure for founders building real-world AI systems.

Overview

PHYCON is a voice-first founder platform focused on:

Physical AI
Robotics
Conversational AI
Voice agents
Deployment systems
Customer pilots
Fundraising
Real-world autonomy

Instead of building another text-heavy AI community, PHYCON is designed as a conversational operating layer for founders building real-world systems.

The experience is intentionally:

voice-native
low-latency
conversational
operationally grounded
founder-centric
Core Philosophy

Most AI products optimize for:

content generation
productivity
generic chatbot UX

PHYCON optimizes for:

thinking out loud
rapid founder iteration
deployment discussions
operational advice
real-world constraints
conversational interaction

The goal is to create an experience where founders can:

speak naturally
interrupt naturally
iterate rapidly
receive contextual advice
simulate investor and operator feedback
Product Direction

PHYCON combines:

Area	Focus
Conversational AI	Voice-native interaction
Physical AI	Real-world deployment
Robotics	Operational systems
Founder tooling	Traction, pilots, PMF
AI infrastructure	Fast conversational orchestration
Current Architecture
Frontend
Base44

Used for:

rapid UI iteration
conversational UX
orb animations
interaction flows
voice-first interface experimentation
Backend
Vercel Serverless Functions

Used for:

API hosting
lightweight orchestration
request routing
persona handling
model abstraction

Current endpoint:

/api/ask
LLM Gateway
OpenRouter

Used for:

model routing
fast experimentation
open-source model access
lightweight inference

Models tested:

Qwen
Mistral
lightweight open-source conversational models

Optimization priority:

latency
conversational feel
voice responsiveness

Not maximum reasoning quality.

Current Voice Stack
Speech-to-Text

Current:

Browser SpeechRecognition
webkitSpeechRecognition

Benefits:

free
low setup complexity
fast prototyping
Text-to-Speech

Current:

browser speechSynthesis

Benefits:

instant integration
free
low latency
Current Interaction Flow
User taps orb
    ↓
Browser microphone activates
    ↓
Speech transcription
    ↓
POST request to Vercel backend
    ↓
OpenRouter inference
    ↓
Short conversational response
    ↓
Browser TTS playback
Orb Interaction States
Idle

Waiting for interaction.

Listening

Microphone active.
Capturing speech.

Thinking

Backend inference in progress.

Responding

Voice playback active.

Voice UX Principles

PHYCON is intentionally optimized for:

short responses
spoken clarity
low latency
interruption support
conversational pacing

Responses should:

sound natural aloud
avoid long essays
avoid overexplaining
feel emotionally conversational
stay concise
Persona System

Users can choose conversational styles.

Sage Founder

Calm, strategic, experienced.

Investor Lens

Market-focused, traction-focused, ROI-oriented.

PMF Critic

Critical, skeptical, product-market-fit focused.

Current Goals
Product Goals
sub-1.5s response latency
conversational interaction
voice-first UX
interruptible conversations
real-world founder utility
Founder Focus Areas
customer traction
deployment strategy
robotics pilots
fundraising
conversational AI architecture
operational scaling
customer acquisition
real-world deployment
Current MVP Priorities
Phase 1

Fast conversational MVP.

Current stack:

Browser STT
+
OpenRouter
+
Browser TTS
+
Vercel orchestration

Goal:
validate conversational interaction quality before building deeper infrastructure.

Future Architecture
Planned Improvements
Dedicated STT

Potential:

Deepgram
OpenAI Realtime
Dedicated TTS

Potential:

ElevenLabs
Cartesia
OpenAI voice
Streaming Responses

Future goal:
start voice playback before full response generation finishes.

Persistent Memory

Potential:

Prisma
Supabase
Redis

Used for:

founder continuity
conversational memory
advisor context retention
Intent Routing

Future conversational orchestration layer:

interruption handling
barge-in support
response prioritization
conversational state management
Design Principles
Voice-First

Not chatbot-first.
Not dashboard-first.

The interaction should feel conversational before it feels like software.

Real-World Orientation

PHYCON prioritizes:

deployment reality
operator feedback
customer validation
traction mechanics
operational constraints

Over:

hype
theoretical AI discussions
generic startup advice
Example Discussion Areas
Conversational AI architecture
Robotics traction
Voice-native UX
Customer pilots
Physical AI deployment
Manufacturing scale
PMF validation
Fundraising strategy
Deployment operations
Deployment
Frontend

Base44 hosted application.

Backend

Vercel deployment.

Example:

https://phycon-api.vercel.app/api/ask
Example Request
{
  "question": "How do robotics startups get traction?",
  "mode": "sage"
}
Example Response
{
  "answer": "Start with pilots before scale. Talk to operators early. Focus on deployment pain instead of futuristic demos."
}
Current Constraints
browser-native STT limitations
browser-native TTS quality limitations
no streaming inference yet
no persistent conversational memory yet
lightweight orchestration only
Long-Term Vision

Build the conversational operating layer for:

Physical AI founders
Robotics operators
Conversational AI builders
Real-world AI deployment teams

A system where:

conversations feel natural
latency feels invisible
advice feels contextual
interaction feels voice-native
Tech Summary
Layer	Current
Frontend	Base44
Backend	Vercel
Model Gateway	OpenRouter
Models	Qwen / Mistral
STT	Browser SpeechRecognition
TTS	Browser speechSynthesis
Personas	Sage / Investor / PMF Critic
Memory	Not implemented yet
Interaction	Voice-first
Status

Current stage:

MVP
rapid iteration
architecture experimentation
conversational UX testing
low-latency voice validation
