const imageInput = document.querySelector('.img-upload__input'); // Поле выбора файла
const imageLoadingWindow = document.querySelector('.img-upload__overlay'); // Окно редактирования
const closeButton = document.querySelector('.img-upload__cancel'); // Кнопка закрытия
const body = document.body; // Тело страницы для управления классом modal-open
const previewImage = document.querySelector('.img-upload__preview img'); // Главное превью
const effectPreviews = document.querySelectorAll('.effects__preview'); // Маленькие превью эффектов

const form = document.querySelector('.img-upload__form'); // Форма загрузки
const hashtagInput = document.querySelector('.text__hashtags'); // Поле хештегов
const commentInput = document.querySelector('.text__description'); // Поле комментария
const MAX_HASHTAGS = 5;
const MAX_SYMBOLS = 20;
const MAX_DESCRIPTION_LENGTH = 140;
const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'pristine-error',
});

const sliderElement = form.querySelector('.effect-level__slider');
const sliderInput = form.querySelector('.effect-level__value');
const radioEffects = form.querySelectorAll('.effects__radio');
const effectLevelContainer = form.querySelector('.img-upload__effect-level');
const IMAGE_EFFECTS = {
  none: { min: 0, max: 100, step: 1, filter: () => 'none', hidden: true },
  chrome: { min: 0, max: 1, step: 0.1, filter: (value) => `grayscale(${value})` },
  sepia: { min: 0, max: 1, step: 0.1, filter: (value) => `sepia(${value})` },
  marvin: { min: 0, max: 100, step: 1, filter: (value) => `invert(${value}%)` },
  phobos: { min: 0, max: 3, step: 0.1, filter: (value) => `blur(${value}px)` },
  heat: { min: 1, max: 3, step: 0.1, filter: (value) => `brightness(${value})` },
};


const bigger = form.querySelector('.scale__control--bigger');
const smaller = form.querySelector('.scale__control--smaller');
const controlSizeInput = form.querySelector('.scale__control--value');
const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;

// Функция уменьшения масштаба
const onSmallerClick = () => {
  let currentValue = parseInt(controlSizeInput.value.replace('%', ''), 10);

  if (currentValue > MIN_SCALE) {
    currentValue -= SCALE_STEP;
    controlSizeInput.value = `${currentValue}%`;
    previewImage.style.transform = `scale(${currentValue / 100})`;
  }
};

// Функция увеличения масштаба
const onBiggerClick = () => {
  let currentValue = parseInt(controlSizeInput.value.replace('%', ''), 10);

  if (currentValue < MAX_SCALE) {
    currentValue += SCALE_STEP;
    controlSizeInput.value = `${currentValue}%`;
    previewImage.style.transform = `scale(${currentValue / 100})`;
  }
};

// Создаём слайдер
noUiSlider.create(sliderElement, {
  range: { min: 0, max: 100 },
  start: 100,
  step: 1,
  connect: 'lower',
});

const updateSlider = (effect) => {
  const settings = IMAGE_EFFECTS[effect];

  sliderElement.noUiSlider.updateOptions({
    range: { min: settings.min, max: settings.max },
    start: settings.max,
    step: settings.step,
  });

  // Используем сохранённую ссылку
  effectLevelContainer.classList.toggle('hidden', effect === 'none');
};

// Обработчик выбора эффекта
radioEffects.forEach((radio) => {
  radio.addEventListener('change', (evt) => {
    const effect = evt.target.value;
    updateSlider(effect);

    sliderElement.noUiSlider.off('update');
    sliderElement.noUiSlider.on('update', (_, handle, values) => {
      const value = values[handle];
      sliderInput.value = value;
      previewImage.style.filter = IMAGE_EFFECTS[effect].filter(value);
    });

    // При смене эффекта сбрасываем значение на максимум
    sliderElement.noUiSlider.set(IMAGE_EFFECTS[effect].max);
  });
});

// Устанавливаем эффект «Оригинал» по умолчанию
updateSlider('none');

const handleKeydown = (evt, key, excludedSelectors, callback) => {
  if (evt.key === key && !document.activeElement.matches(excludedSelectors)) {
    evt.preventDefault();
    callback();
  }
};

// Функция закрытия окна редактирования
const closeImageEditingWindow = () => {
  imageLoadingWindow.classList.add('hidden'); // Скрываем окно
  body.classList.remove('modal-open'); // Разрешаем прокрутку страницы
  imageInput.value = ''; // Очищаем input, чтобы можно было снова выбрать тот же файл
  hashtagInput.value = ''; // Очищаем хештеги
  commentInput.value = ''; // Очищаем комментарий
  pristine.reset(); // Сбрасываем ошибки валидации
  sliderInput.value = ''; // Сбрасываем слайдер

  document.removeEventListener('keydown', handleKeydown); // Убираем обработчик Esc

  updateSlider('none');
  previewImage.style.filter = 'none';
};

document.addEventListener('keydown', (evt) => {
  // Проверяем, открыто ли окно ошибки
  const errorWindow = document.querySelector('.error');

  // Если нажали Esc, и нет активного фокуса в полях хештегов или комментария
  if (evt.key === 'Escape' && !document.activeElement.matches('.text__hashtags, .text__description')) {
    evt.preventDefault();

    if (errorWindow) {
      errorWindow.remove();
    } else {
      closeImageEditingWindow();
    }
  }
});

// Функция открытия окна редактирования
const openImageEditingWindow = () => {
  imageLoadingWindow.classList.remove('hidden'); // Показываем окно редактирования
  body.classList.add('modal-open'); // Блокируем прокрутку страницы

  document.addEventListener('keydown', handleKeydown); // Добавляем обработчик Esc
};

// Обработчик выбора файла
imageInput.addEventListener('change', (event) => {
  const file = event.target.files[0]; // Получаем загруженный файл
  if (!file) {
    return;
  } // Если файл не выбран, ничего не делаем

  const fileURL = URL.createObjectURL(file); // Создаём ссылку на файл

  previewImage.src = fileURL; // Подставляем изображение в главное превью
  effectPreviews.forEach((preview) => (preview.style.backgroundImage = `url(${fileURL})`)); // Обновляем мини-превью

  openImageEditingWindow(); // Открываем окно редактирования
});

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
  {
    check: (inputArray) => inputArray.every((item) => /^[A-Za-z0-9#]+$/.test(item.slice(1))),
    error: 'Хэштег не может содержать спецсимволы',
  },
];

// Функция для валидации хэштегов

const validateHashtags = (value) => {
  if (!value.trim()) {
    return true; // ✅ Пустое поле считается валидным
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

// Обработчики на кнопки увеличения и уменьшения изображения
smaller.addEventListener('click', onSmallerClick);
bigger.addEventListener('click', onBiggerClick);

// Обработчик закрытия окна при нажатии на кнопку
closeButton.addEventListener('click', closeImageEditingWindow);

export { form, pristine, imageLoadingWindow, body };
