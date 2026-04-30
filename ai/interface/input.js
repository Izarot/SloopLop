import { generateResponse } from "../brain/core.js";
import { addMessage } from "./ui.js";

export function setupInput(memory, mood) {
  const inputEl = document.getElementById("input");
  const sendBtn = document.getElementById("sendBtn");

  console.log("SETUP INPUT RUNNING");

  if (!inputEl || !sendBtn) {
    console.error("Missing input or button");
    return;
  }

  function send() {
    console.log("SEND TRIGGERED");

    const text = inputEl.value.trim();
    if (!text) return;

    addMessage(text, "user");

    let response;
    try {
      response = generateResponse(text, memory, mood);
    } catch (err) {
      console.error(err);
      response = "Brain error";
    }

    setTimeout(() => {
      addMessage(response, "ai");

      if (window.renderMathInElement) {
        renderMathInElement(document.body);
      }
    }, 200);

    inputEl.value = "";
  }

  // CLICK (forced)
  sendBtn.onclick = send;

  // ENTER
  inputEl.onkeydown = function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      send();
    }
  };
}