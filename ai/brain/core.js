import { buildResponse } from "./response.js";

let lastResponse = "";

export function generateResponse(input, memory, mood, profile) {
  const text = input.toLowerCase();

  memory.add("user", input);
  mood.update(input);
  profile.update(input);

  const context = memory.getRecent();

  // adaptive tone
  mood.current = profile.dominantTone() || mood.current;

  const chain = buildResponse(text, context, profile);
  let output = formatChain(chain);

  output = style(output, mood);

  // FIX LOOP SPAM
  if (output === lastResponse) {
    output = "Say something different.";
  }

  lastResponse = output;
  return output;
}


// 🧠 LOGIC → HUMAN TEXT
function formatChain(chain) {
  const map = {
    "Greet": "Hello.",
    "Clarify": "What do you mean?",
    "Handle emotion": "Calm down. Speak clearly.",
    "Build": "We can build it. What exactly?",
    "Explain why": "Here’s why:",
    "Explain how": "Here’s how:",
    "Neutral": "I get what you're saying."
  };

  return chain.map(step => map[step] || step).join(" ");
}


// 🎭 STYLE SYSTEM
function style(base, mood) {
  let res = base;

  if (mood.current === "friendly") res += " 🙂";
  if (mood.current === "aggressive") res = res.toUpperCase();
  if (mood.current === "focused") res = "[FOCUS] " + res;
  if (mood.current === "analytical") res = "→ " + res;

  return res;
}