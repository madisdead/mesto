import Card from './Card.js';

export default class CardByUser extends Card {
  constructor({ data, handleCardClick, handleTrashClick, handleLikeClick }, selector) {
    super({data, handleCardClick, handleLikeClick}, selector)
    this._handleTrashClick = handleTrashClick;
  }

  _setEventListeners() {
    super._setEventListeners();

    this._element.querySelector('.element__remove').addEventListener('click', (evt) => {
      this._handleTrashClick(evt);
    });
  }
}