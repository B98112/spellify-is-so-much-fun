async function startGame() {
  const response = await fetch(`https://api.scryfall.com/cards/random`);
  const card = await response.json();

  const words = card.name + ' ' + card.mana_cost + ' ' + card.type_line + ' ' + card.oracle_text;
  const secretWord = words.toUpperCase();

  const wordDiv = document.getElementById('word');
  const wrongLetters = document.getElementById('wrongLetters');
  const input = document.getElementById('guessInput');

  let revealed = [...secretWord].map(c => (c === ' ' ? ' ' : ''));
  let guessed = [];
  let wrong = [];

  function drawWord() {
    wordDiv.innerHTML = revealed
      .map(letter =>
        letter === ' '
          ? `<span class="letter">&nbsp;</span>`
          : `<span class="letter">${letter || '&nbsp;'}</span>`
      )
      .join('');
  }

  window.makeGuess = function () {
    const guess = input.value.toUpperCase();
    input.value = '';
    if (!guess.match(/^[A-Z0-9{}\/:\-]$/) || guessed.includes(guess)) return;

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
  };

  drawWord();
}

startGame();