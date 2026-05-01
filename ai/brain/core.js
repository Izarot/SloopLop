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

  // 🧠 get logic chain
  const chain = buildResponse(text, context, profile);

  // 🔗 convert chain → readable output
  const output = formatChain(chain);

  return style(output, mood);
}


// 🔗 FORMAT CHAIN NICELY
function formatChain(chain) {
  return chain.map((step, i) => `Step ${i + 1}: ${step}`).join("\n");
}


// 🎭 STYLE
function style(base, mood) {
  let res = base;

  if (mood.current === "friendly") res += " 🙂";
  if (mood.current === "aggressive") res = res.toUpperCase();
  if (mood.current === "focused") res = "[FOCUS]\n" + res;
  if (mood.current === "analytical") res = "→\n" + res;

  if (res === lastResponse) {
    res = "You're looping. Change direction.";
  }

  lastResponse = res;
  return res;
}