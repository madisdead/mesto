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
const formAdd = document.querySelector(`.popup__form_add`);
const formEdit = document.querySelector(`.popup__form_edit`);
const validatorEdit = new FormValidator(settings, formEdit);
const validatorAdd = new FormValidator(settings, formAdd);

import FormValidator from './FormValidator.js';
import Card from './Card.js';
import {initialCards, settings} from './data.js';

function addCard(card, container) {
  container.prepend(card);
}

function refreshValidate(popup) {
  Array.from(popup.querySelectorAll(settings.inputSelector)).forEach(item => {
    item.classList.remove(settings.inputErrorClass);
  });
  Array.from(popup.querySelectorAll('.popup__error')).forEach(item => {
    item.textContent = '';
  });
  popup.querySelector(settings.submitButtonSelector).removeAttribute('disabled');
  popup.querySelector(settings.submitButtonSelector).classList.remove(settings.inactiveButtonClass);
  if (popup.classList.contains('popup_add')) {
    popup.querySelector(settings.submitButtonSelector).setAttribute('disabled', true);
    popup.querySelector(settings.submitButtonSelector).classList.add(settings.inactiveButtonClass);
  }
}

export function popupOpenClose(popup) {
  if (popup.classList.contains('popup_opened')){
    popup.removeEventListener('mousedown', overlayHandler);
    document.removeEventListener('keydown', keyHandler);
    addButton.addEventListener('click', addPopupOpen);
  } else {
    addButton.removeEventListener('click', addPopupOpen);
    popup.addEventListener('mousedown', overlayHandler);
    document.addEventListener('keydown', keyHandler);
    if (popup !== imagePopup) {
      refreshValidate(popup);
    }
  }
  popup.classList.toggle('popup_opened');
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

  addCard(cardElement, cards);
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
    popupOpenClose(document.querySelector('.popup_opened'));
  }
}

export function overlayHandler(evt){
  if (evt.target.classList.contains('popup')){
    popupOpenClose(evt.target);
  }
}

initialCards.forEach((item) => {
  const card = new Card(item, cardSelector);
  const cardElement = card.generateCard();

  addCard(cardElement, cards);
});

validatorEdit.enableValidation();
validatorAdd.enableValidation();
formEdit.addEventListener('submit', formSubmitHandler);
formAdd.addEventListener('submit', addCardByUser);
addButton.addEventListener('click', addPopupOpen);
open.addEventListener('click', editPopupOpen);
closeEdit.addEventListener('click', () => popupOpenClose(popupEdit));
closeAdd.addEventListener('click', () => popupOpenClose(popupAdd));
closeZoom.addEventListener('click', () => popupOpenClose(imagePopup));