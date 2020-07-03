export default class Card {
  constructor({ data, handleCardClick }, selector) {
    this._place = data.place;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
    this._selector = selector;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._selector).content.querySelector('.element').cloneNode(true);

    return cardElement;
  }

  _likeCard() {
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  }

  _removeCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._likeCard();
    });
    this._element.querySelector('.element__image').addEventListener('click', (evt) => {
      this._handleCardClick(evt);
    });
    this._element.querySelector('.element__remove').addEventListener('click', () => {
      this._removeCard();
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._place;
    this._element.querySelector('.element__heading').textContent = this._place;

    this._setEventListeners();

    return this._element;
  }
}