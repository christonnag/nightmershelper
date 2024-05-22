const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/api/messages', (req, res) => {
    const { text } = req.body;
    const botResponse = fetch(`http://localhost:3978/api/messages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ type: 'message', text: text })
    })
    .then(response => response.json())
    .then(data => {
        res.json({ text: `Bot: You said "${text}"` });
    })
    .catch(error => {
        console.error('Error:', error);
        res.status(500).send('Something went wrong');
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log
