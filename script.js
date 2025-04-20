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

// ⏱ Pomodoro Timer
let timer;
let isRunning = false;
let totalSeconds = 25 * 60;

const timerDisplay = document.getElementById("timer");
const startButton = document.getElementById("start-timer");

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

// ⏳ Update the timer display
function updateTimer() {
  if (totalSeconds > 0) {
    totalSeconds--;
    timerDisplay.textContent = formatTime(totalSeconds);
  } else {
    clearInterval(timer);
    timerDisplay.textContent = "🎉 Done!";
    isRunning = false;
    alert("Pomodoro complete! Take a break 😌");
    startButton.textContent = "Restart";
  }
}

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
