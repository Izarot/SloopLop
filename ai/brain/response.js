export function buildResponse(input, context, profile) {
  const text = input.toLowerCase();

  // BASIC HUMAN MODE
  if (/^(hi|hello|hey)/.test(text)) {
    return ["Greet"];
  }

  if (text.includes("what")) {
    return ["Clarify"];
  }

  if (/(fuck|shit|idiot)/.test(text)) {
    return ["Handle emotion"];
  }

  // INTENT MODES
  if (text.includes("build") || text.includes("make")) {
    return ["Build"];
  }

  if (text.includes("why")) {
    return ["Explain why"];
  }

  if (text.includes("how")) {
    return ["Explain how"];
  }

  // SMART DEFAULT
  return ["Neutral"];
}