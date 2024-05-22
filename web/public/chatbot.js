function startChat() {
    document.getElementById('search-box').style.display = 'none';
    document.getElementById('chat-box').style.display = 'block';
}

function sendMessage() {
    const message = document.getElementById('message').value;
    const messages = document.getElementById('messages');
    const newMessage = document.createElement('div');
    newMessage.textContent = `You: ${message}`;
    messages.appendChild(newMessage);
    document.getElementById('message').value = '';

    fetch('/api/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: message })
    })
    .then(response => response.json())
    .then(data => {
        const botMessage = document.createElement('div');
        botMessage.textContent = data.text;
        messages.appendChild(botMessage);
    });
}
