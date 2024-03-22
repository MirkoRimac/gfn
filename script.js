function darkMode() {
    var element = document.body;
    var darkModeButton = document.getElementById("darkModeButton");

    // Toggle dark mode class on body
    element.classList.toggle("dark-mode");

    // Check if dark mode is active
    var isDarkModeActive = element.classList.contains("dark-mode");

    // Update button text and color based on dark mode state
    if (isDarkModeActive) {
        darkModeButton.textContent = "Light Mode";
        darkModeButton.classList.remove("btn-outline-light");
        darkModeButton.classList.add("btn-dark");
    } else {
        darkModeButton.textContent = "Dark Mode";
        darkModeButton.classList.remove("btn-dark");
        darkModeButton.classList.add("btn-outline-light");
    }

    // Toggle class on <hr> elements
    var hrElements = document.querySelectorAll(".mode-sensitive-hr");
    hrElements.forEach(function(hr) {
        hr.classList.toggle("light-mode", !isDarkModeActive);
        hr.classList.toggle("dark-mode", isDarkModeActive);
    });

    // Store dark mode preference in browser storage
    localStorage.setItem("darkMode", isDarkModeActive);
}

// Function to apply dark mode based on user preference stored in browser storage
function applyDarkModePreference() {
    var isDarkModeActive = localStorage.getItem("darkMode") === "true";
    var element = document.body;
    var darkModeButton = document.getElementById("darkModeButton");

    if (isDarkModeActive) {
        element.classList.add("dark-mode");
        darkModeButton.textContent = "Light Mode";
        darkModeButton.classList.remove("btn-outline-light");
        darkModeButton.classList.add("btn-dark");
    } else {
        element.classList.remove("dark-mode");
        darkModeButton.textContent = "Dark Mode";
        darkModeButton.classList.remove("btn-dark");
        darkModeButton.classList.add("btn-outline-light");
    }

    // Apply dark mode to <hr> elements
    var hrElements = document.querySelectorAll(".mode-sensitive-hr");
    hrElements.forEach(function(hr) {
        hr.classList.toggle("light-mode", !isDarkModeActive);
        hr.classList.toggle("dark-mode", isDarkModeActive);
    });
}

// Call applyDarkModePreference function when the page loads
window.onload = applyDarkModePreference;

// GOTCHA
function showAlert() {
    alert('HA! ERWISCHT! Zurück an die Arbeit, sonst schwingt Tobsen die Peitsche!');
}

// Team Bild
document.addEventListener("DOMContentLoaded", function() {
    // Get reference to the image
    var introImage = document.getElementById("introImage");

    // Function to fade out the image after 1 second when the page loads
    setTimeout(function(){
        introImage.style.display = "none";
    }, 1000);

    // Click event handler for the button
    document.getElementById("fadeButton").addEventListener("click", function() {
        // Show the image when the button is clicked
        introImage.style.display = "block";

        // Fade out the image after 3 seconds
        setTimeout(function(){
            introImage.style.display = "none";
        }, 3000);
    });
});