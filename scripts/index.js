const nameInput = document.querySelector('.popup__input_name');
const jobInput = document.querySelector('.popup__input_job');
const name = document.querySelector('.profile__name');
const job = document.querySelector('.profile__job');
const open = document.querySelector('.profile__edit-button');
const closeEdit = document.querySelector('.popup__close-button_edit');
const closeAdd = document.querySelector('.popup__close-button_add');
const closeZoom = document.querySelector('.popup__close-button_zoom');
const popupEdit = document.querySelector('.popup_edit');
const cards = document.querySelector('.elements');
const cardSelector = '#card';
const formAdd = document.querySelector(`.popup__form_add`);
const formEdit = document.querySelector(`.popup__form_edit`);
const popupAdd = document.querySelector('.popup_add');
const addButton = document.querySelector('.profile__add-button');
const validatorEdit = new FormValidator(settings, formEdit);
const validatorAdd = new FormValidator(settings, formAdd);

import {popupOpenClose, keyHandler, overlayHandler, imagePopup, placeInput, linkInput} from './utils.js';
import FormValidator from './FormValidator.js';
import Card from './Card.js';
import {initialCards, settings} from './data.js';

function addCard(card, container) {
  container.prepend(card);
}

function addPopupOpen() {
  placeInput.value = '';
  linkInput.value = '';
  popupOpenClose(popupAdd, validatorAdd);
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    popupOpenClose(popupEdit, validatorEdit);
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
  popupOpenClose(popupAdd, validatorAdd);
}

function editPopupOpen() {
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
  popupOpenClose(popupEdit, validatorEdit);
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
closeEdit.addEventListener('click', () => popupOpenClose(popupEdit, validatorEdit));
closeAdd.addEventListener('click', () => popupOpenClose(popupAdd, validatorAdd));
closeZoom.addEventListener('click', () => popupOpenClose(imagePopup));