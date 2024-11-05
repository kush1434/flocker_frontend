const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');
const answerInput = document.getElementById('answer-input');
const userList = document.getElementById('userList');
const riddleText = document.getElementById('riddle-text');
const users = new Set(['System']);
let username;
let currentRiddle;

function displayRiddle() {
    const riddles = [
        { question: "What has keys but can't open locks?", answer: "piano" },
        { question: "What has a head, a tail, but no body?", answer: "coin" },
        { question: "What comes once in a minute, twice in a moment, but never in a thousand years?", answer: "m" },
        { question: "I'm tall when I'm young, and I'm short when I'm old. What am I?", answer: "candle" },
        { question: "What has to be broken before you can use it?", answer: "egg" }
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
