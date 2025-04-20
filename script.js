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

/// Pomodoro Timer
let timerInterval;
let isTimerRunning = false;
let totalTime = 25 * 60; // 25 minutes in seconds

const timerDisplay = document.getElementById("timer");
const startTimerBtn = document.getElementById("start-timer");

function formatTime(seconds) {
  const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  return `${mins}:${secs}`;
}

function startPomodoro() {
  if (isTimerRunning) return;

  isTimerRunning = true;
  let timeLeft = totalTime;
  timerDisplay.textContent = formatTime(timeLeft);
  startTimerBtn.textContent = "Running...";

  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = formatTime(timeLeft);

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timerDisplay.textContent = "🎉 Done!";
      startTimerBtn.textContent = "Restart";
      isTimerRunning = false;
    }
  }, 1000);
}

startTimerBtn.addEventListener("click", () => {
  if (!isTimerRunning) {
    clearInterval(timerInterval); // Clear any previous timer
    startPomodoro();
  }
});

// ▶️ Start/Restart button logic
startButton.addEventListener("click", () => {
  if (!isRunning) {
    isRunning = true;
    totalSeconds = 25 * 60; // reset to 25 min every time
    timerDisplay.textContent = formatTime(totalSeconds);
    startButton.textContent = "Running...";
    timer = setInterval(updateTimer, 1000);
  }
});


// 🚀 Load saved state on page load
window.onload = () => {
  const savedGoals = localStorage.getItem("dailyGoals");
  if (savedGoals) {
    document.getElementById("goals").value = savedGoals;
  }

  renderTasks();
};
