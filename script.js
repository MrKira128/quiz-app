var quizData;
const answerEls = document.querySelectorAll("input.answer");
let currentQuiz = 0;
let score = 0;

loadQuiz();

async function loadQuiz() {
    answerEls.forEach((answerEl) => {  answerEl.checked = false; });
    const res = await(await fetch(`quizData.json`)).json(); 
    quizData = res.questions;
    document.getElementById("question").innerText = quizData[currentQuiz].question;
    document.querySelector(".score").innerText = score;
    document.querySelector(".question-no").innerText = currentQuiz + 1;
    ['a','b','c','d'].forEach((e)=>{document.getElementById(`${e}_text`).innerText = quizData[currentQuiz][e]})
}



 document.getElementById("submit").addEventListener("click", async () => {
    let answer = undefined;
    let stack =[];
    answerEls.forEach((answerEl) => { if (answerEl.checked) answer = answerEl.id;  });


    if (answer) {
        if (answer === quizData[currentQuiz].correct) {
            stack.push(document.getElementById("submit").style.backgroundColor);
            document.getElementById("submit").style.backgroundColor="#51ff00";
            score++;

        }else{
            stack.push(document.getElementById("submit").style.backgroundColor);
            document.getElementById("submit").style.backgroundColor="#ff0000";
        }
        setTimeout(()=>
        { 
            document.getElementById("submit").style.backgroundColor=stack.pop();
            currentQuiz++;
            if (currentQuiz < quizData.length) {
                loadQuiz();
            }
            else {
                document.getElementById("quiz").innerHTML = `
                    <h2>You answered correctly at ${score}/${quizData.length} questions.</h2>
                    <button onclick="location.reload();">Reload</button>`;
            }

         }, 650);

    }
});
