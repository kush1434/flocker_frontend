const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');
const answerInput = document.getElementById('answer-input');
const userList = document.getElementById('userList');
const riddleText = document.getElementById('riddle-text');
const users = new Set(['System']);
let username;
let currentRiddle = {}; 

function displayRiddle() {
    const riddles = [
        { question: "What has keys but can't open locks?", answer: "piano" },
        { question: "What has a head, a tail, but no body?", answer: "coin" },
        { question: "What comes once in a minute, twice in a moment, but never in a thousand years?", answer: "m" },
        { question: "I'm tall when I'm young, and I'm short when I'm old. What am I?", answer: "candle" },
        { question: "What has to be broken before you can use it?", answer: "egg" },
        { question: "What runs but never walks, has a mouth but never talks?", answer: "river" },
        { question: "What comes down but never goes up?", answer: "rain" },
        { question: "What has hands but can't clap?", answer: "clock" },
        { question: "What has a bed but never sleeps?", answer: "river" },
        { question: "What is always in front of you but can't be seen?", answer: "future" },
        { question: "What can travel around the world while staying in a corner?", answer: "stamp" },
        { question: "What is full of holes but still holds water?", answer: "sponge" },
        { question: "What gets wetter as it dries?", answer: "towel" },
        { question: "What can you catch but not throw?", answer: "cold" },
        { question: "What has a heart that doesn't beat?", answer: "artichoke" },
        { question: "What has an eye but cannot see?", answer: "needle" },
        { question: "What belongs to you but others use it more than you do?", answer: "name" },
        { question: "What goes up but never comes down?", answer: "age" },
        { question: "What has one head, one foot, and four legs?", answer: "bed" }
    ];
    const riddleIndex = new Date().getDate() % riddles.length;
    currentRiddle = riddles[riddleIndex];
    riddleText.textContent = currentRiddle.question;
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
}

function checkAnswer() {
    const userAnswer = answerInput.value.trim().toLowerCase();
    if (userAnswer === currentRiddle.answer) {
        displayMessage(`${username} got it right!`, true);
    } else {
        displayMessage(`${username} guessed wrong! Try again.`, true);
    }
    answerInput.value = '';
}

displayMessage("Welcome to the Riddle Room Chat!", true);
requestUsername();
displayRiddle();
