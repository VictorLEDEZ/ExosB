'use strict';

const Phone = class Phone {
  /**
   * @constructor
   */
  constructor() {
    this.inputEl;
    this.smallEl;
    this.formEl;

    this.appEl = document.querySelector('#App');

    this.run();
  }

  /**
   * run
   */
  run() {
    this._renderPhoneForm();
    this._eventListener();
  }

  /**
   * Renders the phone form to the client
   */
  _renderPhoneForm() {
    const html = `
      <form action="" method="POST">
        <label for="phone">Entrer numéro de telephone</label>
        <input type="tel" id="phone" />
        <button type="submit">Verifier</button>
        <small></small>
      </form>
    `;

    this.appEl.insertAdjacentHTML('beforeend', html);

    this.inputEl = document.querySelector('input');
    this.smallEl = document.querySelector('small');
    this.formEl = document.querySelector('form');
  }

  /**
   * Adds the event listener to the form when submitting
   */
  _eventListener() {
    this.formEl.addEventListener('submit', (e) => {
      e.preventDefault();
      this.checkPhoneNumber(this.inputEl.value);
    });
  }

  /**
   * Takes a number as a param and checks if it is a phone number or not
   *
   * @param  {number} num
   * @returns {boolean} either the number is correct or not
   */
  checkPhoneNumber(num) {
    const phoneRegExp = new RegExp('([0]{1})([6-7+1]{1})[0-9]{8}', 'g');
    if (phoneRegExp.test(num)) {
      this.smallEl.textContent = 'true';
      return true;
    }
    this.smallEl.textContent = 'false';
    return false;
  }
};

const phone = new Phone();
