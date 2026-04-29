const chat = document.getElementById("chat");
const input = document.getElementById("input");
const sendBtn = document.getElementById("sendBtn");

// add message to UI
function addMessage(text, type="user") {
  const msg = document.createElement("div");

  msg.style.textAlign = type === "user" ? "right" : "left";
  msg.style.margin = "6px 0";

  msg.innerText = text;

  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
}

// basic brain (v1)
function getResponse(text) {
  text = text.toLowerCase();

  if (text.includes("hello")) return "Hi ⚡";
  if (text.includes("who are you")) return "I am SloopLop AI";
  if (text.includes("gen")) return "Use SloopLop GEN";

  return "Thinking...";
}

// send handler
function send() {
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");

  const reply = getResponse(text);
  addMessage(reply, "bot");

  input.value = "";
}

// button click
sendBtn.addEventListener("click", send);

// enter key
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") send();
});
