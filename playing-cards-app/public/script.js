"use strict";
var _a, _b;
document.addEventListener('DOMContentLoaded', function () {
    refreshDeck();
});
function getDeck() {
    fetch('/deck')
        .then(response => response.json())
        .then((data) => {
        const deckContainer = document.getElementById('deckContainer');
        if (!deckContainer)
            return;
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
(_a = document.getElementById('addCardForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const card = Object.fromEntries(formData);
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
(_b = document.getElementById('deleteCardForm')) === null || _b === void 0 ? void 0 : _b.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const card = Object.fromEntries(formData);
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
function refreshDeck() {
    fetch('/deck')
        .then(response => response.json())
        .then((data) => {
        const deckContainer = document.getElementById('deckContainer');
        if (!deckContainer)
            return;
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
function getRandomCard() {
    fetch('/deck/random')
        .then(response => response.json())
        .then((card) => {
        const deckContainer = document.getElementById('deckContainer');
        if (!deckContainer)
            return;
        deckContainer.innerHTML = '';
        const imgElement = document.createElement('img');
        const imageName = `${card.value.toLowerCase()}_of_${card.suit.toLowerCase()}.png`;
        imgElement.src = `images/${imageName}`;
        imgElement.alt = `${card.value} of ${card.suit}`;
        imgElement.classList.add('card');
        deckContainer.appendChild(imgElement);
    });
}
function shuffleDeck() {
    fetch('/deck/shuffle', { method: 'PATCH' })
        .then(() => getDeck());
}
