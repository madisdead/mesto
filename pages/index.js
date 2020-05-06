document.querySelector('.profile__edit-button').addEventListener('click', function() {
  document.querySelector('.popup').classList.toggle('popup_opened');
}, false);

document.querySelector('.popup__close-button').addEventListener('click', function() {
  document.querySelector('.popup').classList.remove('popup_opened');
}, false);

let formElement = document.querySelector('.popup__form');

function formSubmitHandler (evt) {
    evt.preventDefault();
    // Находим поля формы в DOM
    let nameInput = document.querySelectorAll('.popup__input')[0];
    let jobInput = document.querySelectorAll('.popup__input')[1];
    // Получите значение полей из свойства value
    let nameValue = nameInput.value;
    let jobValue = jobInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей
    let name = document.querySelector('.profile__name');
    let job = document.querySelector('.profile__job');
    // Вставьте новые значения с помощью textContent
    name.textContent = nameValue;
    job.textContent = jobValue;
    document.querySelector('.popup').classList.remove('popup_opened');
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);