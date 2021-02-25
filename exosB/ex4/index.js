'use strict';

const Map = class Map {
  /**
   * @constructor
   * @param  {string} url
   */
  constructor(url) {
    this.url = url;

    this.appEl = document.querySelector('#App');
    this._countries;
    this._legendEl;
    this._mapEl;

    this._renderCountryBind = this._renderCountry.bind(this);

    this.run();
  }

  /**
   * run
   */
  run() {
    this._renderMapAndLegend();
    this._setLegend('clickez sur un pays !');
    this._renderWorldMap();
  }

  /**
   * Adds the map and the legend to the HTML
   */
  _renderMapAndLegend() {
    this._mapEl = document.createElement('div');
    this._mapEl.className = 'map';
    this.appEl.appendChild(this._mapEl);

    this._legendEl = document.createElement('p');
    this._legendEl.className = 'legend';
    this.appEl.appendChild(this._legendEl);
  }

  /**
   * loads the map
   */
  async _renderWorldMap() {
    const res = await fetch(this.url);
    const data = await res.text();

    this._mapEl.insertAdjacentHTML('beforeend', data);
    this._countries = document.getElementById('svg2').querySelectorAll('path');

    this._countries.forEach((country) => {
      country.addEventListener('click', this._renderCountryBind);
      country.addEventListener('mouseover', this._renderCountryBind);
      country.addEventListener('mouseleave', this._renderCountryBind);

      country.addEventListener(
        'mouseover',
        this._setLegend.bind(this, country.id)
      );
      country.addEventListener(
        'mouseleave',
        this._setLegend.bind(this, country.id)
      );
    });
  }

  /**
   * selects the country
   *
   * @param  {Event} e
   * @returns {any}
   */
  _renderCountry(e) {
    // this._setLegend(e.target.id);
    if (e.type === 'mouseover') return this._colorize(e.target, 'blue');

    if (e.type !== 'click') return this._colorize(e.target, 'black');

    this._setLegend(e.target.id);
    if (e.target.style.fill === 'red') {
      e.target.addEventListener('mouseover', this._renderCountryBind);
      e.target.addEventListener('mouseleave', this._renderCountryBind);
      return this._colorize(e.target, 'blue');
    }
    e.target.removeEventListener('mouseover', this._renderCountryBind);
    e.target.removeEventListener('mouseleave', this._renderCountryBind);
    return this._colorize(e.target, 'red');
  }

  /**
   * Colorize and element
   *
   * @param  {Element} country The element we want to colorize
   * @param  {string} color The color we want to apply to it
   */
  _colorize(country, color) {
    country.style.fill = color;
  }

  /**
   * Afficher le nom du pays survolé ou cliqué en bas de la carte comme une légende.
   *
   * @param  {string} countryId
   */
  _setLegend(countryId) {
    this._legendEl.textContent = `Pays : ${countryId.toUpperCase()}`;
  }
};

const map = new Map(
  'https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg'
);
