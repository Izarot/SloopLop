export const mood = {
  current: "neutral",

  update(input) {
    const text = input.toLowerCase();

    if (text.includes("hello")) this.current = "friendly";
    else if (text.includes("code")) this.current = "focused";
    else if (text.includes("angry")) this.current = "aggressive";
    else this.current = "neutral";
  }
};