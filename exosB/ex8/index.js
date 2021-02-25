'use strict';

const BatailleNavale = class BatailleNavale {
  /**
   * @constructor
   * @param  {Array.<number[]>} gameArr array of arrays indicating where the boats are
   */
  constructor(gameArr) {
    this._game = gameArr;

    this._boats = [
      { name: 'Torpilleur', id: 1, size: 2 },
      { name: 'Frégate', id: 2, size: 3 },
      { name: 'Contre-Torpilleurs', id: 3, size: 4 },
      { name: 'Croiseur', id: 4, size: 5 },
      { name: 'Porte-Avions', id: 5, size: 5 },
    ];

    this.appEl = document.querySelector('#App');
    this._checkTouchBind = this._checkTouch.bind(this);

    this.run();
  }

  /**
   * run
   */
  run() {
    this._renderGame();
    this._changeText(
      this._instructionsEl,
      '⛴ Clickez sur un case pour attaquer ! ⛴'
    );
    this._changeText(this._resultEl, 'Bateau coulés : ');
    this._placeBoats();
    this._addCoords();
  }

  /**
   * Adding the html to make the game
   */
  _renderGame() {
    const html = `
      <p class="instructions"></p>

      <table></table>

      <p class="result"></p>
    `;

    this.appEl.insertAdjacentHTML('beforeend', html);

    this._instructionsEl = document.querySelector('.instructions');
    this._resultEl = document.querySelector('.result');
    this._tableEl = document.querySelector('table');
  }

  /**
   * Changing or adding a text to an element depending on the add bool
   *
   * @param  {Element} target
   * @param  {string} message
   * @param  {boolean} add
   */
  _changeText(target, message, add) {
    if (add) {
      target.textContent += message;
      return;
    }
    target.textContent = message;
  }

  /**
   * returns the next char in the ASCII table
   *
   * @param  {string} char the input char
   * @returns {string} next char
   */
  _nextChar(char) {
    return String.fromCharCode(char.charCodeAt(0) + 1).toUpperCase();
  }

  /**
   * Placing the boats on the table grid by adding class names to them to identify where they are located
   */
  _placeBoats() {
    // To add the class names
    let col = 0;
    let row = '`'; // ` is before a in the ASCII Table

    // To set the text Content
    let colNum = 0;
    let rowNum = -1;

    this._game.forEach((arr) => {
      // creates and adds rows
      const tr = document.createElement('tr');
      this._tableEl.appendChild(tr);
      row = this._nextChar(row);
      col = 0;

      colNum = 0;
      rowNum++;

      arr.forEach(() => {
        // create and add columns
        col++;
        const td = document.createElement('td');
        td.id = `${
          this._game[rowNum][colNum] === 0 ? '' : this._game[rowNum][colNum]
        }`;
        tr.appendChild(td).className = `${row}.${col}`;

        colNum++;
      });
    });

    this._eventListener();
  }

  /**
   * Adding the event listeners to eache of the tds in the table
   */
  _eventListener() {
    const tds = document.querySelectorAll('td');
    tds.forEach((td) => td.addEventListener('click', this._checkTouchBind));
  }

  /**
   * Adding the x and y coordinates next to the table, (A-L) in y and, (1-12) in x
   */
  _addCoords() {
    let row = '`';
    const trs = document.querySelectorAll('tr');
    trs.forEach((tr) => {
      row = this._nextChar(row);
      const tdRow = document.createElement('td');
      tdRow.className = 'coords';
      tdRow.textContent = row;
      tr.appendChild(tdRow);
    });

    const tr = document.createElement('tr');
    this._tableEl.appendChild(tr);

    for (let i = 0; i < this._game.length; i++) {
      const tdCol = document.createElement('td');
      tdCol.className = 'coords';
      tdCol.textContent = i + 1;
      tr.appendChild(tdCol);
    }
  }

  /**
   * Checks if the clicked box is a boat or water
   *
   * @param  {Event} e
   * @returns {boolean} returns true if the boat is touched
   */
  _checkTouch(e) {
    const target = e.target;
    const boatId = target.id;
    const boat = this._boats[boatId - 1];

    target.removeEventListener('click', this._checkTouchBind);

    if (!boatId) {
      this._changeText(this._instructionsEl, `Raté !`);
      target.style.backgroundColor = 'blue';
      return false;
    }

    if (boat.dead) return;

    boat.size--;
    target.style.backgroundColor = 'red';

    if (boat.size) return this._changeText(this._instructionsEl, `Touché !`);

    boat.dead = true;

    this._changeText(this._resultEl, `${boat.name} / `, true);

    if (this._checkWin()) return;

    this._changeText(this._instructionsEl, `${boat.name} Coulé !`);
    return true;
  }

  /**
   * Checks if the player won the game
   *
   * @returns {boolean} true if the player won the game and flase if not
   */
  _checkWin() {
    if (!this._boats.every((boat) => boat.dead)) return false;

    this._changeText(this._instructionsEl, `Vous avez gagné !`);

    const tds = document.querySelectorAll('td');

    tds.forEach((td) => td.removeEventListener('click', this._checkTouchBind));
    return true;
  }
};

const testArr = [
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0],
  [0, 3, 3, 3, 3, 0, 0, 0, 0, 0, 4, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const batailleNavale = new BatailleNavale(testArr);
