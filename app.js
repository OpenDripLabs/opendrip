const chat = document.getElementById("chat");
const input = document.getElementById("input");
const sendBtn = document.getElementById("send");

function addMessage(text, from) {
    const div = document.createElement("div");
    div.className = from;
    div.innerText = text;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

function detectIntent(text) {
    text = text.toLowerCase();

    if (text.includes("acı")) return "too_bitter";
    if (text.includes("zayıf")) return "too_weak";
    if (text.includes("soğuk")) return "too_cold";

    return null;
}

async function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "user");
    input.value = "";

    const intent = detectIntent(text);

    if (!intent) {
        addMessage("Ne demek istediğini anlayamadım.", "bot");
        return;
    }

    try {
        const res = await fetch("http://192.168.1.200/feedback", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ intent })
        });

        const data = await res.json();
        addMessage(data.reply, "bot");

    } catch (e) {
        addMessage("ESP’ye bağlanamadım.", "bot");
        console.error(e);
    }
}

sendBtn.onclick = sendMessage;
