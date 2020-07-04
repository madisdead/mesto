import './index.css';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import {initialCards, settings, userData, imagePopupSelectors} from '../utils/constants.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const nameInput = document.querySelector('.popup__input_name');
const jobInput = document.querySelector('.popup__input_job');
const placeInput = document.querySelector('.popup__input_place');
const linkInput = document.querySelector('.popup__input_link');
const open = document.querySelector('.profile__edit-button');
const popupEditSelector = '.popup_edit';
const popupAddSelector = '.popup_add';
const popupZoomSelector = '.popup_zoom';
const cardsSelector = '.elements';
const cardSelector = '#card';
const formAdd = document.querySelector(`.popup__form_add`);
const formEdit = document.querySelector(`.popup__form_edit`);
const addButton = document.querySelector('.profile__add-button');

const userNew = new UserInfo(userData);
const validatorEdit = new FormValidator(settings, formEdit);
const validatorAdd = new FormValidator(settings, formAdd);
const zoomPopup = new PopupWithImage(popupZoomSelector, imagePopupSelectors);
const editPopup = new PopupWithForm({
  formSubmitHandler: () => {
    userNew.setUserInfo(editPopup._getInputValues())
    editPopup.close();
  }},
  popupEditSelector,
  validatorEdit
);

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card({
      data: item,
      handleCardClick: (evt) => {
        zoomPopup.open(evt.target.src, evt.target.alt);
        zoomPopup.setEventListeners();
      }},
      cardSelector);
    const cardElement = card.generateCard();
    
    cardList.addItem(cardElement);
  }},
  cardsSelector
);

const addPopup = new PopupWithForm({
  formSubmitHandler: () => {
    const addObj = addPopup._getInputValues();
    const card = new Card({
      data: addObj,
      handleCardClick: (evt) => {
        zoomPopup.open(evt.target.src, evt.target.alt);
        zoomPopup.setEventListeners();
      }},
      cardSelector);
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
    addPopup.close();
  }},
  popupAddSelector,
  validatorAdd
);

cardList.renderItems();
validatorEdit.enableValidation();
validatorAdd.enableValidation();
addButton.addEventListener('click', () => {
  addPopup.setEventListeners();
  placeInput.value = "";
  linkInput.value = "";
  validatorAdd.refreshFormInputs();
  addPopup.open();
});
open.addEventListener('click', () => {
  editPopup.setEventListeners();
  const userValue =  userNew.getUserInfo();
  nameInput.value = userValue.name; 
  jobInput.value = userValue.job;
  validatorEdit.refreshFormInputs();
  editPopup.open();
});