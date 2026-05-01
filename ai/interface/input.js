import { generateResponse } from "../brain/core.js";
import { addMessage } from "./ui.js";

export function setupInput(memory, mood, profile) {
  const inputEl = document.getElementById("input");
  const sendBtn = document.getElementById("sendBtn");

  if (!inputEl || !sendBtn) {
    console.error("Input or button not found");
    return;
  }

  // 🧠 CORE SEND FUNCTION
  function send() {
    const text = inputEl.value.trim();
    if (!text) return;

    // user message
    addMessage(text, "user");

    let response;
    try {
      response = generateResponse(text, memory, mood, profile);
    } catch (e) {
      console.error(e);
      response = "Error in brain";
    }

    // AI response
    setTimeout(() => {
      addMessage(response, "ai");

      // render math if available
      if (window.renderMathInElement) {
        renderMathInElement(document.body);
      }
    }, 120);

    inputEl.value = "";
  }

  // 🔥 UNIVERSAL EVENT HANDLER (mobile + desktop)
  const handler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    send();
  };

  // Desktop click
  sendBtn.addEventListener("click", handler);

  // Mobile (main fix)
  sendBtn.addEventListener("pointerup", handler);

  // Android fallback
  sendBtn.addEventListener("touchend", handler);

  // Enter key
  inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      send();
    }
  });
}