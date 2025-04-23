
const TOGETHER_API_KEY = "ba1cb2e953cda967d0a4187926f95cd38b5c6bb88cf6ddb6efa31c8bfceba000"; // Replace with your actual Together API key

// Toggle Sidebar and Content
function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('closed');
    document.getElementById('content').classList.toggle('shifted');
}

// Toggle Chatbot visibility
function toggleChatbot() {
    document.getElementById('chatbotContainer').classList.toggle('open');
}

// Send Message Function using Together API via fetch
async function sendMessage() {
    const inputField = document.getElementById("chatbotInput");
    const message = inputField.value.trim();

    if (!message) return;

    const chatbotBody = document.getElementById("chatbotBody");

    // Show user's message
    const userMsg = document.createElement("div");
    userMsg.className = "message user-message";
    userMsg.textContent = message;
    chatbotBody.appendChild(userMsg);
    inputField.value = "";
    chatbotBody.scrollTop = chatbotBody.scrollHeight;

    // Show loading bot message
    const botMsg = document.createElement("div");
    botMsg.className = "message bot-message";
    botMsg.textContent = "Typing...";
    chatbotBody.appendChild(botMsg);
    chatbotBody.scrollTop = chatbotBody.scrollHeight;

    try {
        const response = await fetch("https://api.together.xyz/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${TOGETHER_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8",
                messages: [{ role: "user", content: message }]
            })
        });

        const data = await response.json();
        const botReply = data.choices?.[0]?.message?.content || "Sorry, I couldn't get a response.";
        botMsg.textContent = botReply;

    } catch (error) {
        botMsg.textContent = "Error connecting to Together API.";
        console.error(error);
    }

    chatbotBody.scrollTop = chatbotBody.scrollHeight;
}

// Enter key sends message
document.getElementById("chatbotInput").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});

// Avatar Dropdown
document.addEventListener("DOMContentLoaded", function () {
    const avatarBtn = document.getElementById("avatarBtn");
    const dropdown = document.getElementById("dropdownMenu");

    avatarBtn.addEventListener("click", function (event) {
        event.stopPropagation();
        dropdown.classList.toggle("show");
    });

    document.addEventListener("click", function (event) {
        if (!dropdown.contains(event.target)) {
            dropdown.classList.remove("show");
        }
    });
});

