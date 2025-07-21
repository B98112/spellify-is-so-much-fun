
fetchCard = async (e) => {
  // Getting the Scryfall data.
  const response = await fetch(`https://api.scryfall.com/cards/random`);
  const card = await response.json();

  // Updating the card with the image data.
  //const imageEl = document.getElementById('card');
  //const oraTextEl = document.getElementById('oracle');
  //const nameEl = document.getElementById('cardName');
  //const typeEl = document.getElementById('typeLine');
  //const manaEl = document.getElementById('mana');
  const words = card.name + card.mana_cost + card.type_line + card.oracle_text;
  //imageEl.src = card.image_uris.normal;
  //oraTextEl.innerText = card.oracle_text;
  //nameEl.innerText = card.name;
  //typeEl.innerText = card.type_line;
  //manaEl.innerText = card.mana_cost;
}
const secretWord = words.toUpperCase(); // Can be replaced with any word

const wordDiv = document.getElementById('word');
const wrongLetters = document.getElementById('wrongLetters');
const input = document.getElementById('guessInput');

let revealed = Array(secretWord.length).fill('');
let guessed = [];
let wrong = [];

function drawWord() {
  wordDiv.innerHTML = revealed
    .map(letter => `<span class="letter">${letter || '&nbsp;'}</span>`)
    .join('');
}

function makeGuess() {
  const guess = input.value.toUpperCase();
  input.value = '';
  if (!guess.match(/[A-Z]/) || guess.length !== 1 || guessed.includes(guess)) return;

  guessed.push(guess);

  const positions = [];
  [...secretWord].forEach((letter, i) => {
    if (letter === guess) positions.push(i);
  });

  if (positions.length > 0) {
    positions.forEach(i => revealed[i] = guess);
    drawWord();
    if (!revealed.includes('')) alert('🎉 You win!');
  } else {
    wrong.push(guess);
    wrongLetters.textContent = wrong.join(' ');
    if (wrong.length >= 6) alert('💀 Game Over!');
  }
}

drawWord();
