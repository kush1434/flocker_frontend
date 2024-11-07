---
layout: post 
title: Create and Compete - Riddle Room
search_exclude: true
permalink: /create_and_compete/riddle
menu: nav/create_and_compete.html
author: Kush, Tarun, Vincent, and Nolan
---

<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.7.4/socket.io.js" integrity="sha512-tE1z+95+lMCGwy+9PnKgUSIeHhvioC9lMlI7rLWU0Ps3XTdjRygLcy4mLuL0JAoK4TLdQEyP0yOl/9dMOqpH/Q==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

<link rel="stylesheet" href="{{site.baseurl}}/navigation/create_and_compete/riddle.css">

<details>
  <br>
  <summary>Room Details</summary>

  <a href="{{site.baseurl}}/moderation/rules_riddle/">Moderation Rules</a>

  <p>The main purpose of our riddle room is to have people think critically and collaborate with the other members of the channel to solve the riddle as fast as possible.</p>

  <p>Room will consist of:</p>
  <ul>
    <li>Daily riddle which is optionally pinned to the top of our channel</li>
    <li>Answers will be posted at the end of the day</li>
    <li>Chat box where members of the channel can collaborate to solve the riddle</li>
    <li>AI which posts the answer if someone gets it, else posts the answer at the end of the day</li>
    <li>Profanity is censored</li>
  </ul>
</details>

<div id="riddle-container">
    <h4 style="text-align: center;">Riddle of the Day</h4>
    <p id="riddle-text"></p>
</div>

<div id="chat-container">
    <div id="chat-box"></div>
    <div id="users-list">
        <h4 style="color: #4A4848;" >Users</h4>
        <ul id="userList">
            <li>System</li>
        </ul>
    </div>
</div>

<div class="input-group">
    <input type="text" id="message-input" placeholder="Type your message...">
    <button id="send-button" onclick="sendMessage()">Send</button>
</div>

<div class="input-group">
    <input type="text" id="answer-input" placeholder="Enter your answer(with no extra characters)...">
    <button id="check-answer" onclick="checkAnswer()">Check Answer</button>
</div>

<script src="{{site.baseurl}}/navigation/create_and_compete/riddle.js"></script>

<div style="display: flex; justify-content: center; margin-top: 50px;">
    <button id="feedback-button" onclick="window.location.href='https://github.com/kush1434/flocker_frontend/issues/2'">Feedback</button>
</div>

<script type = 'module'> 
const response = await fetch(`${pythonURI}/api/channels/filter`, {
    ...fetchOptions,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ group_name: groupName })
});

const postData = {
    title: title,
    comment: comment,
    channel_id: channelId
};
const response = await fetch(`${pythonURI}/api/post`, {
    ...fetchOptions,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(postData)
});


cconst response = await fetch(`${pythonURI}/api/posts/filter`, {
    ...fetchOptions,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ channel_id: channelId })
});
const postData = await response.json();
postData.forEach(postItem => {
    const postElement = document.createElement('div');
    postElement.className = 'post-item';
    postElement.innerHTML = `
        <h3>${postItem.title}</h3>
        <p><strong>Channel:</strong> ${postItem.channel_name}</p>
        <p><strong>User:</strong> ${postItem.user_name}</p>
        <p>${postItem.comment}</p>
    `;
    detailsDiv.appendChild(postElement);
});