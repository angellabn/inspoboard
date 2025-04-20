// 🌄 Set a beautiful background from Unsplash
document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?inspiration,nature')`;

// 🖌 Handle color picker background override
const colorPicker = document.getElementById("color-picker");
colorPicker.addEventListener("input", (e) => {
  document.body.style.backgroundImage = "none"; // disable image
  document.body.style.backgroundColor = e.target.value;
});

// ✨ Load a quote
fetch("https://api.quotable.io/random")
  .then(res => res.json())
  .then(data => {
    document.getElementById("quote").innerText = `"${data.content}"`;
    document.getElementById("author").innerText = `— ${data.author}`;
  })
  .catch(() => {
    document.getElementById("quote").innerText = `"Stay positive, work hard, make it happen!"`;
    document.getElementById("author").innerText = "— Unknown";
  });

// 💾 Save Goals
function saveGoals() {
  const goals = document.getElementById("goals").value;
  localStorage.setItem("dailyGoals", goals);
  alert("🎯 Goals saved!");
}

// ✅ Save Tasks
function saveTasks() {
  const taskInput = document.getElementById("task");
  const task = taskInput.value.trim();
  if (task === "") return;

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  taskInput.value = "";
  renderTasks();
}

// 📋 Render Tasks
function renderTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task;

    // 🗑 Add delete on click
    li.addEventListener("click", () => {
      if (confirm(`Delete task: "${task}"?`)) {
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
      }
    });

    li.title = "Click to delete";
    taskList.appendChild(li);
  });
}

// ⏱ Pomodoro Timer (Single version for clarity)
let timerDuration = 25 * 60; // 25 minutes in seconds
let timeLeft = timerDuration;
let timerInterval;
let isRunning = false;

const timerText = document.getElementById("timer-text");
const progressCircle = document.getElementById("progress-circle");
const startBtn = document.getElementById("start-timer");
const pauseBtn = document.getElementById("pause-timer");
const resetBtn = document.getElementById("reset-timer");

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");
  timerText.textContent = `${minutes}:${seconds}`;

  const progress = 440 - (440 * (timeLeft / timerDuration));
  progressCircle.style.strokeDashoffset = progress;
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  timerInterval = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      isRunning = false;
      timerText.textContent = "🎉 Done!";
      alert("Time's up!");
      return;
    }
    timeLeft--;
    updateTimerDisplay();
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  isRunning = false;
}

function resetTimer() {
  clearInterval(timerInterval);
  isRunning = false;
  timeLeft = timerDuration;
  updateTimerDisplay();
}

// Button event listeners
startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

// 🎉 Confetti Celebration
function celebrate() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { x: 0.5, y: 0.7 }
  });
}

// Example: Attach celebration to a button
document.querySelector('button').addEventListener('click', celebrate);

// 🚀 Load saved state on page load
window.onload = () => {
  const savedGoals = localStorage.getItem("dailyGoals");
  if (savedGoals) {
    document.getElementById("goals").value = savedGoals;
  }
  renderTasks();
  updateTimerDisplay(); // Initialize timer UI
};
