const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Serve the default document (e.g., index.html) at the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/api/messages', (req, res) => {
  const { text } = req.body;
  // Assuming you have a function to handle the bot response
  const botResponse = getBotResponse(text);
  botResponse.then(response => {
    res.json({ text: `Bot: ${response}` });
  })
  .catch(error => {
    console.error('Error:', error);
    res.status(500).send('Something went wrong');
  });
});

// Function to handle the bot response (replace with your actual logic)
async function getBotResponse(text) {
  // This is a placeholder for your actual fetch call to the bot service
  const response = await fetch(`https://nightmes-bot.azurewebsites.net/api/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ type: 'message', text: text })
  });
  const data = await response.json();
  return data;
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
