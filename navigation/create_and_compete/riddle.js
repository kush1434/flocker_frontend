const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');
const answerInput = document.getElementById('answer-input');
const userList = document.getElementById('userList');
const riddleText = document.getElementById('riddle-text');
const users = new Set(['System']);
let username;
let currentRiddle = {};
const serverSocketEndpoint = "http://127.0.0.1:8887/"

var socket = io(`${serverSocketEndpoint}/`,{ autoConnect: false,extraHeaders: { //connect to the backend with socket.io
  } });

  socket.on('connect', function() {
   socket.emit("join","chat")
});

// Function to fetch a random riddle from the API
async function fetchRiddle() {
    try {
        const response = await fetch("https://riddles-api.vercel.app/random");
        if (response.ok) {
            const data = await response.json();
            currentRiddle = { question: data.riddle, answer: data.answer.toLowerCase() }; // Store answer in lowercase
            riddleText.textContent = currentRiddle.question;
        } else {
            displayMessage("Error fetching riddle from API.", true);
        }
    } catch (error) {
        displayMessage("Network error occurred while fetching riddle.", true);
    }
}

// Function to display a riddle once a day
function displayRiddle() {
    const today = new Date().toDateString();
    const lastFetchedDate = localStorage.getItem('riddleDate');

    if (lastFetchedDate === today && localStorage.getItem('riddleQuestion')) {
        // Use the riddle from local storage if it was already fetched today
        currentRiddle = {
            question: localStorage.getItem('riddleQuestion'),
            answer: localStorage.getItem('riddleAnswer')
        };
        riddleText.textContent = currentRiddle.question;
    } else {
        // Fetch a new riddle from the API
        fetchRiddle().then(() => {
            localStorage.setItem('riddleDate', today);
            localStorage.setItem('riddleQuestion', currentRiddle.question);
            localStorage.setItem('riddleAnswer', currentRiddle.answer);
        });
    }
}

function requestUsername() {
    while (true) {
        const enteredUsername = prompt("Enter your username:");
        if (enteredUsername && !users.has(enteredUsername)) {
            username = enteredUsername;
            addUser(username);
            displayMessage(`You have joined as ${username}.`, true);
            break;
        } else {
            alert("Username is taken or invalid. Please try again.");
        }
    }
}

function displayMessage(message, isSystem = false) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', isSystem ? 'system-message' : 'user-message');
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function addUser(newUsername) {
    users.add(newUsername);
    const userItem = document.createElement('li');
    userItem.textContent = newUsername;
    userList.appendChild(userItem);
}

function sendMessage() {
    const messageText = messageInput.value.trim();
    if (messageText !== '') {
        displayMessage(`${username}: ${messageText}`);
        messageInput.value = '';
    }
    socket.emit("sendMessage",messageText)
    
}

socket.on("recieveMessage",function(data)
{
    displayMessage(`${data["name"]}: ${data["message"]}`)
})

function isAnswerCloseEnough(userAnswer, correctAnswer) {
    // If the answer matches exactly, it’s correct
    if (userAnswer === correctAnswer) {
        return true;
    }

    // Normalize correct answer keywords
    const correctKeywords = correctAnswer
        .replace(/[^\w\s]/g, '')  // Remove punctuation
        .toLowerCase()
        .split(' ')
        .filter(word => word.length > 2); // Filter out very short words

    // Normalize the user's answer
    const normalizedAnswer = userAnswer.trim().toLowerCase();

    // Check if the user's answer contains a minimum threshold of keywords
    const keywordsMatched = correctKeywords.filter(keyword => normalizedAnswer.includes(keyword));
    const matchThreshold = Math.ceil(correctKeywords.length * 0.3); // Set to 30%

    return keywordsMatched.length >= matchThreshold;
}

function checkAnswer() {
    const userAnswer = answerInput.value.trim().toLowerCase();  
    const correctAnswer = currentRiddle.answer.toLowerCase();   

    // Try exact match first
    if (userAnswer === correctAnswer) {
        displayMessage(`${username} got it right!`, true);
    } else if (isAnswerCloseEnough(userAnswer, correctAnswer)) {
        displayMessage(`${username} got it right!`, true);
    } else {
        displayMessage(`${username} guessed wrong! Try again.`, true);
    }

    answerInput.value = '';
}


// Initial setup
displayMessage("Welcome to the Riddle Room Chat!", true);
requestUsername();
displayRiddle();

