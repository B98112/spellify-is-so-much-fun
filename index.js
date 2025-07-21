fetchCard = async (e) => {
  // Getting the Scryfall data.
  const response = await fetch(`https://api.scryfall.com/cards/random`);
  const card = await response.json();

  // Updating the card with the image data.
  const imageEl = document.getElementById('card');
  const oraTextEl = document.getElementById('oracle');
  const nameEl = document.getElementById('cardName');
  const typeEl = document.getElementById('typeLine');
  imageEl.src = card.image_uris.normal;
  oraTextEl.innerText = card.oracle_text;
  nameEl.innerText = card.name;
  typeEl.innerText = card.type_line;
}
