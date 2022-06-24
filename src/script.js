'use strict'

const player = document.querySelectorAll('.block')
// Select element
const score = document.querySelectorAll('.score');
const diceEl = document.querySelector('.dice');
const newGameEl = document.querySelector('.new-game')
const congrats = document.querySelector('.congrats')
const btns = document.querySelectorAll('.btn')
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

const init = function () {
  score.forEach((item) => item.innerHTML = 0);
  currentEl.forEach((item) => item.innerHTML = 0);
  activePlayer = 0;
  player[0].classList.add('player--active');
  player[1].classList.remove('player--active');
  congrats.style.transform = 'translate(-50%, -250%)'
  diceEl.src = './assets/dice-1.png';
  rollDiceEl.addEventListener('click', PigGame.getScore);
  holdEl.addEventListener('click', PigGame.getScore);
  newGameEl.addEventListener('click', PigGame.newGame);
}

const switchPlayer = function (current) {
  current.innerHTML = 0;
  player[activePlayer].classList.toggle('player--active');
  activePlayer = activePlayer === 0 ? 1 : 0;
  player[activePlayer].classList.toggle('player--active');
}

const functionality = function (active, action) {
  // select enter random number
  let randomNum = Math.floor(Math.random() * 6) + 1;
  let currentScore = currentEl[active];
  switch (action) {
    case 'roll':
      diceEl.classList.add('active');
      diceEl.src = './assets/dice-0.png';
      setTimeout(() => {
        diceEl.classList.remove('active');
        diceEl.src = `./assets/dice-${randomNum}.png`;
        if (randomNum === 1) {
          switchPlayer(currentScore);
        } else {
          currentScore.innerHTML = +currentScore.innerHTML + randomNum;
        }
      }, 500)
      break;
    case 'hold':
      score[activePlayer].innerHTML = +score[activePlayer].innerHTML + +currentScore.innerHTML;
      if (+score[activePlayer].innerHTML >= 100) {
        congrats.innerHTML = `Player ${activePlayer + 1} win!`;
        congrats.style.transform = 'translate(-50%, -50%)';
        rollDiceEl.removeEventListener('click', PigGame.getScore);
        holdEl.removeEventListener('click', PigGame.getScore);
      }
      switchPlayer(currentScore);
      break;
    case 'newGame':
      init();
      break;
  }
}

document.addEventListener('DOMContentLoaded', init)
