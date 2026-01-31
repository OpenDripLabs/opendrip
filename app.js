const ESP_BASE = "http://192.168.1.200";

let messages = JSON.parse(localStorage.getItem("chat_history")) || [];

const chat = document.getElementById("chat");
const input = document.getElementById("input");
const sendBtn = document.getElementById("send");

function saveMessages() {
  localStorage.setItem("chat_history", JSON.stringify(messages));
}

function addMessage(role, text) {
  const msg = {
    role,
    text,
    time: Date.now()
  };

  messages.push(msg);
  saveMessages();
  renderMessages();
}

function renderMessages() {
  chat.innerHTML = "";
  messages.forEach(m => {
    const div = document.createElement("div");
    div.className = m.role;
    div.innerText = m.text;
    chat.appendChild(div);
  });
  chat.scrollTop = chat.scrollHeight;
}

sendBtn.onclick = async () => {
  const text = input.value.trim();
  if (!text) return;

  input.value = "";
  addMessage("user", text);

  try {
    const res = await fetch(`${ESP_BASE}/feedback`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });

    const data = await res.json();
    addMessage("assistant", data.reply || "Tamam 👍");

  } catch (e) {
    addMessage("assistant", "ESP’ye bağlanamadım 😕");
  }
};

renderMessages();
