'use strict';

const DrawBar = class DrawBar {
  /**
   * @constructor
   * @param  {number} sum La somme totale du nombre
   * @param  {number} nbr La proportion du segment chargé de la barre
   */
  constructor(sum, nbr) {
    this.sum = sum;
    this.nbr = nbr;

    this.appEl = document.querySelector('#App');

    this.run();
  }

  /**
   * run
   */
  run() {
    this._renderBar();
    this._load();
  }

  /**
   * Adds the html of the bar in the app
   */
  _renderBar() {
    const html = `
        <div id="drawBar">
          <div id="sum"></div>
          <div id="nbr"></div>
        </div>
    `;

    this.appEl.insertAdjacentHTML('beforeend', html);
    this.nbrEl = document.getElementById('nbr');
  }

  /**
   * Loads the bar to the page
   */
  _load() {
    this._percentage = ((this.nbr * 100) / this.sum).toFixed(1);
    nbr.style.width = this._percentage + '%';
    nbr.innerHTML = this._percentage + ' %';
  }
};

const drawBar = new DrawBar(300, 200);
