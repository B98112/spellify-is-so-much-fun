fetchCard = async (e) => {
  // Getting the Scryfall data.
  const response = await fetch(`https://api.scryfall.com/cards/random`);
  const card = await response.json();

  // Updating the card with the image data.
  const imageEl = document.getElementById('card');
  const oraTextEl = document.getElementById('oracle');
  imageEl.src = card.image_uris.normal;
  oraTextEl.innerText = card.oracle_text;
}
