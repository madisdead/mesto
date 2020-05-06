const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_name');
const jobInput = document.querySelector('.popup__input_job');
const name = document.querySelector('.profile__name');
const job = document.querySelector('.profile__job');
const open = document.querySelector('.profile__edit-button');
const close = document.querySelector('.popup__close-button');
const popup = document.querySelector('.popup');

function popupOpen() {
  nameInput.setAttribute('value',name.textContent);
  jobInput.setAttribute('value',job.textContent);
  popup.classList.toggle('popup_opened');
}

function popupClose() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    const nameValue = nameInput.value;
    const jobValue = jobInput.value;
    name.textContent = nameValue;
    job.textContent = jobValue;
    popupClose();
}

formElement.addEventListener('submit', formSubmitHandler);
open.addEventListener('click', popupOpen);
close.addEventListener('click', popupClose);