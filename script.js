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

// Dark mode toggle
const darkModeToggle = document.getElementById("dark-mode-toggle");
if (darkModeToggle) {
  darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    const isDarkMode = document.body.classList.contains("dark-theme");
    localStorage.setItem("darkMode", isDarkMode);
    darkModeToggle.innerHTML = isDarkMode ? 
      '<i class="fas fa-sun"></i> Light Mode' : 
      '<i class="fas fa-moon"></i> Dark Mode';
  });
  
  // Load saved dark mode preference
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-theme");
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
  }
}

// ✨ Load a quote - Using a hardcoded array since fetch might fail without proper file
const quotes = [
  { text: "Stay positive, work hard, make it happen.", author: "Unknown" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
  { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs" },
  { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
  { text: "Life is 10% what happens to you and 90% how you react to it.", author: "Charles R. Swindoll" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" }
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

// 💾 Save and manage quotes
function saveCurrentQuote() {
  const quoteText = document.getElementById("quote").innerText.replace(/"/g, "");
  const author = document.getElementById("author").innerText.replace("– ", "");
  
  if (!quoteText) return;
  
  const savedQuotes = JSON.parse(localStorage.getItem("savedQuotes")) || [];
  
  // Check if quote already exists to avoid duplicates
  if (!savedQuotes.some(q => q.text === quoteText)) {
    savedQuotes.push({ text: quoteText, author: author });
    localStorage.setItem("savedQuotes", JSON.stringify(savedQuotes));
    renderSavedQuotes();
    alert("Quote saved to your collection!");
  } else {
    alert("This quote is already in your collection!");
  }
}

function renderSavedQuotes() {
  const savedQuotes = JSON.parse(localStorage.getItem("savedQuotes")) || [];
  const quotesList = document.getElementById("saved-quotes-list");
  
  if (!quotesList) return;
  
  quotesList.innerHTML = "";
  
  if (savedQuotes.length === 0) {
    const emptyItem = document.createElement("li");
    emptyItem.textContent = "No saved quotes yet. Click 'Save Quote' to add some!";
    quotesList.appendChild(emptyItem);
    return;
  }
  
  savedQuotes.forEach((quote, index) => {
    const li = document.createElement("li");
    
    const quoteText = document.createElement("div");
    quoteText.className = "quote-text";
    quoteText.textContent = `"${quote.text}"`;
    
    const quoteAuthor = document.createElement("div");
    quoteAuthor.className = "quote-author";
    quoteAuthor.textContent = quote.author;
    
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-quote";
    deleteBtn.innerHTML = '<i class="fas fa-times"></i>';
    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      savedQuotes.splice(index, 1);
      localStorage.setItem("savedQuotes", JSON.stringify(savedQuotes));
      renderSavedQuotes();
    });
    
    li.appendChild(quoteText);
    li.appendChild(quoteAuthor);
    li.appendChild(deleteBtn);
    
    quotesList.appendChild(li);
  });
}

// 💾 Save Notes
function saveNotes() {
  const notes = document.getElementById("notes").value;
  localStorage.setItem("quickNotes", notes);
  alert("📝 Notes saved!");
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
  tasks.push({ text: task, completed: false });
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
    if (task.completed) {
      li.classList.add("completed");
    }
    
    const taskText = document.createElement("span");
    taskText.className = "task-text";
    taskText.textContent = task.text || task; // Support old format
    li.appendChild(taskText);
    
    // Add task actions
    const taskActions = document.createElement("div");
    taskActions.className = "task-actions";
    
    // Complete toggle button
    const completeBtn = document.createElement("button");
    completeBtn.innerHTML = task.completed ? 
      '<i class="fas fa-check-circle"></i>' : 
      '<i class="far fa-circle"></i>';
    completeBtn.title = task.completed ? "Mark incomplete" : "Mark complete";
    completeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      tasks[index].completed = !tasks[index].completed;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
    });
    
    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.title = "Delete task";
    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
    });
    
    taskActions.appendChild(completeBtn);
    taskActions.appendChild(deleteBtn);
    li.appendChild(taskActions);
    
    taskList.appendChild(li);
  });
}

