console.log("APP STARTED");

// wait for page
window.addEventListener("DOMContentLoaded", () => {
  console.log("DOM READY");

  const input = document.getElementById("input");
  const button = document.getElementById("sendBtn");
  const chat = document.getElementById("chat");

  if (!input || !button || !chat) {
    alert("ELEMENT MISSING");
    console.error(input, button, chat);
    return;
  }

  function addMessage(text, type) {
    const msg = document.createElement("div");
    msg.className = type === "user" ? "msg user" : "msg ai";
    msg.textContent = text;

    chat.appendChild(msg);
    chat.scrollTop = chat.scrollHeight;
  }

  function send() {
    alert("SEND WORKING");

    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "user");

    // simple AI
    let response = "Thinking...";
    if (text.toLowerCase().includes("hello") || text.toLowerCase().includes("hi")) {
      response = "Hello.";
    } else {
      response = "Continue.";
    }

    setTimeout(() => {
      addMessage(response, "ai");
    }, 200);

    input.value = "";
  }

  // CLICK
  button.addEventListener("click", send);

  // ENTER
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      send();
    }
  });
});