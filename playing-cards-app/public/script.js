document.addEventListener('DOMContentLoaded', function() {
    refreshDeck(); // Call the function to fetch and display the deck
});

function getDeck() {
    fetch('/deck')
        .then(response => response.json())
        .then(data => {
            const deckContainer = document.getElementById('deckContainer');
            deckContainer.innerHTML = ''; // Starts the deckContainer empty, setting the Inner HTML as an empty string.
            data.forEach(card => { // For each card, this function gives an img element and an image name.
                const imgElement = document.createElement('img'); 
                const imageName = `${card.value.toLowerCase()}_of_${card.suit.toLowerCase()}.png`;
                imgElement.src = `images/${imageName}`; // With the new imageName, the function uses .src to get the original image.
                imgElement.alt = `${card.value} of ${card.suit}`; // Alternative would be the text of the card.
                imgElement.classList.add('card'); // Adds to list of cards.
                deckContainer.appendChild(imgElement); // Appends the img element, making it appear in the content.
            });
        });
}

document.getElementById('addCardForm').addEventListener('submit', function(e) { // Event listener attached to adding card form.
    e.preventDefault(); // Prevents traditional submitting method.
  
    const formData = new FormData(e.target); 


    const card = Object.fromEntries(formData); // Converts data from the form into a JS object.
    
    fetch('/deck', { 
      method: 'POST', // `POST` - Sending data to the server.
      headers: {
        'Content-Type': 'application/json', // Content type: JSON.
      },
      body: JSON.stringify(card),
    })
    // Handling the response:

    .then(response => { // This line processes the promise returned by `fetch`.
      if (response.ok) {
        return response.text();
      }
      throw new Error('Failed to add card'); 
    })
    // Post-response actions.
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
      if (!response.ok) { 
        throw new Error("Failed to delete card: Card doesn't exist in deck."); 
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
  

  function refreshDeck() { // Function to update/refresh the Deck
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
        })
        .catch(error => console.error('Error refreshing deck:', error));
}
  //GET
function getRandomCard() { 
    fetch('/deck/random')
        .then(response => response.json())
        .then(card => {
            const deckContainer = document.getElementById('deckContainer'); 
            deckContainer.innerHTML = ''; 

            const imgElement = document.createElement('img'); 
            const imageName = `${card.value.toLowerCase()}_of_${card.suit.toLowerCase()}.png`; 
            imgElement.src = `images/${imageName}`; 
            imgElement.alt = `${card.value} of ${card.suit}`; 
            imgElement.classList.add('card'); 

            deckContainer.appendChild(imgElement); 
        });
}
//PATCH
function shuffleDeck() {
    fetch('/deck/shuffle', { method: 'PATCH' })
        .then(() => getDeck()); 
}
