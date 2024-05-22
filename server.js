const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/search', async (req, res) => {
  const query = req.body.query;
  // Hier würden Sie die Logik implementieren, um die Anfrage an Microsoft 365 Copilot zu senden
  // und die Antwort zu verarbeiten.
  const response = "Hier würde die Antwort von Copilot erscheinen.";
  res.render('search', { response });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
