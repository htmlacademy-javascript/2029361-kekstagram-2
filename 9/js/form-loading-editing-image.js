const fileInput = document.querySelector('.img-upload__input'); // Поле выбора файла
const imageLoadingWindow = document.querySelector('.img-upload__overlay'); // Окно редактирования
const closeButton = document.querySelector('.img-upload__cancel'); // Кнопка закрытия
const body = document.body; // Тело страницы для управления классом modal-open
const previewImage = document.querySelector('.img-upload__preview img'); // Главное превью
const effectPreviews = document.querySelectorAll('.effects__preview'); // Маленькие превью эффектов

const form = document.querySelector('.img-upload__form'); // Форма загрузки
const hashtagInput = document.querySelector('.text__hashtags'); // Поле хештегов
const commentInput = document.querySelector('.text__description'); // Поле комментария
// const submitButton = form.querySelector('.img-upload__submit'); // Кнопка отправки
const MAX_HASHTAGS = 5;
const MAX_SYMBOLS = 20;
const MAX_DESCRIPTION_LENGTH = 140;

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'pristine-error',
});

// Функция открытия окна редактирования
const openImageEditingWindow = () => {
  imageLoadingWindow.classList.remove('hidden'); // Показываем окно редактирования
  body.classList.add('modal-open'); // Блокируем прокрутку страницы

  document.addEventListener('keydown', onDocumentKeydown); // Добавляем обработчик Esc
};

// Функция закрытия окна редактирования
const closeImageEditingWindow = () => {
  imageLoadingWindow.classList.add('hidden'); // Скрываем окно
  body.classList.remove('modal-open'); // Разрешаем прокрутку страницы
  fileInput.value = ''; // Очищаем input, чтобы можно было снова выбрать тот же файл
  hashtagInput.value = ''; // Очищаем хештеги
  commentInput.value = ''; // Очищаем комментарий
  pristine.reset(); // Сбрасываем ошибки валидации

  document.removeEventListener('keydown', onDocumentKeydown); // Убираем обработчик Esc
};

// Функция закрытия по клавише Esc, кроме случаев фокуса в полях ввода
const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape' && !document.activeElement.matches('.text__hashtags, .text__description')) {
    evt.preventDefault();
    closeImageEditingWindow();
  }
};

// Обработчик выбора файла
fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0]; // Получаем загруженный файл
  if (!file) {
    return;
  } // Если файл не выбран, ничего не делаем

  const fileURL = URL.createObjectURL(file); // Создаём ссылку на файл

  previewImage.src = fileURL; // Подставляем изображение в главное превью
  effectPreviews.forEach((preview) => (preview.style.backgroundImage = `url(${fileURL})`)); // Обновляем мини-превью

  openImageEditingWindow(); // Открываем окно редактирования
});

// Обработчик закрытия окна при нажатии на кнопку
closeButton.addEventListener('click', closeImageEditingWindow);

// ======== Валидация хештегов ========
const hashtagRules = [
  {
    check: (inputArray) => inputArray.every((item) => item !== '#'),
    error: 'Хэштег не может состоять только из одной решётки',
  },
  {
    check: (inputArray) => inputArray.every((item) => !item.slice(1).includes('#')),
    error: 'Хэштеги разделяются пробелами',
  },
  {
    check: (inputArray) => inputArray.every((item) => item[0] === '#'),
    error: 'Хэштег должен начинаться с символа "#"',
  },
  {
    check: (inputArray) => inputArray.every((item, index, array) => array.indexOf(item) === index),
    error: 'Хэштеги не должны повторяться',
  },
  {
    check: (inputArray) => inputArray.every((item) => item.length <= MAX_SYMBOLS),
    error: `Максимальная длина одного хэштега ${MAX_SYMBOLS} символов, включая решётку`,
  },
  {
    check: (inputArray) => inputArray.length <= MAX_HASHTAGS,
    error: `Нельзя указать больше ${MAX_HASHTAGS} хэштегов`,
  },
];

// Функция для валидации хэштегов

const validateHashtags = (value) => {
  if (!value.trim()) {
    return true; // Пустое значение валидно
  }
  const inputArray = value.trim().toLowerCase().split(/\s+/);
  return hashtagRules.every((rule) => rule.check(inputArray));
};

// Функция для получения текста ошибки
const getHashtagsError = (value) => {
  if (!value.trim()) {
    return '';
  }
  const inputArray = value
    .trim()
    .toLowerCase()
    .split(/\s+/);
  for (const rule of hashtagRules) {
    if (!rule.check(inputArray)) {
      return rule.error;
    }
  }
  return '';
};

// Правило для валидации комментария

const validateDescription = (value) => value.length <= MAX_DESCRIPTION_LENGTH;
const getDescriptionError = () =>
  `Длина комментария не может превышать ${MAX_DESCRIPTION_LENGTH} символов.`;

pristine.addValidator(hashtagInput, validateHashtags, getHashtagsError);
pristine.addValidator(commentInput, validateDescription, getDescriptionError);

// ======== Обработчик отправки формы ========
form.addEventListener('submit', (evt) => {
  evt.preventDefault(); // Отменяем стандартную отправку формы
  pristine.validate();
});

// ======== Отключение Esc при фокусе на полях ========
[hashtagInput, commentInput].forEach((input) => {
  input.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.stopPropagation(); // Останавливаем всплытие события
      closeImageEditingWindow(); // Закрываем окно редактирования
    }
  });
});

export {};
