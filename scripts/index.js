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
const imagePopup = document.querySelector('.popup_zoom');
const picturePopup = document.querySelector('.popup__image');
const captionPopup = document.querySelector('.popup__caption');
const cards = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card').content;

function popupOpenClose(popup) {
  if (popup.classList.contains('popup_opened')){
    popup.removeEventListener('click', overlayHandler);
    document.removeEventListener('keydown', keyHandler);
  }
  popup.classList.toggle('popup_opened');
  popup.addEventListener('click', overlayHandler);
  document.addEventListener('keydown', keyHandler);

}

function likeCard(evt) {
  evt.target.classList.toggle('element__like_active');
}

function zoomCard(evt) {
  picturePopup.src = evt.target.src;
  captionPopup.textContent = evt.target.closest('.element').querySelector('.element__heading').textContent;
  popupOpenClose(imagePopup);
}

function removeCard(evt) {
  const deleteItem = evt.target.closest('.element');
  deleteItem.querySelector('.element__like').removeEventListener('click', likeCard);
  deleteItem.querySelector('.element__image').removeEventListener('click', zoomCard);
  deleteItem.querySelector('.element__remove').removeEventListener('click', removeCard);
  deleteItem.remove();
}

function createCard(name, link) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.element__image');

  cardElement.querySelector('.element__heading').textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  cardElement.querySelector('.element__like').addEventListener('click', likeCard);
  cardImage.addEventListener('click', zoomCard);
  cardElement.querySelector('.element__remove').addEventListener('click', removeCard);
  
  return cardElement;
}

function addCard(card) {
  cards.prepend(card);
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    popupOpenClose(popupEdit);
}

function addCardByUser(evt){
  evt.preventDefault();
  addCard(createCard(placeInput.value, linkInput.value));
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

function keyHandler(evt) {
  if (evt.key === 'Escape') {
    popups.forEach(item => {
      item.removeEventListener('keydown', keyHandler);
      item.classList.remove('popup_opened');
    });
  }
}

function overlayHandler(evt){
  if (evt.target !== document.querySelector('.popup__container')){
    evt.target.removeEventListener('click', overlayHandler);
    evt.target.classList.remove('popup_opened');
  }
}

initialCards.forEach(item => addCard(createCard(item.name, item.link)));

formElement.addEventListener('submit', formSubmitHandler);
addElement.addEventListener('submit', addCardByUser);
addButton.addEventListener('click', addPopupOpen);
open.addEventListener('click', editPopupOpen);
closeEdit.addEventListener('click', () => popupOpenClose(popupEdit));
closeAdd.addEventListener('click', () => popupOpenClose(popupAdd));
closeZoom.addEventListener('click', () => popupOpenClose(imagePopup));