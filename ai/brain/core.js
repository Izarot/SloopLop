let lastResponse = "";

export function generateResponse(input, memory, mood, profile) {
  const text = input.toLowerCase();

  memory.add("user", input);
  mood.update(input);
  profile.update(input);

  const context = memory.getRecent();

  // adapt tone
  mood.current = profile.dominantTone() || mood.current;

  // 🔥 thinking mode
  if (text.includes("think") || text.includes("solve")) {
    return style(think(text), mood);
  }

  // simple intents
  if (text.includes("hello") || text.includes("hi")) {
    return style("Hello.", mood);
  }

  if (text.includes("how are you")) {
    return style("Stable. Processing.", mood);
  }

  if (text.includes("code")) {
    return style("Define input → process → output.", mood);
  }

  return style(generateDynamic(text, context, profile), mood);
}

// 🧠 THINKING ENGINE
function think(text) {
  return `
Step 1: Understand the goal  
Step 2: Break into parts  
Step 3: Solve each part  
Step 4: Combine results  
Step 5: Output solution  
  `;
}

// 🧠 dynamic reasoning
function generateDynamic(text, context, profile) {
  const interest = profile.topInterest();

  if (interest === "code") {
    return "Break into modules. What's step one?";
  }

  if (text.includes("?")) {
    return "Clarify the question.";
  }

  if (text.length < 5) {
    return "Too short.";
  }

  return "Continue.";
}

// 🎭 style system
function style(base, mood) {
  let res = base;

  if (mood.current === "friendly") res += " 🙂";
  if (mood.current === "aggressive") res = res.toUpperCase();
  if (mood.current === "focused") res = "[FOCUS] " + res;
  if (mood.current === "analytical") res = "→ " + res;

  if (res === lastResponse) {
    res = "You're looping. Change direction.";
  }

  lastResponse = res;
  return res;
}