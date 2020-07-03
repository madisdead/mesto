export const initialCards = [
  {
      place: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      place: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      place: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      place: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      place: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      place: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
export const settings = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_active'
};
export const userData = {
  nameSelector: '.profile__name',
  jobSelector: '.profile__job'
}
export const nameInput = document.querySelector('.popup__input_name');
export const jobInput = document.querySelector('.popup__input_job');
export const placeInput = document.querySelector('.popup__input_place');
export const linkInput = document.querySelector('.popup__input_link');
export const open = document.querySelector('.profile__edit-button');
export const popupEditSelector = '.popup_edit';
export const popupAddSelector = '.popup_add';
export const popupZoomSelector = '.popup_zoom';
export const cardsSelector = '.elements';
export const cardSelector = '#card';
export const formAdd = document.querySelector(`.popup__form_add`);
export const formEdit = document.querySelector(`.popup__form_edit`);
export const addButton = document.querySelector('.profile__add-button');