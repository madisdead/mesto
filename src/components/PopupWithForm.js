import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ formSubmitHandler }, popupSelector) {
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
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
    this._popup.querySelector('.popup__form').removeEventListener('submit', this._formSubmitHandler);
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();

    this._popup.querySelector('.popup__form').addEventListener('submit', this._formSubmitHandler);
  }
}