export const imagePopup = document.querySelector('.popup_zoom');
export const picturePopup = document.querySelector('.popup__image');
export const captionPopup = document.querySelector('.popup__caption');
export const placeInput = document.querySelector('.popup__input_place');
export const linkInput = document.querySelector('.popup__input_link');

export function popupOpenClose(popup, validator) {
  if (popup.classList.contains('popup_opened')){
    popup.removeEventListener('mousedown', overlayHandler);
    document.removeEventListener('keydown', keyHandler);
  } else {
    popup.addEventListener('mousedown', overlayHandler);
    document.addEventListener('keydown', keyHandler);
    if(!popup.classList.contains('popup_zoom')) {
      document.querySelector('.profile__add-button').blur();
      const inputList = Array.from(popup.querySelectorAll('.popup__input'));
      inputList.forEach(item => {
        validator.hideInputError(item);
        validator.toggleButtonState(item, inputList);
      });
    } 
  }
  popup.classList.toggle('popup_opened');
}

export function keyHandler(evt) {
  if (evt.key === 'Escape') {
    popupOpenClose(document.querySelector('.popup_opened'));
  }
}

export function overlayHandler(evt){
  if (evt.target.classList.contains('popup')){
    popupOpenClose(evt.target);
  }
}