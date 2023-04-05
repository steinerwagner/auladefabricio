const inputQuestion = document.getElementById("question");
const result = document.getElementById("result");
const imgs = document.getElementById("img");
const img = document.querySelectorAll("#img img");

inputQuestion.addEventListener("keypress", (e)=> {
    if(inputQuestion.value && e.key === "Enter")
    sendQuestion();
});

const OPEN_API_KEY = "";

function sendQuestion() {
    var sQuestion = inputQuestion.value;

    fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer" + OPEN_API_KEY,
        },
        body: JSON.stringify({
            model: "text-davinci-003",
            prompt: sQuestion,
            max_tokens: 2048, // Tamanho da Resposta
            temperature: 0.5, // Criatividade da Resposta
        })
    })
    .then((response) => response.json())
    .then((json) => {
        if(result.value) result.value += "\n"

        if (json.error?.message) {
            result.value += `Error: ${json.error.mesage}`
        } else if (json.choises?.[0].text) {
            var text = json.choices[0].text || "Sem Resposta";
            result.value += "Chat GPT: " + text;
        }
        result.scrollTop = result.scrollHeight;
    })
    .catch((error) => console.error("Error:", error))
    .finally(() => {
        inputQuestion.value = "";
        inputQuestion.disable = true;
        inputQuestion.focus();
    });

    if (result.value) result.value += "/n/n/n";
    result.value += `Eu: ${sQuestion}`
    inputQuestion.value = "Carregando....."
    inputQuestion.disable = true;

    result.scrollTop = result.scrollHeight;
}


let idx = 0;

function carrossel(){
    idx++;
    
    if(idx > img.length - 1){
        idx = 0;
    }

    imgs.style.transform = `translateX(${-idx * 600}px)`;
}

setInterval(carrossel, 3600);
