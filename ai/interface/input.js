import { generateResponse } from "../brain/core.js";
import { addMessage } from "./ui.js";

export function setupInput(memory, mood) {
  const inputEl = document.getElementById("input");
  const sendBtn = document.getElementById("sendBtn");

  if (!inputEl || !sendBtn) {
    console.error("Input or button not found");
    return;
  }

  function send() {
    const text = inputEl.value.trim();
    if (!text) return;

    addMessage(text, "user");

    let response;
    try {
      response = generateResponse(text, memory, mood);
    } catch (e) {
      console.error(e);
      response = "Error in AI";
    }

    setTimeout(() => {
      addMessage(response, "ai");

      if (response !== "__CLEAR__") {
        renderMath();
      }
    }, 200);

    inputEl.value = "";
  }

  // ✅ CLICK HANDLER (reliable)
  sendBtn.onclick = function (e) {
  e.preventDefault();
  send();
};

  // ✅ ENTER HANDLER
  inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // prevents weird browser behavior
      send();
    }
  });
}

// LaTeX rendering
function renderMath() {
  if (window.renderMathInElement) {
    renderMathInElement(document.body);
  }
}