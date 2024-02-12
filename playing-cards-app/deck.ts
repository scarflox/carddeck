
type Suit = 'diamonds' | 'hearts' | 'spades' | 'clubs';
type Value = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'jack' | 'queen' | 'king' | 'ace';

interface Card {
  suit: Suit;
  value: Value;
}

let deck: Card[] | null;

const initializeDeck = (): void => {
  deck = [];
  const suits: Suit[] = ['diamonds', 'hearts', 'spades', 'clubs'];
  const values: Value[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace'];

  suits.forEach(suit => {
    values.forEach(value => {
      deck!.push({ suit, value });
    });
  });
};

export const getDeck = (): Card[] => {
  if (!deck) {
    initializeDeck();
  }
  return deck!;
};

export const addCard = (card: Card): void => {
  deck!.push(card);
};

export const deleteCard = (cardToDelete: Card): void => {
  const index = deck!.findIndex(card => card.suit === cardToDelete.suit && card.value === cardToDelete.value);
  if (index !== -1) {
    deck!.splice(index, 1);
  }
};

export const shuffleDeck = (): void => {
  for (let i = deck!.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck![i], deck![j]] = [deck![j], deck![i]];
  }
};