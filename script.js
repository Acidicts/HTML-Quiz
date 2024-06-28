
const startButton= document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')

const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffleQuestions,currentQuestionIndex;
let quizScore = 0;

startButton.addEventListener("click", startGame)
nextButton.addEventListener("click", ()=>{
    currentQuestionIndex++
    setNextQuestion()
})


function startGame(){
    startButton.classList.add("hide")
    shuffleQuestions=questions.sort(()=>Math.random() - 0.5)
    currentQuestionIndex=0
    questionContainerElement.classList.remove("hide")
    setNextQuestion()
    quizScore = 0
}

function setNextQuestion(){
    resetState()
    showQuestion(shuffleQuestions[currentQuestionIndex])
}

function showQuestion(question){
    questionElement.innerText = question.question
    question.answers.forEach((answer)=>{
        const button = document.createElement('button')
        button.classList.remove("hide")
        button.innerText = answer.text
        button.classList.add("btn")
        if (answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState(){
    clearStatusClass(document.body)
    nextButton.classList.add("hide")
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach((button) => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffleQuestions.length > currentQuestionIndex + 1){
        nextButton.classList.remove("hide")
    }
    else {
        startButton.innerText = "restart"
        startButton.classList.remove("hide")
    }
    if (selectedButton.dataset.correct === correct){
        quizScore++
    }
    document.getElementById('right-answers').innerText = quizScore
}

function setStatusClass(element, correct){
    clearStatusClass(element)
    if (correct){
        element.classList.add("correct")
    }
    else {
        element.classList.add("wrong")
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}


const questions = [
    {
        question: "Which one of these is a Javascript Framework?",
        answers : [
            {text: "Python", correct: false},
            {text: "Django", correct: false},
            {text: "React", correct: true},
            {text: "Exclipse", correct: false},
        ]
    },
    {
        question: "Which one of these is a Python Module?",
        answers : [
            {text: "Tkinter", correct: true},
            {text: "Qt", correct: false},
            {text: "React", correct: false},
            {text: "Pygame", correct: true},
        ]
    },
    {
        question: "What is 11 * 11 / 2 ? \n(Use Bidmas)",
        answers : [
            {text: "60.5", correct: true},
            {text: "50.5", correct: false},
            {text: "61.5", correct: false},
            {text: "55", correct: false},
        ]
    }
]

