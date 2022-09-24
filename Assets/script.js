const startButton = document.getElementById("startBtn")
const nextButton = document.getElementById("nextBtn")

const questionContainer = document.getElementById("questionContainer")
const questionsEl = document.getElementById("question")
const answerButton = document.getElementById("answerBtn")
const timeRemaining = document.getElementById("time")
let currentQuestion, currentQuestionIndex;

let timeLeft = 120;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
    currentQuestionIndex++
    setNextQuestions()
})

function startGame() {
    startButton.classList.add("hide")
    currentQuestion = questions;
    currentQuestionIndex = 0
    questionContainer.classList.remove("hide")
    setNextQuestions()
    setTimer()
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
        button.dataset.correct = answer.correct
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

//select answer and either show next or hiscore button depending on how many questions are left
function selectAnswer(e) {
    const selectedButton = e.target
    //setStatusClass(document., correct)
    Array.from(answerButton.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
    }) 
    if(selectedButton.dataset.correct == "true"){
        console.log("true")
    } else {
        console.log("false")
        removeTime();
    }
    //check amount of questions left
    testQuestionsLeft();
}

function removeTime(){
    timeLeft = timeLeft - 10;
}

//show next question or go to highscores
function testQuestionsLeft() {if (currentQuestion.length > currentQuestionIndex + 1){
    nextButton.classList.remove("hide")
 } else {
    hiScoreButton.classList.remove("hide")
    stopTimer()
 }
}


function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct === "true") {
        element.classList.add("correct")
    } else {
        element.classList.add("wrong")
    }
}

function clearStatusClass(element) {
    element.classList.remove("correct")
    element.classList.remove("wrong")
}


//timer interval 
let intervalID;

function setTimer(){
    intervalID = setInterval(setTime, 1000);
}

function setTime(){
    timeLeft = timeLeft - 1;
    timeRemaining.textContent = timeLeft;
    if (timeLeft < 1){
        hiScores();
        stopTimer();
        nextButton.classList.add("hide")
    }
}

function stopTimer(){
    clearInterval(intervalID);
    intervalID = null;
}



//highscore buttons
const hiScoreButton = document.getElementById("hiScoreBtn")
hiScoreButton.addEventListener("click", hiScores);
const scoreboardContainer = document.getElementById("scoreboardContainer")
const currentGameScore = document.getElementById("currentGameScore")

function hiScores(){
    questionContainer.classList.add("hide")
    scoreboardContainer.classList.remove("hide")
    hiScoreButton.classList.add("hide")
    currentGameScore.textContent = timeLeft;
}


const restartButton = document.getElementById("restartBtn")
restartButton.addEventListener("click", restartGame)
function restartGame(){
        location.reload()
}

//save hiscore button
const saveButton = document.getElementById("saveScoreBtn")
saveButton.addEventListener("click", saveToHighScores)
var myHighScore = document.querySelector("#myHiScore")
var scoreboard = document.querySelector("#scoreboard")

function saveToHighScores(){
    var initials = document.querySelector("#intials").value
    
    var newScore = {
        score: timeLeft,
        initials: initials, 
    }

    var scoreBoardData = JSON.parse(localStorage.getItem("scoreBoardData")) || [];
    scoreBoardData.push(newScore)
    localStorage.setItem("scoreBoardData", JSON.stringify(scoreBoardData));
    console.log("saved")

    scoreBoardData.sort((a, b) => {  
        return b.score - a.score;
    });
    
    console.log(scoreBoardData)
    for(var i=0; i < scoreBoardData.length; i++){
    var createList = document.createElement("li");
    createList.textContent = scoreBoardData[i].initials + " " + scoreBoardData[i].score;
    scoreboard.appendChild(createList);
    }
}

//storage for coding questions
const questions = [
    {
        question:"what is 1+1?",
        answers: [
            {text: "2", correct: true},
            {text:"22", correct: false} 
        ]
    },
    {
        question:"what is 2+2",
        answers: [
            {text:"81", correct:false},
            {text:"4", correct:true}
        ]
    }   
]