// ⏱ Pomodoro Timer
let timerDuration = 25 * 60; // 25 minutes in seconds
let breakDuration = 5 * 60; // 5 minutes in seconds
let timeLeft = timerDuration;
let timerInterval;
let isRunning = false;
let isBreak = false;
let sessionsCompleted = 0;

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");
  const timerText = document.getElementById("timer-text");
  if (timerText) {
    timerText.textContent = `${minutes}:${seconds}`;
  }

  const timerState = document.getElementById("timer-state");
  if (timerState) {
    timerState.textContent = isBreak ? "BREAK" : "WORK";
  }

  const progressCircle = document.getElementById("progress-circle");
  if (progressCircle) {
    const currentDuration = isBreak ? breakDuration : timerDuration;
    const progress = 440 - (440 * (timeLeft / currentDuration));
    progressCircle.style.strokeDashoffset = progress;
    progressCircle.style.stroke = isBreak ? "#4CAF50" : "#ffd369";
  }
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  timerInterval = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      isRunning = false;
      
      if (!isBreak) {
        // Work session completed, start break
        sessionsCompleted++;
        document.getElementById("session-count").textContent = sessionsCompleted;
        localStorage.setItem("sessionsCompleted", sessionsCompleted);
        timeLeft = breakDuration;
        isBreak = true;
        alert("Work session completed! Time for a break.");
      } else {
        // Break completed, start work
        timeLeft = timerDuration;
        isBreak = false;
        alert("Break finished! Ready to work?");
      }
      
      updateTimerDisplay();
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
  isBreak = false;
  timeLeft = timerDuration;
  updateTimerDisplay();
}

// Update timer duration when settings change
function setupTimerSettings() {
  const workDurationSelect = document.getElementById("work-duration");
  const breakDurationSelect = document.getElementById("break-duration");
  
  if (workDurationSelect) {
    workDurationSelect.addEventListener("change", () => {
      timerDuration = parseInt(workDurationSelect.value) * 60;
      if (!isRunning && !isBreak) {
        timeLeft = timerDuration;
        updateTimerDisplay();
      }
    });
  }
  
  if (breakDurationSelect) {
    breakDurationSelect.addEventListener("change", () => {
      breakDuration = parseInt(breakDurationSelect.value) * 60;
      if (!isRunning && isBreak) {
        timeLeft = breakDuration;
        updateTimerDisplay();
      }
    });
  }
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

// habit track
function setupHabitTracker() {
  renderHabits();
  
  // Add event listener for adding new habits
  const addHabitBtn = document.getElementById("add-habit");
  const habitInput = document.getElementById("habit-input");
  
  if (addHabitBtn && habitInput) {
    addHabitBtn.addEventListener("click", () => {
      const habitName = habitInput.value.trim();
      if (habitName) {
        addHabit(habitName);
        habitInput.value = "";
      }
    });
    
    habitInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const habitName = habitInput.value.trim();
        if (habitName) {
          addHabit(habitName);
          habitInput.value = "";
        }
      }
    });
  }
}

function addHabit(name) {
  const habits = getHabits();
  
  // Check if habit already exists
  if (habits.some(h => h.name.toLowerCase() === name.toLowerCase())) {
    alert("This habit already exists!");
    return;
  }
  
  // Create a new habit with the last 7 days
  const today = new Date();
  const last7Days = [];
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    last7Days.push({
      date: date.toISOString().split('T')[0],
      completed: false
    });
  }
  
  habits.push({
    name: name,
    streak: 0,
    days: last7Days
  });
  
  saveHabits(habits);
  renderHabits();
}

function toggleHabitDay(habitIndex, dayIndex) {
  const habits = getHabits();
  habits[habitIndex].days[dayIndex].completed = !habits[habitIndex].days[dayIndex].completed;
  
  // Recalculate streak
  recalculateStreak(habits[habitIndex]);
  
  saveHabits(habits);
  renderHabits();
}

function recalculateStreak(habit) {
  // Reset streak
  habit.streak = 0;
  
  // Go backwards from the most recent day
  for (let i = habit.days.length - 1; i >= 0; i--) {
    if (habit.days[i].completed) {
      habit.streak++;
    } else {
      break;
    }
  }
}

function deleteHabit(index) {
  if (confirm("Are you sure you want to delete this habit?")) {
    const habits = getHabits();
    habits.splice(index, 1);
    saveHabits(habits);
    renderHabits();
  }
}

