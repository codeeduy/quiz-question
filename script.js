// DOM Elements

const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startButton = document.getElementById('start-btn');
const questionText = document.getElementById('question-text');
const answersContainer = document.getElementById('answers-container');
const currentQuestionSpan = document.getElementById('current-question');
const totalQuestionsSpan = document.getElementById('total-questions');
const scoreSpan = document.getElementById('score');
const finalScoreSpan = document.getElementById('final-score');
const maxScoreSpan = document.getElementById('max-score');
const resultMessage = document.getElementById('result-message');
const restartButton = document.getElementById('restart-btn');
const progressBar = document.getElementById('progress');

// Creating an array of quiz questions. Each question is an object with a "question" property and an "answers" property. The "answers" property is an array of answer objects, each with a "text" property and a "correct" property. The "correct" property is a boolean that indicates whether the answer is correct or not.
const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];

// Quiz State Vars for tracking the current question index, the user's score, and whether the answer buttons are disabled or not. These variables will be updated as the user interacts with the quiz.
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

// Initialize total questions and max score
totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// Event Listeners
 // We are adding event listeners to the start button and the restart button. When the user clicks the start button, the startQuiz function will be called. When the user clicks the restart button, the restartQuiz function will be called.
startButton.addEventListener('click', startQuiz);
restartButton.addEventListener('click', restartQuiz);

// Functions for starting the quiz, showing the current question, selecting an answer, showing the results, and restarting the quiz. These functions will be called in response to user interactions and will update the quiz state and the DOM accordingly.
function startQuiz() {
    //reset vars
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = 0;
    // switch screens by removing the "active" class from the start screen and adding it to the quiz screen. This will hide the start screen and show the quiz screen.
    startScreen.classList.remove('active');
    quizScreen.classList.add('active');
    // show the first question by calling the showQuestion function. This function will update the DOM with the current question and its answers.
    showQuestion();
}

function showQuestion() {
    //reset state
    answersDisabled = false;
    
    const currentQuestion = quizQuestions[currentQuestionIndex];

    currentQuestionSpan.textContent = currentQuestionIndex + 1;

    // calculate the progress percentage based on the current question index and the total number of questions. We then set the width of the progress bar to this percentage, which visually indicates how far along the user is in the quiz.
    const progressPercent = ((currentQuestionIndex) / quizQuestions.length) * 100;
    progressBar.style.width = progressPercent + '%';
    
    questionText.textContent = currentQuestion.question;

    // clear previous answers from the answers container by setting its innerHTML to an empty string. This ensures that only the current question's answers are displayed and prevents any leftover answers from previous questions from being shown.
    answersContainer.innerHTML = '';

    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.classList.add('answer-btn');

        // what is dataset? dataset is a property of HTML elements that allows you to store custom data attributes. In this case, we are storing whether the answer is correct or not in a data attribute called "correct". This allows us to easily access this information later when the user clicks on the answer button.
        button.dataset.correct = answer.correct;

        button.addEventListener('click',selectAnswer)

        answersContainer.appendChild(button);

        
    });
}

function selectAnswer(event) {
    // optimization check to prevent multiple clicks on answer buttons. If the answers are already disabled, we return early and do nothing. This prevents the user from clicking on multiple answer buttons and potentially causing bugs in the quiz logic.
    if (answersDisabled) return;

    answersDisabled = true;

    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === 'true';
    
    // Here Array.from() is used to convert the NodeList returned by answersContainer.children into an array, which allows us to use the forEach method to iterate over each button. The NodeList is not an array and we need to use the forEach method. We check if the button's data attribute "correct" is true, and if so, we add the "correct" class to the button. If the button is the one that was clicked (selectedButton) and it is not correct, we add the "incorrect" class to it. This provides visual feedback to the user about whether their answer was correct or not.
    Array.from(answersContainer.children).forEach((button) => {
        if (button.dataset.correct === 'true') {
            button.classList.add('correct');
        } else if(button === selectedButton) {
            button.classList.add('incorrect');
        }
    });

        if(isCorrect) {
            score++;
            scoreSpan.textContent = score;
        }

        setTimeout(() => {
            currentQuestionIndex++;

            // check if there are more questions or if the quiz is over
            if (currentQuestionIndex < quizQuestions.length) {
                showQuestion();
            } else {
                showResults();
            }
        }, 1000)
}

function showResults() {
    quizScreen.classList.remove('active');
    resultScreen.classList.add('active');

    finalScoreSpan.textContent = score;

    const percentage = (score / quizQuestions.length) * 100;

    if (percentage === 100) {
        resultMessage.textContent = "Perfect score! You're a quiz master!";
    } else if (percentage >= 80) {
        resultMessage.textContent = "Great job! You have excellent knowledge!";
    } else if (percentage >= 60) {
        resultMessage.textContent = "Not bad! You have a good grasp of the material.";
    } else if (percentage >= 40) {
        resultMessage.textContent = "Not bad! Try again to improve your score.";
    } else {
        resultMessage.textContent = "Better luck next time! Keep learning and try again!";
    }
}


function restartQuiz() {
    resultScreen.classList.remove('active');

    startQuiz();
}