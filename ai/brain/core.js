export function generateResponse(input, memory, mood) {
  const text = input.toLowerCase();

  // update systems
  memory.add("user", input);
  mood.update(input);

  const context = getContext(memory);

  // === INTENT + CONTEXT ===

  if (text.includes("hello") || text.includes("hi")) {
    return style("Hello ⚡", mood);
  }

  if (text.includes("how are you")) {
    return style("Running stable. Learning you ⚡", mood);
  }

  if (text.includes("code")) {
    return style("We build. What exactly? ⚡💻", mood);
  }

  // === CONTEXT-AWARE RESPONSES ===

  if (context.includes("hello") && text.includes("again")) {
    return style("You already said hello. Loop detected ⚡", mood);
  }

  if (context.includes("code") && text.includes("help")) {
    return style("You're trying to build something. Be specific.", mood);
  }

  // === FALLBACK (dynamic brain) ===
  return generateDynamic(text, context, mood);
}

// 🔍 extract recent context
function getContext(memory) {
  return memory.messages
    .slice(-5)
    .map(m => m.text.toLowerCase())
    .join(" ");
}

// 🎭 style system
function style(base, mood) {
  if (mood.current === "friendly") return base + " 😊";
  if (mood.current === "aggressive") return base + " ⚠️";
  if (mood.current === "focused") return base + " 💻";
  return base;
}

// 🎲 dynamic response generator
function generateDynamic(text, context, mood) {
  const patterns = [
    `That input has structure.`,
    `You're exploring something.`,
    `Not random. There's intent here.`,
    `Push further.`,
    `Explain what you actually want.`,
  ];

  // context influence
  if (context.includes("build")) {
    return style("You're in creation mode. Define the goal.", mood);
  }

  if (text.length > 20) {
    return style("That's detailed. I can work with that.", mood);
  }

  const pick = patterns[Math.floor(Math.random() * patterns.length)];
  return style(pick, mood);
}