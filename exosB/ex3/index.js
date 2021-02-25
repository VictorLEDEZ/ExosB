'use strict';

const MyMorpionXO = class MyMorpionXO {
  /**
   * @constructor
   * @param  {string} active
   */
  constructor(active) {
    this.active = active;
    this._size = 3;

    this.appEl = document.querySelector('#App');
    this.tickHandler = this._tickBox.bind(this);

    this.run();
  }

  /**
   * run
   */
  run() {
    // Private
    this._game = [];
    this.renderMorpion();
    this._start();
  }

  /**
   * starts the morpion by writing instructions, setting up the game array and adding the event listeners
   */
  _start() {
    this._tour = 0;
    this._writeInstructions(`${this.active} doit commencer`);
    this._eventListener();
    this._setGameArr();
  }

  /**
   * Creates the Morpion elements
   */
  renderMorpion() {
    this.boxesEl;

    this.instructionsEl = document.createElement('p');
    this.instructionsEl.className = 'instructions';

    this.buttonEl = document.createElement('button');
    this.buttonEl.textContent = 'Rejouer';

    this.tableEl = document.createElement('table');

    for (let i = 0; i < this._size; i++) {
      const trEl = document.createElement('tr');
      for (let j = 0; j < this._size; j++) {
        const tdEl = document.createElement('td');
        tdEl.className = `${i + 1}${j + 1}`;
        trEl.appendChild(tdEl);
      }
      this.tableEl.appendChild(trEl);
    }
    this.appEl.appendChild(this.instructionsEl);
    this.appEl.appendChild(this.tableEl);
    this.appEl.appendChild(this.buttonEl);
  }

  /**
   * To create the game array that will store game data
   */
  _setGameArr() {
    for (let i = 0; i < 3; i++) {
      this._game[i] = [];
      for (let j = 0; j < 3; j++) {
        this._game[i][j] = undefined;
      }
    }
  }

  /**
   * To plot the instructions
   *
   * @param  {string} message
   */
  _writeInstructions(message) {
    this.instructionsEl.textContent = message;
  }

  /**
   * changing the current player
   */
  _changePlayer() {
    this.active = this.active === 'X' ? 'O' : 'X';
  }

  /**
   * To add the or remove the event listeners to the Morpion boxes
   *
   * @param  {boolean} remove if remove is true it removes the event listeners
   */
  _eventListener(remove) {
    this.boxesEl = document.querySelectorAll('td');
    this.boxesEl.forEach((box) => {
      if (remove) {
        box.removeEventListener('click', this.tickHandler);
      } else {
        box.addEventListener('click', this.tickHandler);
      }
    });
    this.buttonEl.addEventListener('click', this._rematch.bind(this));
  }

  /**
   * Checks if the game is winning for the active player
   *
   * @returns {boolean} returns true if winning and false if not
   */
  _checkWin() {
    return this._game.some((arr, i, game) => {
      const checkEvery = (arr) => arr.every((box) => box === this.active);

      const row = checkEvery(arr);

      const col = checkEvery(game.flatMap((arr) => arr.slice(i, i + 1)));

      const diagTopLeft = checkEvery(
        game.flatMap((arr, j) => arr.slice(j, j + 1))
      );

      const diagBottomRight = checkEvery(
        game.flatMap((arr, j) => arr.slice(arr.length - 1 - j, arr.length - j))
      );

      if (row || col || diagTopLeft || diagBottomRight) return true;
    });
  }

  /**
   * Write the data on the ticked box and checks if it is winning via
   * _checkWin
   *
   * @param  {Event} e
   * @returns {object | void}
   */
  _tickBox(e) {
    const box = e.target;

    // Checks the target box is empty. If not returns an error
    if (!box.textContent === '') {
      return this._writeInstructions(
        `Joueur ${this.active} -> CLICKEZ SUR UNE CASE VIDE !`
      );
    }

    // Records coordinates and ticks the corresponding box
    let boxPos = [...box.className];
    this._game[+boxPos[0] - 1][+boxPos[1] - 1] = this.active;
    box.textContent = this.active;

    this._tour++;

    // Checks if it is winning for the active player
    if (this._checkWin() || this._tour === 9) {
      this._eventListener(true);
      return this._writeInstructions(
        !this._checkWin() ? `Partie null !` : `${this.active} a gagné !`
      );
    }

    // Change players
    this._changePlayer();
    this._writeInstructions(`Au tour de ${this.active}`);
  }

  /**
   * To rematch
   */
  _rematch() {
    this._changePlayer();
    // reset the Morpion
    this.tableEl.style.display = '';
    this.boxesEl.forEach((box) => (box.textContent = ''));
    this._start();
  }
};

const myMorpionXO = new MyMorpionXO('X');
