import {popupOpenClose, keyHandler, overlayHandler, imagePopup, picturePopup, captionPopup} from './utils.js';

export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);

    return cardElement;
  }

  _likeCard() {
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  }

  _zoomCard() {
    picturePopup.src = this._element.querySelector('.element__image').src;
    captionPopup.textContent = this._element.closest('.element').querySelector('.element__heading').textContent;
    popupOpenClose(imagePopup);
  }

  _removeCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._likeCard();
    });
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._zoomCard();
    });
    this._element.querySelector('.element__remove').addEventListener('click', () => {
      this._removeCard();
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;
    this._element.querySelector('.element__heading').textContent = this._name;

    this._setEventListeners();

    return this._element;
  }
}