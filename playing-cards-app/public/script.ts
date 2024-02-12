document.addEventListener('DOMContentLoaded', function () {
  refreshDeck();
});

interface Card {
  suit: string;
  value: string;
}

function getDeck(): void {
  fetch('/deck')
    .then(response => response.json())
    .then((data: Card[]) => {
      const deckContainer = document.getElementById('deckContainer');
      if (!deckContainer) return;

      deckContainer.innerHTML = '';
      data.forEach(card => {
        const imgElement = document.createElement('img');
        const imageName = `${card.value.toLowerCase()}_of_${card.suit.toLowerCase()}.png`;
        imgElement.src = `images/${imageName}`;
        imgElement.alt = `${card.value} of ${card.suit}`;
        imgElement.classList.add('card');
        deckContainer.appendChild(imgElement);
      });
    });
}

document.getElementById('addCardForm')?.addEventListener('submit', function (e) {
  e.preventDefault();

  const formData = new FormData(e.target as HTMLFormElement);
  const card = Object.fromEntries(formData) as unknown as Card;

  fetch('/deck', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(card),
  })
    .then(response => {
      if (response.ok) {
        return response.text();
      }
      throw new Error('Failed to add card');
    })
    .then(() => {
      alert('Card added!');
      refreshDeck();
    })
    .catch(error => {
      console.error('Error:', error);
    });
});

document.getElementById('deleteCardForm')?.addEventListener('submit', function (e) {
  e.preventDefault();

  const formData = new FormData(e.target as HTMLFormElement);
  const card = Object.fromEntries(formData) as unknown as Card;

  fetch('/deck', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(card),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to delete card: Card doesn\'t exist in deck.');
      }
      return response.text();
    })
    .then(() => {
      alert('Card deleted!');
      refreshDeck();
    })
    .catch(error => {
      console.error('Error:', error);
      alert(error);
    });
});

function refreshDeck(): void {
  fetch('/deck')
    .then(response => response.json())
    .then((data: Card[]) => {
      const deckContainer = document.getElementById('deckContainer');
      if (!deckContainer) return;

      deckContainer.innerHTML = '';
      data.forEach(card => {
        const imgElement = document.createElement('img');
        const imageName = `${card.value.toLowerCase()}_of_${card.suit.toLowerCase()}.png`;
        imgElement.src = `images/${imageName}`;
        imgElement.alt = `${card.value} of ${card.suit}`;
        imgElement.classList.add('card');
        deckContainer.appendChild(imgElement);
      });
    })
    .catch(error => console.error('Error refreshing deck:', error));
}

function getRandomCard(): void {
  fetch('/deck/random')
    .then(response => response.json())
    .then((card: Card) => {
      const deckContainer = document.getElementById('deckContainer');
      if (!deckContainer) return;

      deckContainer.innerHTML = '';

      const imgElement = document.createElement('img');
      const imageName = `${card.value.toLowerCase()}_of_${card.suit.toLowerCase()}.png`;
      imgElement.src = `images/${imageName}`;
      imgElement.alt = `${card.value} of ${card.suit}`;
      imgElement.classList.add('card');

      deckContainer.appendChild(imgElement);
    });
}

function shuffleDeck(): void {
  fetch('/deck/shuffle', { method: 'PATCH' })
    .then(() => getDeck());
}
