const chat = document.getElementById("chat");
const input = document.getElementById("messageInput");

let history = JSON.parse(localStorage.getItem("history") || "[]");

history.forEach(addMessage);

function addMessage(msg) {
    const div = document.createElement("div");
    div.className = "msg " + msg.role;
    div.innerText = msg.text;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    const userMsg = { role: "user", text };
    history.push(userMsg);
    addMessage(userMsg);

    input.value = "";

    fetch("https://BACKEND_URL/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ history })
    })
    .then(r => r.json())
    .then(res => {
        const botMsg = { role: "bot", text: res.reply };
        history.push(botMsg);
        addMessage(botMsg);
        localStorage.setItem("history", JSON.stringify(history));
    });
}
