import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, imagePopupSelectors) {
    super(popupSelector);
    this._image = this._popup.querySelector(imagePopupSelectors.image);
    this._caption = this._popup.querySelector(imagePopupSelectors.caption);
  } 

  open(image, name) {
    this._image.src = image;
    this._image.alt = name
    this._caption.textContent = name;

    super.open();
  }
}