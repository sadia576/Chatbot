const API_KEY = "use_your_API";
const model = "gemini-2.5-flash";

let input = document.querySelector("#input");
let arrowBtn = document.querySelector(".arrow");
let chatBox = document.querySelector(".box");
let welcomeHeading = document.querySelector("#welcome");

arrowBtn.addEventListener("click", sendMessage);
input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        sendMessage();
    }
});
function newChat() {
    chatBox.innerHTML = "";
    welcomeHeading.style.display = "block"
}
async function sendMessage() {
    let userMsg = input.value.trim();
    if (!userMsg) return;
    welcomeHeading.style.display = "none"
    chatBox.innerHTML += `
    <div class="myMsg">
                <p class="request">${userMsg}</p>
            </div>
`;
    input.value = "";

    try {
        let response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({

                    contents: [{ parts: [{ text: userMsg }] }],

                })
            });

        let data = await response.json();
        console.log(data);

        if (!response.ok) {
            throw new Error(data.error?.message || "API Error");
        }
        let botMsg = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response received.";


        chatBox.innerHTML += ` <div class="botMsg">
                <p class="response">${botMsg}</p>
            </div
        `;

    }
    catch (err) {
        alert(err);
    }
}