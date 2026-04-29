import { generateResponse } from "./brain/core.js";
import { memory } from "./brain/memory.js";
import { mood } from "./brain/mood.js";

const chat = document.getElementById("chat");
const input = document.getElementById("input");
const sendBtn = document.getElementById("sendBtn");

// ===== RENDER =====

function addMessage(text, type) {
  const msg = document.createElement("div");
  msg.className = "msg " + type;
  msg.textContent = text;
  chat.appendChild(msg);

  chat.scrollTop = chat.scrollHeight;
}

// ===== HANDLE =====

function handleSend() {
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  // thinking
  const thinking = document.createElement("div");
  thinking.className = "msg ai thinking";
  thinking.textContent = "...";
  chat.appendChild(thinking);

  setTimeout(() => {
    thinking.remove();

    let response;

    try {
      response = generateResponse(text, memory, mood);
    } catch (e) {
      console.error(e);
      response = "Brain crashed ⚡";
    }

    addMessage(response, "ai");

  }, 200);
}

// ===== EVENTS =====

sendBtn.addEventListener("click", handleSend);

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") handleSend();
});