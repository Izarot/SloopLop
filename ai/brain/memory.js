export const memory = {
  messages: [],
  lastUserInput: "",

  add(role, text) {
    this.messages.push({ role, text });

    // keep last 20 messages only (prevent overload)
    if (this.messages.length > 20) {
      this.messages.shift();
    }

    if (role === "user") {
      this.lastUserInput = text;
    }
  }
};