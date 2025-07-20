fetchCard = async (e) => {
  // Getting the Scryfall data.
  const response = await fetch(`https://api.scryfall.com/cards/random`);
  const card = await response.json();

  // Updating the card with the image data.
  const imageEl = document.getElementById('card');
  imageEl.src = card.image_uris.normal;
}
