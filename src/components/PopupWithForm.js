import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ formSubmitHandler }, popupSelector) {
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
  }

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll('.popup__input');
  
    this._formValues = {};
  
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
  
    return this._formValues;
  }

  close() {
    const button = this._popup.querySelector('.popup__button'); 
    Array.from(this._popup.querySelectorAll('.popup__input')).forEach(item => { 
      item.classList.remove('popup__input_type_error'); 
    }); 
    Array.from(this._popup.querySelectorAll('.popup__error')).forEach(item => { 
      item.classList.remove('popup__error_active'); 
      item.textContent = ''; 
    }); 
    button.removeAttribute('disabled'); 
    button.classList.remove('popup__button_disabled'); 
    if (this._popup.classList.contains('popup_add')) { 
      button.setAttribute('disabled', true); 
      button.classList.add('popup__button_disabled',); 
    }

    this._popup.classList.remove('popup_opened');
  }

  setEventListeners() {
    const closeButton = this._popup.querySelector('.popup__close-button');
    closeButton.addEventListener('click', () => {
      this.close();
    });

    this._popup.addEventListener('mousedown', (evt) => {
      this._handleOverlayClose(evt);
    });

    document.addEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });

    this._popup.querySelector('.popup__form').addEventListener('submit', () => {
      this._formSubmitHandler();
    });
  }
}