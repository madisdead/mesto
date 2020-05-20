const formElement = document.querySelector('.popup__form_edit');
const addElement = document.querySelector('.popup__form_add');
const nameInput = document.querySelector('.popup__input_name');
const jobInput = document.querySelector('.popup__input_job');
const placeInput = document.querySelector('.popup__input_place');
const linkInput = document.querySelector('.popup__input_link');
const name = document.querySelector('.profile__name');
const job = document.querySelector('.profile__job');
const open = document.querySelector('.profile__edit-button');
const close = document.querySelectorAll('.popup__close-button');
const addButton = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const imagePopup = document.querySelector('.popup_zoom');
const cards = document.querySelector('.elements');
const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function addCard(name, link){
  const cardTemplate = document.querySelector('#card').content;
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.element__heading').textContent = name;
  cardElement.querySelector('.element__image').src = link;

  cardElement.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  });

  cardElement.querySelector('.element__remove').addEventListener('click', function(evt) {
    const deleteItem = evt.target.closest('.element');
    deleteItem.remove();
  });

  cardElement.querySelector('.element__image').addEventListener('click', function(evt) {
    imagePopup.querySelector('.popup__image').src = evt.target.src;
    imagePopup.querySelector('.popup__caption').textContent = evt.target.closest('.element').querySelector('.element__heading').textContent;
    popupOpen(imagePopup);
  });

  cards.prepend(cardElement);
}

function popupOpen(popup) {
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
  placeInput.value = '';
  linkInput.value = '';
  popup.classList.toggle('popup_opened');
}

function popupClose(popup) {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    popupClose(popupEdit);
}

function addCardByUser(evt){
  evt.preventDefault();
  addCard(placeInput.value, linkInput.value);
  popupClose(popupAdd);
}

initialCards.forEach(item => addCard(item.name, item.link));

formElement.addEventListener('submit', formSubmitHandler);
addElement.addEventListener('submit', addCardByUser);
addButton.addEventListener('click', function(){popupOpen(popupAdd)});
open.addEventListener('click', function(){popupOpen(popupEdit)});
close[0].addEventListener('click', function(){popupClose(popupEdit)});
close[1].addEventListener('click', function(){popupClose(popupAdd)});
close[2].addEventListener('click', function(){popupClose(imagePopup)});