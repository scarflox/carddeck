"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shuffleDeck = exports.deleteCard = exports.addCard = exports.getDeck = void 0;
let deck = null;
const initializeDeck = () => {
    deck = [];
    const suits = ['diamonds', 'hearts', 'spades', 'clubs'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace'];
    suits.forEach(suit => {
        values.forEach(value => {
            deck.push({ suit, value });
        });
    });
};
const getDeck = () => {
    if (!deck) {
        initializeDeck();
    }
    return deck;
};
exports.getDeck = getDeck;
const addCard = (card) => {
    deck.push(card);
};
exports.addCard = addCard;
const deleteCard = (cardToDelete) => {
    const index = deck.findIndex(card => card.suit === cardToDelete.suit && card.value === cardToDelete.value);
    if (index !== -1) {
        deck.splice(index, 1);
    }
};
exports.deleteCard = deleteCard;
const shuffleDeck = () => {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
};
exports.shuffleDeck = shuffleDeck;
