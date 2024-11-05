---
layout: post 
title: Create and Compete - Riddle Room
search_exclude: true
permalink: /create_and_compete/riddle
menu: nav/create_and_compete.html
author: Kush, Tarun, Vincent, and Nolan
---

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

<div class="container">
    <!-- Section for Selecting Group and Channel -->
    <div class="form-container">
        <h2>Select Group and Channel</h2>
        <form id="groupChannelForm">
            <label for="groupSelect">Group:</label>
            <select id="groupSelect" name="group" required>
                <option value="">Select a group</option>
            </select>
            <label for="channelSelect">Channel:</label>
            <select id="channelSelect" name="channel" required>
                <option value="">Select a channel</option>
            </select>
            <button type="button" id="selectButton">Select</button>
        </form>
    </div>

    <!-- Section for Adding a New Post -->
    <div class="form-container">
        <h2>Add New Post</h2>
        <form id="postForm">
            <label for="title">Title:</label>
            <input type="text" id="title" name="title" required>
            <label for="content">Comment:</label>
            <textarea id="content" name="content" required></textarea>
            <button type="submit">Add Post</button>
        </form>
    </div>
</div>

<script type="module">
    // Import server URI and fetch options
    import { pythonURI, fetchOptions } from '/portfolio_2025/assets/js/api/config.js';

    // Fetch groups for the dropdown
    async function fetchGroups() {
        try {
            const response = await fetch(`${pythonURI}/api/group`, fetchOptions);
            if (!response.ok) throw new Error('Failed to fetch groups: ' + response.statusText);
            const groups = await response.json();
            const groupSelect = document.getElementById('groupSelect');
            groups.forEach(group => {
                const option = document.createElement('option');
                option.value = group.id;
                option.textContent = group.name;
                groupSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error fetching groups:', error);
        }
    }

    // Fetch channels when a group is selected
    document.getElementById('groupSelect').addEventListener('change', async function() {
        const groupId = this.value;
        const channelSelect = document.getElementById('channelSelect');
        channelSelect.innerHTML = '<option value="">Select a channel</option>'; // Reset channel options

        if (groupId) {
            try {
                const response = await fetch(`${pythonURI}/api/group/${groupId}/channels`, fetchOptions);
                if (!response.ok) throw new Error('Failed to fetch channels: ' + response.statusText);
                const channels = await response.json();
                channels.forEach(channel => {
                    const option = document.createElement('option');
                    option.value = channel.id;
                    option.textContent = channel.name;
                    channelSelect.appendChild(option);
                });
            } catch (error) {
                console.error('Error fetching channels:', error);
            }
        }
    });

    // Handle form submission to add a new post
    document.getElementById('postForm').addEventListener('submit', async function(event) {
        event.preventDefault();
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        const groupId = document.getElementById('groupSelect').value;

        const postData = { title, content, group_id: groupId };

        try {
            const response = await fetch(`${pythonURI}/api/post`, {
                ...fetchOptions,
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(postData)
            });

            if (!response.ok) throw new Error('Failed to add post: ' + response.statusText);
            alert('Post added successfully!');
            document.getElementById('postForm').reset();
        } catch (error) {
            console.error('Error adding post:', error);
            alert('Error adding post: ' + error.message);
        }
    });

    // Initialize by fetching groups
    fetchGroups();
</script>
