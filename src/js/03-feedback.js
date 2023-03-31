import throttle from 'lodash.throttle';

// =========================1спосіб=========================
// const formEl = document.querySelector('.feedback-form');
// // console.dir(formEl);

// formEl.addEventListener('input', throttle(onTypingMesssage, 500));
// formEl.addEventListener('submit', onClearAllSubmit);

// const LOCALSTORAGE_KEY = 'videoplayer-current-time';

// // Під час завантаження сторінки перевіряємо стан сховища, і якщо там є збережені
// // дані, заповнюємо ними поля форми.В іншому випадку поля повинні бути порожніми.
// const infoFromLS = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));

// function fillInfoOnField() {
//   if (infoFromLS === null) {
//     return;
//   }
//   for (const key in infoFromLS) {
//     formEl.elements[key].value = infoFromLS[key];
//   }
// }
// fillInfoOnField();

// // Записуємо у локальне сховище об'єкт з полями email і
// // message, у яких зберігай поточні значення полів форми
// const formInfo = {};

// function onTypingMesssage(evt) {
//   const fieldValue = evt.target.value;
//   const fieldName = evt.target.name;

//   formInfo[fieldName] = fieldValue;
//   //   console.log(formInfo);
//   localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formInfo));
// }

// // Під час сабміту форми очищуємо сховище і поля форми, а також виводимо
// //  у консоль об'єкт з полями email, message та їхніми поточними значеннями
// function onClearAllSubmit(evt) {
//   evt.preventDefault();
//   console.log(infoFromLS);

//   formEl.reset();
//   localStorage.removeItem(LOCALSTORAGE_KEY);
// }

// =========================2спосіб=========================
const form = document.querySelector('.feedback-form');
const email = document.querySelector('input[name="email"]');
const message = document.querySelector('textarea[name="message"]');

form.addEventListener('input', throttle(onTextareaInput, 500));
form.addEventListener('submit', onFormSubmit);

const LOCALSTORAGE_KEY = 'feedback-form-state';

// 1. Відстежую на формі подію input, і щоразу записуй у локальне сховище об'єкт
// з полями email і message, у яких зберігаю поточні значення полів форми.
// Ключ для сховища рядок "feedback-form-state"

function onTextareaInput(event) {
  const textObject = { email: email.value, message: message.value };
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(textObject));
  //   console.log(event);
  //   console.log(textObject);
}
// 2. Під час завантаження сторінки перевіряю стан сховища, і якщо там є збережені дані,
//     заповнюю ними поля форми.В іншому випадку поля повинні бути порожніми.
savedTextArea();

function savedTextArea(event) {
  const savedText = localStorage.getItem(LOCALSTORAGE_KEY);

  if (savedText) {
    // console.log(savedText);
    email.value = JSON.parse(savedText).email;
    message.value = JSON.parse(savedText).message;
  }
}
// 3. Під час сабміту форми очищую сховище і поля форми, а також вивожу у консоль
// об'єкт з полями email, message та їхніми поточними значеннями.

function onFormSubmit(event) {
  event.preventDefault();
  console.log({
    email: email.value,
    message: message.value,
  });
  event.target.reset();
  localStorage.removeItem(LOCALSTORAGE_KEY);
}
