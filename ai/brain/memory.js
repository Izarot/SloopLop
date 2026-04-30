export class Memory {
  constructor() {
    this.messages = [];
  }

  add(role, text) {
    this.messages.push({ role, text });
  }
}