const express = require('express'); // Express: web framework for Node.js
const { getDeck, addCard, deleteCard, shuffleDeck } = require('./deck'); // Import of functions from deck.js, managing the deck of cards.
const app = express(); // Creating the Express application
const port = 3000; // Common port used for development purposes.

// Middleware:
app.use(express.json()); // Parses incoming requests.you'
app.use(express.static('public')); // This serves static files from the public directory.

// GET – returns all the cards in our deck
app.get('/deck', (req, res) => {
  res.json(getDeck());
});

// GET – returns a random card from the deck
app.get('/deck/random', (req, res) => {
  const deck = getDeck();
  const card = deck[Math.floor(Math.random() * deck.length)];
  res.json(card);
});

// POST – adds a card to the deck
app.post('/deck', (req, res) => {
  addCard(req.body);
  res.status(201).send();
});

// DELETE – deletes a card from the deck
app.delete('/deck', (req, res) => {
  deleteCard(req.body);
  res.status(204).send();
});

// PATCH – shuffles the deck
app.patch('/deck/shuffle', (req, res) => {
  shuffleDeck();
  res.status(200).send();
});
// test
app.get('/testimage', (req, res) => {
    res.sendFile(__dirname + '/public/images/5_of_diamonds.png');
  });
// Starting the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
