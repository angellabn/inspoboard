// Set random background from Unsplash
document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?nature,landscape')`;

// Load quote from Quotable API
fetch("https://api.quotable.io/random")
  .then(res => res.json())
  .then(data => {
    document.getElementById("quote").innerText = `"${data.content}"`;
    document.getElementById("author").innerText = `— ${data.author}`;
  });

// Save goals to local storage
function saveGoals() {
  const goals = document.getElementById("goals").value;
  localStorage.setItem("dailyGoals", goals);
  alert("Goals saved!");
}

// Save tasks in local storage
function saveTasks() {
  const task = document.getElementById('task').value.trim();
  if (task === "") return; // Prevent saving empty tasks
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  document.getElementById('task').value = ""; // Clear input
  renderTasks();
}

// Display tasks from localStorage
function renderTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = tasks.map(task => `<li>${task}</li>`).join('');
}

// Theme toggle
const themeButton = document.getElementById("theme-toggle");
if (themeButton) {
  themeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    localStorage.setItem("theme", document.body.classList.contains("dark-theme") ? "dark" : "light");
  });
}

// Load everything on page load
window.onload = function () {
  // Load saved goals
  const savedGoals = localStorage.getItem("dailyGoals");
  if (savedGoals) {
    document.getElementById("goals").value = savedGoals;
  }

  // Load saved theme
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-theme");
  }

  // Load tasks
  renderTasks();
};

// Save journal entries
function saveJournal() {
  const journalEntry = document.getElementById("journal").value;
  localStorage.setItem("journalEntry", journalEntry);
}

// Load journal entry
window.onload = function() {
  const savedJournal = localStorage.getItem("journalEntry");
  if (savedJournal) {
    document.getElementById("journal").value = savedJournal;
  }
};
