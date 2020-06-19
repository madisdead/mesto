const formElement = document.querySelector('.popup__form_edit');
const addElement = document.querySelector('.popup__form_add');
const nameInput = document.querySelector('.popup__input_name');
const jobInput = document.querySelector('.popup__input_job');
const placeInput = document.querySelector('.popup__input_place');
const linkInput = document.querySelector('.popup__input_link');
const name = document.querySelector('.profile__name');
const job = document.querySelector('.profile__job');
const open = document.querySelector('.profile__edit-button');
const closeEdit = document.querySelector('.popup__close-button_edit');
const closeAdd = document.querySelector('.popup__close-button_add');
const closeZoom = document.querySelector('.popup__close-button_zoom');
const addButton = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const popups = Array.from(document.querySelectorAll('.popup'));
export const imagePopup = document.querySelector('.popup_zoom');
export const picturePopup = document.querySelector('.popup__image');
export const captionPopup = document.querySelector('.popup__caption');
const cards = document.querySelector('.elements');
const cardSelector = '#card';
const formList = Array.from(document.querySelectorAll(`.popup__form`));

import FormValidator from './FormValidator.js';
import Card from './Card.js';
import {initialCards, settings} from './data.js';

formList.forEach((item) => {
  const validator = new FormValidator(settings, item);
  validator.enableValidation();
});

initialCards.forEach((item) => {
  const card = new Card(item, cardSelector);
  const cardElement = card.generateCard();

  cards.prepend(cardElement);
});

export function popupOpenClose(popup) {
  if (popup.classList.contains('popup_opened')){
    popup.removeEventListener('click', overlayHandler);
    document.removeEventListener('keydown', keyHandler);
  }
  popup.classList.toggle('popup_opened');
  popup.addEventListener('click', overlayHandler);
  document.addEventListener('keydown', keyHandler);

}

function formSubmitHandler (evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    popupOpenClose(popupEdit);
}

function addCardByUser (evt) {
  evt.preventDefault();
  const userObj = {
    name: placeInput.value,
    link: linkInput.value
  };
  const card = new Card(userObj, cardSelector);
  const cardElement = card.generateCard();

  cards.prepend(cardElement);
  popupOpenClose(popupAdd);
}

function addPopupOpen() {
  placeInput.value = '';
  linkInput.value = '';
  popupOpenClose(popupAdd);
}

function editPopupOpen() {
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
  popupOpenClose(popupEdit);
}

export function keyHandler(evt) {
  if (evt.key === 'Escape') {
    popups.forEach(item => {
      item.removeEventListener('keydown', keyHandler);
      item.classList.remove('popup_opened');
    });
  }
}

export function overlayHandler(evt){
  if (evt.target !== document.querySelector('.popup__container')){
    evt.target.removeEventListener('click', overlayHandler);
    evt.target.classList.remove('popup_opened');
  }
}

formElement.addEventListener('submit', formSubmitHandler);
addElement.addEventListener('submit', addCardByUser);
addButton.addEventListener('click', addPopupOpen);
open.addEventListener('click', editPopupOpen);
closeEdit.addEventListener('click', () => popupOpenClose(popupEdit));
closeAdd.addEventListener('click', () => popupOpenClose(popupAdd));
closeZoom.addEventListener('click', () => popupOpenClose(imagePopup));