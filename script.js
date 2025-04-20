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
let minutes = 25;
let seconds = 0;
let isRunning = false;

document.getElementById("start-timer").addEventListener("click", () => {
  if (!isRunning) {
    isRunning = true;
    timer = setInterval(updateTimer, 1000);
  }
});

function updateTimer() {
  const display = document.getElementById("timer");

  if (seconds === 0) {
    if (minutes === 0) {
      clearInterval(timer);
      display.textContent = "🎉 Done!";
      alert("Pomodoro complete! Time for a break.");
      isRunning = false;
      return;
    } else {
      minutes--;
      seconds = 59;
    }
  } else {
    seconds--;
  }

  const minStr = String(minutes).padStart(2, '0');
  const secStr = String(seconds).padStart(2, '0');
  display.textContent = `${minStr}:${secStr}`;
}

// 🚀 Load saved state on page load
window.onload = () => {
  const savedGoals = localStorage.getItem("dailyGoals");
  if (savedGoals) {
    document.getElementById("goals").value = savedGoals;
  }

  renderTasks();
};
