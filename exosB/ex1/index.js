'use strict';

const GridColorGenerator = class GridColorGenerator {
  /**
   * @constructor
   * @param  {number} x
   * @param  {number} y
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.appEl = document.querySelector('#App');

    this.run();
  }

  /**
   * run
   */
  run() {
    this.renderGrid();
  }

  /**
   * render grid
   */
  renderGrid() {
    const tableEl = document.createElement('table');

    for (let i = 0; i < this.y; i++) {
      const trEl = document.createElement('tr');

      for (let j = 0; j < this.x; j++) {
        const tdEl = document.createElement('td');

        setInterval(() => {
          const r = this.randomInt(0, 255);
          const g = this.randomInt(0, 255);
          const b = this.randomInt(0, 255);

          tdEl.style.background = `rgb(${r},${g},${b})`;
        }, this.randomInt(1000, 2000));

        tdEl.style.height = '10px';
        tdEl.style.width = '10px';

        trEl.appendChild(tdEl);
      }

      tableEl.appendChild(trEl);
    }

    this.appEl.appendChild(tableEl);
  }

  /**
   * random int
   * @param {number} min
   * @param {numer} max
   * @returns {number} int
   */
  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
};

const gridColorGenerator = new GridColorGenerator(10, 10);
