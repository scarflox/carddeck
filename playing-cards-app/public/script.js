document.addEventListener('DOMContentLoaded', function() {
    refreshDeck(); // Call the function to fetch and display the deck
});

function getDeck() {
    fetch('/deck')
        .then(response => response.json())
        .then(data => {
            const deckContainer = document.getElementById('deckContainer');
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

document.getElementById('addCardForm').addEventListener('submit', function(e) {
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
      refreshDeck()
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });

  document.getElementById('deleteCardForm').addEventListener('submit', function(e) {
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
      if (response.ok) {
        return response.text();
      }
      throw new Error('Failed to delete card');
    })
    .then(() => {
      alert('Card deleted!');
      refreshDeck()
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });
  

  function refreshDeck() {
    fetch('/deck')
        .then(response => response.json())
        .then(data => {
            const deckContainer = document.getElementById('deckContainer');
            deckContainer.innerHTML = ''; // Clear the existing deck

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
        .then(card => {
            const deckContainer = document.getElementById('deckContainer');
            deckContainer.innerHTML = ''; // Clear the container

            const imgElement = document.createElement('img');
            const imageName = `${card.value.toLowerCase()}_of_${card.suit.toLowerCase()}.png`; // Construct image name
            imgElement.src = `images/${imageName}`; 
            imgElement.alt = `${card.value} of ${card.suit}`;
            imgElement.classList.add('card'); 

            deckContainer.appendChild(imgElement);
        });
}

function shuffleDeck() {
    fetch('/deck/shuffle', { method: 'PATCH' })
        .then(() => getDeck()); // Refresh the deck display after shuffling
}
