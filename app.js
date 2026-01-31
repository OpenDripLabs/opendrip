console.log("JS YÜKLENDİ");

const chat = document.getElementById("chat");
const input = document.getElementById("messageInput");

function addMessage(text, from) {
    const div = document.createElement("div");
    div.className = from;
    div.innerText = text;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

async function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "user");
    input.value = "";

    try {
        const res = await fetch("http://192.168.1.200/feedback", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text })
        });

        const data = await res.json();

        if (data.reply) {
            addMessage(data.reply, "bot");
        } else {
            addMessage("ESP cevap verdi ama saçmaladı.", "bot");
        }

    } catch (e) {
        console.error(e);
        addMessage("ESP’ye bağlanamadım.", "bot");
    }
}
