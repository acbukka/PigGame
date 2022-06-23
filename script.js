'use strict'

const player = document.querySelectorAll('.block')
// Select element
const score = document.querySelectorAll('.score');
const diceEl = document.querySelector('.dice');
const newGameEl = document.querySelector('.new-game')
const congrats = document.querySelector('.congrats')
// select active btns
const rollDiceEl = document.querySelector('.roll-dice');
const holdEl = document.querySelector('.hold');
// select current score elements
const currentEl = document.querySelectorAll('.current-score')

let activePlayer = 0;

class pigGame {

  getScore(e) {
    const element = e.target.id
    if (element === 'roll') {
      functionality(activePlayer, 'roll');
    } else if (element === 'hold') {
      functionality(activePlayer, 'hold');
    }
  }

  newGame() {
    functionality(activePlayer, 'newGame')
  }

}

// declare class
const PigGame = new pigGame;

const functionality = function (active, action) {
  // select enter random number
  let randomNum = Math.floor(Math.random() * 6) + 1;
  let currentScore = currentEl[active];
  if (action === 'roll') {
    diceEl.classList.add('active');
    diceEl.src = './assets/dice-0.png';
    setTimeout(() => {
      diceEl.classList.remove('active');
      diceEl.src = `./assets/dice-${randomNum}.png`;
      if (randomNum === 1) {
        currentScore.innerHTML = 0;
        player[activePlayer].classList.remove('player--active');
        activePlayer += 1;
        activePlayer > 1 ? activePlayer = 0 : activePlayer = activePlayer;
        player[activePlayer].classList.add('player--active');
      } else {
        currentScore.innerHTML = +currentScore.innerHTML + randomNum;
      }
    }, 500)
  } else if (action === 'hold') {
    score[activePlayer].innerHTML = +score[activePlayer].innerHTML + +currentScore.innerHTML;
    currentScore.innerHTML = 0;
    if (+score[activePlayer].innerHTML >= 100) {
      congrats.innerHTML = `Player ${activePlayer + 1} win!`;
      congrats.style.transform = 'translate(-50%, -50%)';
      rollDiceEl.removeEventListener('click', PigGame.getScore);
      holdEl.removeEventListener('click', PigGame.getScore);
    }
    player[activePlayer].classList.remove('player--active');
    activePlayer += 1;
    activePlayer > 1 ? activePlayer = 0 : activePlayer = activePlayer;
    player[activePlayer].classList.add('player--active');
  } else if (action === 'newGame') {
    score.forEach((item) => item.innerHTML = 0);
    currentEl.forEach((item) => item.innerHTML = 0);
    activePlayer = 0;
    player[0].classList.add('player--active');
    player[1].classList.remove('player--active');
    congrats.style.transform = 'translate(-50%, -250%)'
    rollDiceEl.addEventListener('click', PigGame.getScore);
    holdEl.addEventListener('click', PigGame.getScore);
  }
}

rollDiceEl.addEventListener('click', PigGame.getScore);
holdEl.addEventListener('click', PigGame.getScore);
newGameEl.addEventListener('click', PigGame.newGame);
