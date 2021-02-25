'use strict';

const Form = class From {
  /**
   * @constructor
   */
  constructor() {
    this._form;
    this._userName;
    this._userSurname;
    this._userMail;
    this._userPassword;

    this.appEl = document.querySelector('#App');

    this.run();
  }

  /**
   * run
   */
  run() {
    this._renderForm();
    this._eventListeners();
  }

  /**
   * Adds the html of the form in the page
   */
  _renderForm() {
    const html = `
        <form action="" method="POST" id="form">
          <label for="userName">Nom</label>
          <input type="text" id="userName" />
          <small></small>
          <br />

          <label for="userSurname">Prenom</label>
          <input type="text" id="userSurname" />
          <small></small>
          <br />

          <label for="userMail">Email</label>
          <input type="email" id="userMail" />
          <small></small>
          <br />

          <label for="userPassword">Mot de passe</label>
          <input type="password" id="userPassword" />
          <small></small>
          <br />

          <button type="submit">Valider</button>
        </form>
    `;

    this.appEl.insertAdjacentHTML('beforeend', html);

    this._form = document.getElementById('form');
    this._userName = document.getElementById('userName');
    this._userSurname = document.getElementById('userSurname');
    this._userMail = document.getElementById('userMail');
    this._userPassword = document.getElementById('userPassword');
  }

  /**
   * Adds the event listener when submitting the form
   */
  _eventListeners() {
    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
      this._checkInputs();
    });
  }

  /**
   * checks each input of the form using RegExp
   */
  _checkInputs() {
    ///////////////////////////////////////////////////////////////////
    // NOM ////////////////////////////////////////////////////////////
    const nameRegExp = new RegExp('^([A-Za-z0-9]){4,20}$', 'gm');

    const userNameValue = this._userName.value.trim();

    if (nameRegExp.test(userNameValue)) {
      this._setStatus(this._userName);
    } else {
      this._setStatus(this._userName, 'Veuillez renseigner un nom valide!');
    }

    ///////////////////////////////////////////////////////////////////
    // PRENOM /////////////////////////////////////////////////////////
    const surnameRegExp = new RegExp('^([A-Za-z0-9]){4,20}$', 'gm');

    const userSurnameValue = this._userSurname.value.trim();

    if (surnameRegExp.test(userSurnameValue)) {
      this._setStatus(this._userSurname);
    } else {
      this._setStatus(
        this._userSurname,
        'Veuillez renseigner un prenom valide!'
      );
    }

    ///////////////////////////////////////////////////////////////////
    // EMAIL //////////////////////////////////////////////////////////
    const mailRegExp = new RegExp(
      '^([A-Z|a-z|0-9](.|_){0,1})+[A-Z|a-z|0-9]@([A-Z|a-z|0-9])+((.){0,1}[A-Z|a-z|0-9]){2}.[a-z]{2,3}$',
      'gm'
    );

    const userMailValue = this._userMail.value.trim();

    if (mailRegExp.test(userMailValue)) {
      this._setStatus(this._userMail);
    } else {
      this._setStatus(this._userMail, 'Veuillez renseigner un mail valide!');
    }

    ///////////////////////////////////////////////////////////////////
    // PASSWORD ///////////////////////////////////////////////////////
    // - at least 8 characters
    // - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number
    // - Can contain special characters
    // /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
    const passwordRegExp = new RegExp(
      '^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$',
      'gm'
    );

    const userPasswordValue = this._userPassword.value.trim();

    if (passwordRegExp.test(userPasswordValue)) {
      this._setStatus(this._userPassword);
    } else {
      this._setStatus(
        this._userPassword,
        'Veuillez entrer un Mot de Passe valide!'
      );
    }
  }

  /**
   * Plot to the client if there is an error or not on each fields of the form
   *
   * @param  {Element} input element select
   * @param  {string} errorMessage error message to be plot
   */
  _setStatus(input, errorMessage) {
    const small = input.nextElementSibling;
    if (!errorMessage) {
      small.classList.remove('danger');
      small.classList.add('success');
      return (small.innerHTML = 'Champ Valide');
    }
    small.innerHTML = errorMessage.toUpperCase();
    small.classList.remove('success');
    small.classList.add('danger');
  }
};

const form = new Form();
