import { generateResponse } from "./brain/core.js";

const chat = document.getElementById("chat");
const input = document.getElementById("input");
const sendBtn = document.getElementById("sendBtn");

// ===== RENDER =====

function addUserMessage(text) {
  const msg = document.createElement("div");
  msg.className = "msg user";
  msg.textContent = text;
  chat.appendChild(msg);
}

function addAIMessage(text) {
  const msg = document.createElement("div");
  msg.className = "msg ai";
  msg.textContent = "------------------ " + text;
  chat.appendChild(msg);
}

function scrollToBottom() {
  chat.scrollTop = chat.scrollHeight;
}

// ===== CORE FLOW =====

function handleSend() {
  const text = input.value.trim();
  if (!text) return;

  addUserMessage(text);

  input.value = "";
  scrollToBottom();

  // fake thinking (clean, single instance)
  const thinking = document.createElement("div");
  thinking.className = "msg ai thinking";
  thinking.textContent = "------------------ Thinking...";
  chat.appendChild(thinking);
  scrollToBottom();

  setTimeout(() => {
    thinking.remove();

    const response = generateResponse(text);
    addAIMessage(response);

    scrollToBottom();
  }, 300);
}

// ===== EVENTS =====

sendBtn.addEventListener("click", handleSend);

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") handleSend();
});