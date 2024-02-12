"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const deck_1 = require("./deck"); // Assuming you have converted deck.js to deck.ts and exported functions appropriately
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use(express_1.default.static('public'));
app.get('/deck', (req, res) => {
    res.json((0, deck_1.getDeck)());
});
app.get('/deck/random', (req, res) => {
    const deck = (0, deck_1.getDeck)();
    const card = deck[Math.floor(Math.random() * deck.length)];
    res.json(card);
});
app.post('/deck', (req, res) => {
    (0, deck_1.addCard)(req.body);
    res.status(201).send();
});
app.delete('/deck', (req, res) => {
    (0, deck_1.deleteCard)(req.body);
    res.status(204).send();
});
app.patch('/deck/shuffle', (req, res) => {
    (0, deck_1.shuffleDeck)();
    res.status(200).send();
});
app.get('/testimage', (req, res) => {
    res.sendFile(__dirname + '/public/images/5_of_diamonds.png');
});
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
