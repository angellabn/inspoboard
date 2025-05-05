// login.js
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is already logged in
    const currentUser = localStorage.getItem('inspoboard_current_user');
    if (currentUser) {
      // Redirect to main page
      window.location.href = 'index.html';
    }
  
    // Set up login button click event
    const loginBtn = document.getElementById('login-btn');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('login-error');
  
    loginBtn.addEventListener('click', handleLogin);
    
    // Also handle Enter key press
    passwordInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        handleLogin();
      }
    });
  
    // Handle login functionality
    function handleLogin() {
      const username = usernameInput.value.trim().toLowerCase();
      const password = passwordInput.value;
      
      // Very simple authentication - in production you would use a proper authentication system
      // For demo purposes, we're hardcoding credentials
      if ((username === 'angella' && password === 'password123') || 
          (username === 'anvinto' && password === 'password123')) {
        
        // Store current user
        localStorage.setItem('inspoboard_current_user', username);
        
        // Create user data store if it doesn't exist
        initializeUserData(username);
        
        // Redirect to main page
        window.location.href = 'index.html';
      } else {
        // Show error message
        errorMessage.textContent = 'Invalid username or password';
        
        // Clear the error after 3 seconds
        setTimeout(() => {
          errorMessage.textContent = '';
        }, 3000);
      }
    }
    
    // Initialize user data if this is their first login
    function initializeUserData(username) {
      const userKey = `inspoboard_${username}_`;
      
      // Check if user already has data
      if (!localStorage.getItem(`${userKey}initialized`)) {
        // Set default data for new user
        localStorage.setItem(`${userKey}initialized`, 'true');
        localStorage.setItem(`${userKey}dailyGoals`, '');
        localStorage.setItem(`${userKey}quickNotes`, '');
        localStorage.setItem(`${userKey}tasks`, JSON.stringify([]));
        localStorage.setItem(`${userKey}savedQuotes`, JSON.stringify([]));
        localStorage.setItem(`${userKey}habits`, JSON.stringify([]));
        localStorage.setItem(`${userKey}sessionsCompleted`, '0');
      }
    }
  });
  
  // Helper function to fill in demo credentials
  function fillCredentials(username, password) {
    document.getElementById('username').value = username;
    document.getElementById('password').value = password;
  }