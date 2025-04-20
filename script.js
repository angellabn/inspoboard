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

// Load saved goals on page load
window.onload = function () {
  const saved = localStorage.getItem("dailyGoals");
  if (saved) {
    document.getElementById("goals").value = saved;
  }
};
