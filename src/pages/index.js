import './index.css';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import {initialCards, settings, nameInput, jobInput, open, userData,
  popupEditSelector, popupAddSelector, popupZoomSelector,
  cardsSelector, cardSelector, formAdd, formEdit, addButton, placeInput, linkInput} from '../utils/constants.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const userNew = new UserInfo(userData);
const validatorEdit = new FormValidator(settings, formEdit);
const validatorAdd = new FormValidator(settings, formAdd);
const zoomPopup = new PopupWithImage(popupZoomSelector);
const editPopup = new PopupWithForm({
  formSubmitHandler: () => {
    userNew.setUserInfo(editPopup._getInputValues())
    editPopup.close();
  }},
  popupEditSelector
);

const AddList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card({
      data: item,
      handleCardClick: (evt) => {
        zoomPopup.open(evt.target.src, evt.target.alt);
      }},
      cardSelector);
    const cardElement = card.generateCard();
    
    AddList.addItem(cardElement);
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
      }},
      cardSelector);
    const cardElement = card.generateCard();
    AddList.addItem(cardElement);
    addPopup.close();
  }},
  popupAddSelector
);

AddList.renderItems();
zoomPopup.setEventListeners();
addPopup.setEventListeners();
editPopup.setEventListeners();
validatorEdit.enableValidation();
validatorAdd.enableValidation();
addButton.addEventListener('click', () => {
  placeInput.value = "";
  linkInput.value = "";
  addPopup.open();
});
open.addEventListener('click', () => {
  const userValue =  userNew.getUserInfo();
  nameInput.value = userValue.name; 
  jobInput.value = userValue.job;
  editPopup.open();
});