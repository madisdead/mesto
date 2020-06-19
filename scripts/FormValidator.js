export default class FormValidator {
  constructor(settings, formSelector) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._form = formSelector;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-input-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }
  
  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-input-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity(inputElement, obj) {
    if (!inputElement.validity.valid) {
      obj._showInputError(inputElement, inputElement.validationMessage);
    } else {
      obj._hideInputError(inputElement);
    }
  }

  _hasInvalidInput(inputList, inputElement){
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(obj, inputElement, inputList) {
    const buttonElement = this._form.querySelector(this._submitButtonSelector);
    if (obj._hasInvalidInput(inputList, inputElement)) {
      buttonElement.setAttribute('disabled', true);
      buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      buttonElement.removeAttribute('disabled');
      buttonElement.classList.remove(this._inactiveButtonClass);
    }
  }

  _setEventListeners(obj) {
    const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function() {
        obj._checkInputValidity(inputElement, obj);
        obj._toggleButtonState(obj, inputElement, inputList);
      });
    });
  }

  enableValidation() {
    const obj = this;
    this._form.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    this._setEventListeners(obj);
  }
}