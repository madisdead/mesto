import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  } 

  open(image, name) {
    this._popup.querySelector('.popup__image').src = image;
    this._popup.querySelector('.popup__image').alt = name
    this._popup.querySelector('.popup__caption').textContent = name;

    this._popup.classList.add('popup_opened');
  }
}