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
                // The function generates the imageName by card value + "_of" + card's suit + ".png".
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

    /* Uses FormData constructor to create a new 'FormData' object,
     gathering the form's input from e.target. (e - Event.) */

    const card = Object.fromEntries(formData); // Converts data from the form into a JS object.
    
    fetch('/deck', { /* Usage of `fetch` API here is used to send an asynchronous HTTP request to the server's `/deck' endpoint,
     creating a new card. */
      method: 'POST', // `POST` - Sending data to the server.
      headers: {
        'Content-Type': 'application/json', // Content type: JSON.
      },
      body: JSON.stringify(card), // Converting the object "card" into a JSON string, as the server expects to receive the data in such format.
    })
    // Handling the response:

    .then(response => { // This line processes the promise returned by `fetch`.
      if (response.ok) {
        return response.text(); // Completes action, by returning the response.
      }
      throw new Error('Failed to add card'); // Error message.
    })
    // Post-response actions.
    .then(() => {
      alert('Card added!'); // Alert Pop-up.
      refreshDeck() // Refreshes the deck, updating the content.
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });

  document.getElementById('deleteCardForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevents the form from submitting in the traditional way, allowing us to handle it with JavaScript.
  
    const formData = new FormData(e.target); // Creates a FormData object from the form that triggered the event. `e.target` refers to the form element here.
    const card = Object.fromEntries(formData); // Converts the FormData entries into a plain JavaScript object. Useful for JSON serialization.
  
    fetch('/deck', { // Initiates a fetch request to the server's `/deck` endpoint.
      method: 'DELETE', // Specifies the HTTP method DELETE, indicating the intention to remove a resource.
      headers: {
        'Content-Type': 'application/json', // Indicates that the request body format is JSON.
      },
      body: JSON.stringify(card), // Serializes the `card` object to a JSON string for transmission.
    })
    .then(response => { // Handles the Promise returned by `fetch`.
      if (!response.ok) { // Checks if the response status is not in the success range (200-299).
        throw new Error('Failed to delete card'); // Throws an error if the response was not successful.
      }
      return response.text(); // If successful, reads the response body as text (even if empty, to resolve the Promise chain).
    })
    .then(() => {
      alert('Card deleted!'); // Notifies the user that the card was successfully deleted.
      refreshDeck(); // Calls `refreshDeck` to update the UI with the current state of the deck.
    })
    .catch(error => {
      console.error('Error:', error); // Logs any errors that occurred during the fetch or in the Promise chain.
      alert(error); // Optionally, alert the user to the error.
    });
  });
  

  function refreshDeck() { // Function to update/refresh the Deck, used at the start, and after every action: GET, GET, POST, DELETE, PATCH.
    fetch('/deck') // Usage of `fetch` API
        .then(response => response.json())
        .then(data => {
            const deckContainer = document.getElementById('deckContainer'); // Container in which the cards will be displayed.
            deckContainer.innerHTML = ''; // Clear the existing deck

            data.forEach(card => { /* For each card, there will be an <img> element and
            an image name that will provide the right png to the right card. Using .src, the right png is picked and then added
            to the container of cards using .classList.add*('card'). .appendChild finalizes the action and adds the card to the container.
            */
                const imgElement = document.createElement('img'); // Creates img element for card.
                const imageName = `${card.value.toLowerCase()}_of_${card.suit.toLowerCase()}.png`; // Uses card value + suit and more strings to construct the right image file name.
                imgElement.src = `images/${imageName}`; // Sets source of image as the imageName, from the 'images' folder.
                imgElement.alt = `${card.value} of ${card.suit}`; // Alternative.
                imgElement.classList.add('card'); // Adds to list of cards.
                deckContainer.appendChild(imgElement); // Finalizes action.
            });
        })
        .catch(error => console.error('Error refreshing deck:', error));
}
  //GET
function getRandomCard() { 
  // Function is very similar to refreshDeck(), but instead of implementing the function for '.forEach' Card, it runs once.
    fetch('/deck/random')
        .then(response => response.json())
        .then(card => {
            const deckContainer = document.getElementById('deckContainer'); // Deck container.
            deckContainer.innerHTML = ''; // Clear the container

            const imgElement = document.createElement('img'); // Creates img Element for card.
            const imageName = `${card.value.toLowerCase()}_of_${card.suit.toLowerCase()}.png`; // Construct image name
            imgElement.src = `images/${imageName}`; // Sets source of image.
            imgElement.alt = `${card.value} of ${card.suit}`; // Alternative.
            imgElement.classList.add('card'); // Added to List of cards.

            deckContainer.appendChild(imgElement); // Finalized action.
        });
}
//PATCH
function shuffleDeck() {
    fetch('/deck/shuffle', { method: 'PATCH' })
        .then(() => getDeck()); // Refresh the deck display after shuffling
}
