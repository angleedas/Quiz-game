const questions = [
  {
    question: "Which language is primarily used for web page structure?",
    answers: [
      { text: "HTML", correct: true },
      { text: "CSS", correct: false },
      { text: "JavaScript", correct: false },
      { text: "Python", correct: false }
    ]
  },
  {
    question: "Which programming language is known as the 'mother of all languages'?",
    answers: [
      { text: "Assembly", correct: false },
      { text: "C", correct: true },
      { text: "Java", correct: false },
      { text: "Pascal", correct: false }
    ]
  },
  {
    question: "Which language is mainly used for styling web pages?",
    answers: [
      { text: "HTML", correct: false },
      { text: "CSS", correct: true },
      { text: "PHP", correct: false },
      { text: "SQL", correct: false }
    ]
  },
  {
    question: "Which language runs inside the browser and makes web pages interactive?",
    answers: [
      { text: "Python", correct: false },
      { text: "C++", correct: false },
      { text: "JavaScript", correct: true },
      { text: "Ruby", correct: false }
    ]
  },
  {
    question: "Which of the following is a database query language?",
    answers: [
      { text: "C#", correct: false },
      { text: "SQL", correct: true },
      { text: "PHP", correct: false },
      { text: "Go", correct: false }
    ]
  },
  {
    question: "Which language is widely used for Artificial Intelligence and Machine Learning?",
    answers: [
      { text: "Python", correct: true },
      { text: "HTML", correct: false },
      { text: "Java", correct: false },
      { text: "Swift", correct: false }
    ]
  },
  {
    question: "Which programming language is mainly used for iOS app development?",
    answers: [
      { text: "Swift", correct: true },
      { text: "Java", correct: false },
      { text: "Kotlin", correct: false },
      { text: "C", correct: false }
    ]
  },
  {
    question: "Which language is strongly associated with Android app development?",
    answers: [
      { text: "Ruby", correct: false },
      { text: "Java", correct: true },
      { text: "PHP", correct: false },
      { text: "HTML", correct: false }
    ]
  },
  {
    question: "Which programming language is known for its use in data science?",
    answers: [
      { text: "C#", correct: false },
      { text: "Python", correct: true },
      { text: "JavaScript", correct: false },
      { text: "Perl", correct: false }
    ]
  },
  {
    question: "Which of the following is NOT a programming language?",
    answers: [
      { text: "HTML", correct: true },
      { text: "Java", correct: false },
      { text: "C++", correct: false },
      { text: "Python", correct: false }
    ]
  }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timerElement = document.getElementById("timer");

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 10;
let timerInterval;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  questionElement.innerHTML = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });

  startTimer();
}

function resetState() {
  clearInterval(timerInterval);
  timeLeft = 10;
  timerElement.innerHTML = `⏳ Time left: ${timeLeft}s`;
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("wrong");
  }
  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
  clearInterval(timerInterval);
}

function showScore() {
  resetState();
  questionElement.innerHTML = `🎉 You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
  timerElement.innerHTML = "";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    timerElement.innerHTML = `⏳ Time left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      // auto move to next
      Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
          button.classList.add("correct");
        }
        button.disabled = true;
      });
      nextButton.style.display = "block";
    }
  }, 1000);
}

startQuiz();