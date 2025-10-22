// Ripple Effect Game Logic

const startBtn = document.getElementById("start-btn");
const playAgainBtn = document.getElementById("play-again-btn");
const resetBtn = document.getElementById("reset-btn");
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const endScreen = document.getElementById("end-screen");
const gameArea = document.getElementById("game-area");
const scoreDisplay = document.getElementById("score");
const finalScoreDisplay = document.getElementById("final-score");
const message = document.getElementById("message");
const timeDisplay = document.getElementById("time");

let score = 0;
let time = 30;
let timer;
let dropInterval;

// Switch screens
function showScreen(screen) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  screen.classList.add("active");
}

startBtn.addEventListener("click", startGame);
playAgainBtn.addEventListener("click", startGame);
resetBtn.addEventListener("click", resetGame);

function startGame() {
  score = 0;
  time = 30;
  scoreDisplay.textContent = score;
  timeDisplay.textContent = time;
  message.textContent = "";
  gameArea.innerHTML = "";
  showScreen(gameScreen);
  startTimer();
  spawnDrops();
}

function endGame() {
  clearInterval(timer);
  clearInterval(dropInterval);
  finalScoreDisplay.textContent = score;
  launchConfetti();
  showScreen(endScreen);
}

function startTimer() {
  timer = setInterval(() => {
    time--;
    timeDisplay.textContent = time;
    if (time <= 0) endGame();
  }, 1000);
}

function spawnDrops() {
  dropInterval = setInterval(() => {
    const drop = document.createElement("div");
    const isClean = Math.random() > 0.3;
    drop.classList.add("drop", isClean ? "clean" : "polluted");
    drop.style.left = Math.random() * 90 + "%";
    drop.style.animation = "fall 3s linear";
    gameArea.appendChild(drop);

    drop.addEventListener("click", () => {
      if (isClean) {
        score += 10;
        message.textContent = "Nice ripple!";
      } else {
        score -= 5;
        message.textContent = "Pollution spread!";
      }
      scoreDisplay.textContent = score;
      drop.remove();
    });

    setTimeout(() => drop.remove(), 3000);
  }, 800);
}

function resetGame() {
  clearInterval(timer);
  clearInterval(dropInterval);
  message.textContent = "";
  gameArea.innerHTML = "";
  score = 0;
  time = 30;
  scoreDisplay.textContent = score;
  timeDisplay.textContent = time;
}

/* ===== Confetti Celebration ===== */
function launchConfetti() {
  const duration = 3 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 25, spread: 360, ticks: 60, zIndex: 1000 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();
    if (timeLeft <= 0) return clearInterval(interval);

    const particleCount = 50 * (timeLeft / duration);
    confetti(Object.assign({}, defaults, {
      particleCount,
      origin: {
        x: randomInRange(0.1, 0.9),
        y: Math.random() - 0.2
      }
    }));
  }, 250);
}
