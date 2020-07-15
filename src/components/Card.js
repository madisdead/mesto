export default class Card {
  constructor({ data, handleCardClick, handleLikeClick }, selector) {
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;

    this._selector = selector;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._selector).content.querySelector('.element').cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._handleLikeClick();
    });
    this._element.querySelector('.element__image').addEventListener('click', (evt) => {
      this._handleCardClick(evt);
    });
    
  }

  generateCard(numberOflikes) {
    this._element = this._getTemplate();
    this._likeElement = this._element.querySelector('.element__like-counter');

    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;
    this._element.querySelector('.element__heading').textContent = this._name;
    this._likeElement.textContent = numberOflikes;

    this._setEventListeners();

    return this._element;
  }
}