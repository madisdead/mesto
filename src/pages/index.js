import './index.css';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import CardByUser from '../components/CardByUser.js';
import {settings, userData, imagePopupSelectors, popupEditSelector, popupAddSelector,
  popupZoomSelector, cardsSelector, cardSelector, apiOptions, popupConfirmSelector, popupUpdateSelector, cardByUserSelector} from '../utils/constants.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

const nameInput = document.querySelector('.popup__input_name');
const jobInput = document.querySelector('.popup__input_job');
const placeInput = document.querySelector('.popup__input_place');
const linkInput = document.querySelector('.popup__input_link');
const avatarInput = document.querySelector('.popup__input_avatar');
const open = document.querySelector('.profile__edit-button');
const formAdd = document.querySelector(`.popup__form_add`);
const formEdit = document.querySelector(`.popup__form_edit`);
const addButton = document.querySelector('.profile__add-button');
const profileImage = document.querySelector('.profile__edit-overlay');

let targetElement;
let targetObjectIdToDelete;
let userId;

const newApi = new Api(apiOptions);
const userNew = new UserInfo(userData);
const validatorEdit = new FormValidator(settings, formEdit);
const validatorAdd = new FormValidator(settings, formAdd);
const zoomPopup = new PopupWithImage(popupZoomSelector, imagePopupSelectors);
const updatePopup = new PopupWithForm({
  formSubmitHandler: (evt) => {
    newApi.renderLoading(true, updatePopup._popup.querySelector('.popup__button'));
    evt.preventDefault();
    userNew.setAvatar(avatarInput.value);
    newApi.updateAvatar(avatarInput.value)
      .finally(() => {
        newApi.renderLoading(false, updatePopup._popup.querySelector('.popup__button'));
      });
    updatePopup.close();
  }},
  popupUpdateSelector
);
const confirmPopup = new PopupWithForm({
  formSubmitHandler: (evt) => {
    evt.preventDefault();
    newApi.deleteCard(targetObjectIdToDelete);
    targetElement.remove();
    confirmPopup.close();
  }},
  popupConfirmSelector
);
const editPopup = new PopupWithForm({
  formSubmitHandler: () => {
    const inputValues = editPopup._getInputValues();
    newApi.renderLoading(true, editPopup._popup.querySelector('.popup__button'));
    userNew.setUserInfo(inputValues);
    newApi.editUser(inputValues)
      .finally(() => {
        newApi.renderLoading(false, editPopup._popup.querySelector('.popup__button'));
      });
    editPopup.close();
  }},
  popupEditSelector
);
const addPopup = new PopupWithForm({
  formSubmitHandler: () => {
    newApi.renderLoading(true, addPopup._popup.querySelector('.popup__button'));
    const addObj = addPopup._getInputValues();
    const cards = new Section({
      items: [addObj],
      renderer: (item) => {
        const card = new CardByUser({
          data: item,
          handleCardClick: (evt) => {
            zoomPopup.open(evt.target.src, evt.target.alt);
            zoomPopup.setEventListeners();
          },
          handleTrashClick: (evt) => {
            targetElement = evt.target.closest('.element');
            confirmPopup.open();
            confirmPopup.setEventListeners()
          },
          handleLikeClick: () => {
            const likeElement = card._element.querySelector('.element__like');
            if(likeElement.classList.contains('element__like_active')){
              newApi.removeLike(targetObjectIdToDelete)
                .then((res)=>{
                  card._likeElement.textContent = res.likes.length;
                })
                .catch((err)=>{
                  console.log(err);
                });
              likeElement.classList.remove('element__like_active');
            } else {
              newApi.likeCard(targetObjectIdToDelete)
                .then((res)=>{
                  card._likeElement.textContent = res.likes.length;
                })
                .catch((err)=>{
                  console.log(err);
                });
              likeElement.classList.add('element__like_active');
            }
          }},
          cardByUserSelector);
        const cardElement = card.generateCard(0);
        
        cards.addItemMyUser(cardElement)
      }},
      cardsSelector
    );
    cards.renderItems();
    newApi.createCard(addObj)
      .then(res=>{
        targetObjectIdToDelete = res._id;
      })
      .finally(()=>{
        newApi.renderLoading(false, addPopup._popup.querySelector('.popup__button'));
      });
    addPopup.close();
  }},
  popupAddSelector
);

newApi.getUser()
  .then((res)=>{
    userId = res._id;
    userNew.setUserInfo(res);
    userNew.setAvatar(res.avatar);
  });

newApi.getInitialCards()
  .then((res)=>{
    const cardList = new Section({
      items: res,
      renderer: (item) => {
        
        if(item.owner._id === userId) {
          const card = new CardByUser({
            data: item,
            handleCardClick: (evt) => {
              zoomPopup.open(evt.target.src, evt.target.alt);
              zoomPopup.setEventListeners();
            },
            handleTrashClick: (evt) => {
              targetElement = evt.target.closest('.element');
              targetObjectIdToDelete = item._id;
              confirmPopup.open();
              confirmPopup.setEventListeners();
            },
            handleLikeClick: () => {
              const likeElement = card._element.querySelector('.element__like');
              if(likeElement.classList.contains('element__like_active')){
                newApi.removeLike(item._id)
                  .then((res)=>{
                    card._likeElement.textContent = res.likes.length;
                  }).catch((err)=>{
                    console.log(err);
                  });
                likeElement.classList.remove('element__like_active');
              } else {
                newApi.likeCard(item._id)
                  .then((res)=>{
                    card._likeElement.textContent = res.likes.length;
                  }).catch((err)=>{
                    console.log(err);
                  });
                likeElement.classList.add('element__like_active');
              }
            }},
            cardByUserSelector);
            const cardElement = card.generateCard(item.likes.length);
            cardList.addItem(cardElement);
            if(item.likes.some(element=>element._id===userId)){
              card._element.querySelector('.element__like').classList.add('element__like_active');
            }
        } else {
          const card = new Card({
            data: item,
            handleCardClick: (evt) => {
              zoomPopup.open(evt.target.src, evt.target.alt);
              zoomPopup.setEventListeners();
            },
            handleLikeClick: () => {
              const likeElement = card._element.querySelector('.element__like');
              if(likeElement.classList.contains('element__like_active')){
                newApi.removeLike(item._id)
                  .then((res)=>{
                    card._likeElement.textContent = res.likes.length;
                  });
                likeElement.classList.remove('element__like_active');
              } else {
                newApi.likeCard(item._id)
                  .then((res)=>{
                    card._likeElement.textContent = res.likes.length;
                  });
                likeElement.classList.add('element__like_active');
              }
            }},
            cardSelector);
            const cardElement = card.generateCard(item.likes.length);
            cardList.addItem(cardElement);
            if(item.likes.some(element=>element._id===userId)){
              card._element.querySelector('.element__like').classList.add('element__like_active');
            }
        }     
      }},
      cardsSelector
    )
    cardList.renderItems();
  }).catch((err)=>{
    console.log(err);
  });
validatorEdit.enableValidation();
validatorAdd.enableValidation();
profileImage.addEventListener('click', () => {
  updatePopup.setEventListeners();
  avatarInput.value = "";
  updatePopup.open();
})
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
  jobInput.value = userValue.about;
  validatorEdit.refreshFormInputs();
  editPopup.open();
});