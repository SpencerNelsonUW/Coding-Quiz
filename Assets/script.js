const startButton = document.getElementById("startBtn")
const nextButton = document.getElementById("nextBtn")
const questionContainer = document.getElementById("questionContainer")
const questionsEl = document.getElementById("question")
const answerButton = document.getElementById("answerBtn")
let currentQuestion, currentQuestionIndex;

startButton.addEventListener("click", startGame);

function startGame() {
    startButton.classList.add("hide")
    currentQuestion = questions;
    currentQuestionIndex = 0
    questionContainer.classList.remove("hide")
    setNextQuestions()
}

function setNextQuestions() {
    resetState()
    showQuestion(currentQuestion[currentQuestionIndex])
}

function showQuestion(questions) {
    questionsEl.innerText = questions.question;
    questions.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerText = answer.text
        button.classList.add("btn")
        if (answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
        answerButton.appendChild(button)
    })
}

function resetState() {
    nextButton.classList.add("hide")
    while (answerButton.firstChild) {
        answerButton.removeChild
        (answerButton.firstChild)
    }
}

function selectAnswer(e) {
 const selectedButton = e.target
 const correct = selectedButton.dataset.correct 
 setStatusClass(document.body, correct)
 Array.from(answerButton.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
 })
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add("correct")
    } else {
        element.classList.add("wrong")
    }
}

function clearStatusClass(element) {
    element.classList.remove("correct")
    element.classList.remove("wrong")
}

const questions = [
    {
        question:"what is 1+1?",
        answers: [
            {text: "2", correct: true},
            {text:"22", correct: false} 
        ]
    }   
]