
export const settings = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_active'
};
export const userData = {
  nameSelector: '.profile__name',
  jobSelector: '.profile__job',
  avatarSelector: '.profile__avatar'
};
export const imagePopupSelectors = {
  image: '.popup__image',
  caption: '.popup__caption'
};
export const apiOptions = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-13',
  headers: {
    authorization: 'baa693a1-f1f3-4c97-a1d3-1a1eaaa401c5',
    'Content-Type': 'application/json'
  }
}
export const popupEditSelector = '.popup_edit';
export const popupAddSelector = '.popup_add';
export const popupZoomSelector = '.popup_zoom';
export const popupConfirmSelector = '.popup_confirm';
export const popupUpdateSelector = '.popup_update';
export const cardsSelector = '.elements';
export const cardSelector = '#card';
export const cardByUserSelector = '#cardByUser';