// script.js
// 🌄 Set a beautiful background from Unsplash
document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?inspiration,nature')`;

// 🖌 Handle color picker background override
const colorPicker = document.getElementById("color-picker");
if (colorPicker) {
  colorPicker.addEventListener("input", (e) => {
    document.body.style.backgroundImage = "none"; // disable image
    document.body.style.backgroundColor = e.target.value;
  });
}

// ✨ Load a quote - Using a hardcoded array since fetch might fail without proper file
const quotes = [
  { text: "Stay positive, work hard, make it happen.", author: "Unknown" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "It always seems impossible until it's done.", author: "Nelson Mandela" }
];

// Set a random quote
function setRandomQuote() {
  const random = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById("quote").innerText = `"${random.text}"`;
  document.getElementById("author").innerText = `– ${random.author}`;
}

// Try to fetch quotes if available, otherwise use hardcoded ones
function loadQuote() {
  try {
    fetch('data/quotes.json')
      .then(res => res.json())
      .then(data => {
        if (data && data.length) {
          const random = data[Math.floor(Math.random() * data.length)];
          document.getElementById("quote").innerText = `"${random.text}"`;
          document.getElementById("author").innerText = `– ${random.author}`;
        } else {
          setRandomQuote();
        }
      })
      .catch(() => setRandomQuote());
  } catch (e) {
    setRandomQuote();
  }
}

// 💾 Save Goals
function saveGoals() {
  const goals = document.getElementById("goals").value;
  localStorage.setItem("dailyGoals", goals);
  alert("🎯 Goals saved!");
  celebrate();
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
let timerDuration = 25 * 60; // 25 minutes in seconds
let timeLeft = timerDuration;
let timerInterval;
let isRunning = false;

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");
  const timerText = document.getElementById("timer-text");
  if (timerText) {
    timerText.textContent = `${minutes}:${seconds}`;
  }

  const progressCircle = document.getElementById("progress-circle");
  if (progressCircle) {
    const progress = 440 - (440 * (timeLeft / timerDuration));
    progressCircle.style.strokeDashoffset = progress;
  }
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  timerInterval = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      isRunning = false;
      const timerText = document.getElementById("timer-text");
      if (timerText) {
        timerText.textContent = "🎉 Done!";
      }
      alert("Time's up!");
      celebrate();
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

// 🎉 Confetti Celebration
function celebrate() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.5, y: 0.7 }
    });
  }
}

// 🚀 Load saved state on page load
window.onload = () => {
  loadQuote();
  
  const savedGoals = localStorage.getItem("dailyGoals");
  if (savedGoals) {
    document.getElementById("goals").value = savedGoals;
  }
  
  renderTasks();
  updateTimerDisplay(); // Initialize timer UI
  
  // Add event listeners for buttons if not using inline onclick
  const startBtn = document.getElementById("start-timer");
  const pauseBtn = document.getElementById("pause-timer");
  const resetBtn = document.getElementById("reset-timer"); 
  const saveGoalsBtn = document.getElementById("save-goals");
  const addTaskBtn = document.getElementById("add-task");
  
  if (startBtn && !startBtn.hasAttribute("onclick")) 
    startBtn.addEventListener("click", startTimer);
  if (pauseBtn && !pauseBtn.hasAttribute("onclick")) 
    pauseBtn.addEventListener("click", pauseTimer);
  if (resetBtn && !resetBtn.hasAttribute("onclick")) 
    resetBtn.addEventListener("click", resetTimer);
  if (saveGoalsBtn && !saveGoalsBtn.hasAttribute("onclick")) 
    saveGoalsBtn.addEventListener("click", saveGoals);
  if (addTaskBtn && !addTaskBtn.hasAttribute("onclick")) 
    addTaskBtn.addEventListener("click", saveTasks);
};