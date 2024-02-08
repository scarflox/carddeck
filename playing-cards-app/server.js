const express = require('express');
const { getDeck, addCard, deleteCard, shuffleDeck } = require('./deck');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

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

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
