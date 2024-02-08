const suits = ['diamonds', 'hearts', 'spades', 'clubs']; //Suits to name card
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace']; //Values for cards

let deck = null; //Preparing deck as null

const initializeDeck = () => {
  deck = [];
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
exports.addCard = (card) => deck.push(card);
exports.deleteCard = (cardToDelete) => {
    // Find the index of the first card that matches the criteria
    const index = deck.findIndex(card => card.suit === cardToDelete.suit && card.value === cardToDelete.value);
  
    // If a matching card is found (index !== -1), remove it
    if (index !== -1) {
      deck.splice(index, 1); // Remove one item at the found index
    }
  };

  
exports.shuffleDeck = () => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
};
