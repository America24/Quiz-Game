var currentQuestionIndex = 0;
var timer;
var countDown = 50;

var startButton = document.getElementById("start-btn");
var intro = document.getElementById("intro");
var quesionEl = document.getElementById("question");
var answerEl = document.getElementById("answer-button");
var time = document.getElementById("timer");
var gameOver = document.getElementById("end-game");
var submitBtn = document.getElementById("submit");
var initialEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");
var quesionContainerEl = document.getElementById("question-container");

startButton.addEventListener("click", startGame);


function startGame() {
  startButton.classList.add("hide");
  quesionContainerEl.classList.remove("hide");
  intro.classList.add("hide");
  time.textContent = countDown;

  
  timer = setInterval(function () {
    if (countDown > 0) {
      countDown--;
      time.textContent = countDown;
    } else {
      endGame();
    }
  }, 1000);

  displayQuestion();
}


function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    endGame();
  }
}

function displayQuestion() {
  document.getElementById("answer-button").innerHTML = "";

  quesionEl.innerText = questions[currentQuestionIndex].title;
  questions[currentQuestionIndex].choices.forEach((choice) => {
    let button = document.createElement("button");
    button.innerText = choice;
    answerEl.appendChild(button);
    button.className = "btn myClass";
  });
}
answerEl.addEventListener("click", selectedAnswer);


var questions = [
  {
    title: "Which active NBA player has won the most championships?",
    choices: [
     "Kevin Durant",
     "Stephen Curry",
     "LeBron James",
     "Giannis Antetokounmpo",
    ],
    answer: "LeBron James",
  },

  {
    title: "Which active NBA player has the most MVP trophies?",
    choices: [
    "Kevin Durant", 
    "LeBron James", 
    "Russell Westbrook", 
    "Giannis Antetokounmpo"
    ],
    answer: "LeBron James",
  },
  {
    title: "Which NBA player has the most triple doubles?",
    choices: [
      "Oscar Robertson", 
      "LeBron James", 
      "Russell Westbrook", 
      "Giannis Antetokounmpo"
      ],
    answer: "Russell Westbrook",
  },
  {
    title: "Which team has won the most championships?",
    choices: [
      "Golden State Warriors", 
      "Chicago Bulls", 
      "Los Angeles Lakers", 
      "San Antonio Spurs"
      ],
    answer: "Los Angeles Lakers",
  },
  {
    title: "Which NBA player has 5 championships?",
    choices: [
    "Kobe Bryant",
    "Stephen Curry",
    "LeBron James",
    "Dwyane Wade",
  ],
    answer: "Kobe Bryant",
  },

  {
    title: "Who won Finals MVP in 2010?",
    choices: [
      "Kevin Garnett",
      "Paul Pierce",
      "Kobe Bryant",
      "Pau Gasol",
    ],
    answer: "Kobe Bryant",
  },
];



function selectedAnswer(event) {
  var answerSelected = event.target.innerText;
  if (answerSelected != questions[currentQuestionIndex].answer) {
    countDown -= 2;
    feedbackEl.textContent = "Wrong";
  } else {
    feedbackEl.textContent = "Correct";
  }

  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function () {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 300);

  nextQuestion();
}


function endGame() {
  quesionContainerEl.classList.add("hide");

  // show final score
  var finalScoreEl = document.getElementById("final-score");

  gameOver.classList.remove("hide");

  clearInterval(timer);
  finalScoreEl.textContent = countDown;
  time.classList.add("hide");
}


var saveHighScore = function () {
  initials = initialEl.value;

  if (initials !== "") {
    var highScore = JSON.parse(window.localStorage.getItem("highScore")) || [];

    var newScore = {
      score: countDown,
      initials: initials,
    };

    highScore.push(newScore);
    window.localStorage.setItem("highScore", JSON.stringify(highScore));

    window.location.href = "highscore.html";
  }
};

submitBtn.onclick = saveHighScore;

