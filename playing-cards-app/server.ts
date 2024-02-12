import express, { Request, Response } from 'express';
import { getDeck, addCard, deleteCard, shuffleDeck } from './deck'; // Assuming you have converted deck.js to deck.ts and exported functions appropriately

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

app.get('/deck', (req: Request, res: Response) => {
  res.json(getDeck());
});

app.get('/deck/random', (req: Request, res: Response) => {
  const deck = getDeck();
  const card = deck[Math.floor(Math.random() * deck.length)];
  res.json(card);
});

app.post('/deck', (req: Request, res: Response) => {
  addCard(req.body);
  res.status(201).send();
});

app.delete('/deck', (req: Request, res: Response) => {
  deleteCard(req.body);
  res.status(204).send();
});

app.patch('/deck/shuffle', (req: Request, res: Response) => {
  shuffleDeck();
  res.status(200).send();
});

app.get('/testimage', (req: Request, res: Response) => {
  res.sendFile(__dirname + '/public/images/5_of_diamonds.png');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
