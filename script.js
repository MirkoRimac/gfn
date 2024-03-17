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

$(document).ready(function(){
    var isFadedOut = false; // Variable to track if the image is currently faded out

    // Function to fade out the image
    function fadeOutImage() {
        $("#introImage").fadeOut();
        isFadedOut = true; // Update the state of the image
    }

    // Function to fade in the image
    function fadeInImage() {
        $("#introImage").fadeIn();
        isFadedOut = false; // Update the state of the image
    }

    // Initial fade out after 3 seconds
    setTimeout(fadeOutImage, 1000);

    // Click event handler for the button
    $("#fadeButton").click(function(){
        // Cancel any pending fade out action
        clearTimeout(timeoutID);

        // Toggle fading in and fading out based on the current state of the image
        if (isFadedOut) {
            fadeInImage();
        } else {
            fadeOutImage();
        }

        // Set up the automatic fade out after 3 seconds if the image is not currently faded out
        if (!isFadedOut) {
            timeoutID = setTimeout(fadeOutImage, 3000);
        }
    });

    var timeoutID; // Variable to hold the timeout ID
});

// ASANA

const express = require('express');
const axios = require('axios');
const querystring = require('querystring');

const app = express();

const clientId = '1206856740786938';
const clientSecret = '51ff4469658c2d9a504eb84deed07b3c';
const redirectUri = 'https://app.asana.com/0/home/1206816080257901'; // Update this with your actual redirect URI

// Step 1: Redirect users to Asana for authorization
app.get('/auth/asana', (req, res) => {
    const asanaAuthUrl = `https://app.asana.com/-/oauth_authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}`;
    res.redirect(asanaAuthUrl);
});

// Step 2: Handle Asana callback
app.get('/auth/asana/callback', async (req, res) => {
    const { code } = req.query;

    try {
        // Step 3: Exchange authorization code for access token
        const response = await axios.post('https://app.asana.com/-/oauth_token', querystring.stringify({
            grant_type: 'authorization_code',
            client_id: clientId,
            client_secret: clientSecret,
            redirect_uri: redirectUri,
            code: code
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const accessToken = response.data.access_token;

        // Step 4: Use access token to make requests to Asana API
        const tasksResponse = await axios.get('https://app.asana.com/api/1.0/tasks', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        const tasks = tasksResponse.data.data;

        // Display tasks in the browser
        res.send(tasks);
    } catch (error) {
        console.error('Error:', error.response.data);
        res.status(500).send('An error occurred');
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});