function getHabits() {
  return JSON.parse(localStorage.getItem('habits')) || [];
}

function saveHabits(habits) {
  localStorage.setItem('habits', JSON.stringify(habits));
}

function renderHabits() {
  const habitList = document.getElementById("habit-list");
  if (!habitList) return;
  
  habitList.innerHTML = "";
  const habits = getHabits();
  const today = new Date().toISOString().split('T')[0];
  
  if (habits.length === 0) {
    const emptyItem = document.createElement("li");
    emptyItem.className = "habit-item";
    emptyItem.textContent = "No habits tracked yet. Add one above!";
    habitList.appendChild(emptyItem);
    return;
  }
  
  habits.forEach((habit, habitIndex) => {
    const habitItem = document.createElement("li");
    habitItem.className = "habit-item";
    
    // Habit top line (name, streak, actions)
    const topLine = document.createElement("div");
    topLine.style.display = "flex";
    topLine.style.justifyContent = "space-between";
    topLine.style.alignItems = "center";
    topLine.style.width = "100%";
    
    const habitName = document.createElement("div");
    habitName.className = "habit-name";
    habitName.textContent = habit.name;
    
    const habitStats = document.createElement("div");
    habitStats.style.display = "flex";
    habitStats.style.alignItems = "center";
    
    const streak = document.createElement("div");
    streak.className = "habit-streak";
    streak.innerHTML = `<i class="fas fa-fire"></i> ${habit.streak}`;
    
    const habitActions = document.createElement("div");
    habitActions.className = "habit-actions";
    
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.title = "Delete habit";
    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      deleteHabit(habitIndex);
    });
    
    habitActions.appendChild(deleteBtn);
    habitStats.appendChild(streak);
    habitStats.appendChild(habitActions);
    
    topLine.appendChild(habitName);
    topLine.appendChild(habitStats);
    
    // Habit day circles
    const daysRow = document.createElement("div");
    daysRow.className = "habit-days";
    
    // Get the weekday letters
    const weekdays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    
    habit.days.forEach((day, dayIndex) => {
      const dayCircle = document.createElement("div");
      dayCircle.className = "habit-day";
      if (day.completed) {
        dayCircle.classList.add("completed");
      }
      if (day.date === today) {
        dayCircle.classList.add("today");
      }
      
      dayCircle.textContent = weekdays[new Date(day.date).getDay()];
      dayCircle.title = new Date(day.date).toLocaleDateString();
      
      dayCircle.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleHabitDay(habitIndex, dayIndex);
      });
      
      daysRow.appendChild(dayCircle);
    });
    
    habitItem.appendChild(topLine);
    habitItem.appendChild(daysRow);
    habitList.appendChild(habitItem);
  });
}


// 🚀 Load saved state on page load
window.onload = () => {
  // Load quote
  loadQuote();
  
  // Load saved goals
  const savedGoals = localStorage.getItem("dailyGoals");
  if (savedGoals) {
    document.getElementById("goals").value = savedGoals;
  }
  
  // Load saved notes
  const savedNotes = localStorage.getItem("quickNotes");
  if (savedNotes) {
    document.getElementById("notes").value = savedNotes;
  }
  
  // Load session count
  const savedSessions = localStorage.getItem("sessionsCompleted");
  if (savedSessions) {
    sessionsCompleted = parseInt(savedSessions);
    document.getElementById("session-count").textContent = sessionsCompleted;
  }
  
  // Set up components
  renderTasks();
  renderSavedQuotes();
  updateTimerDisplay();
  setupTimerSettings();
  setupHabitTracker();
  
  // Set up event listeners
  setupButtons();
};

function setupButtons() {
  // Quote buttons
  const nextQuoteBtn = document.getElementById("next-quote");
  if (nextQuoteBtn) {
    nextQuoteBtn.addEventListener("click", setRandomQuote);
  }
  
  const saveQuoteBtn = document.getElementById("save-quote");
  if (saveQuoteBtn) {
    saveQuoteBtn.addEventListener("click", saveCurrentQuote);
  }
  
  // Notes button
  const saveNotesBtn = document.getElementById("save-notes");
  if (saveNotesBtn) {
    saveNotesBtn.addEventListener("click", saveNotes);
  }
  
  // Timer buttons (if not using inline onclick)
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
}