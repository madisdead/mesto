export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClose = this._handleOverlayClose.bind(this);
    this.close = this.close.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
  }

  close() {
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.removeEventListener('mousedown', this._handleOverlayClose);
    this._closeButton.removeEventListener('click', this.close);
    this._popup.classList.remove('popup_opened');
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleOverlayClose(evt) {
    if (evt.target.classList.contains('popup')){
      this.close();
    }
  }

  setEventListeners() {
    this._closeButton = this._popup.querySelector('.popup__close-button');
    this._closeButton.addEventListener('click', this.close);

    this._popup.addEventListener('mousedown', this._handleOverlayClose);

    document.addEventListener('keydown', this._handleEscClose);
  }
}