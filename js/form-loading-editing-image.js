const fileInput = document.querySelector('.img-upload__input'); // Поле выбора файла
const imageLoadingWindow = document.querySelector('.img-upload__overlay'); // Окно редактирования
const closeButton = document.querySelector('.img-upload__cancel'); // Кнопка закрытия
const body = document.body; // Тело страницы для управления классом modal-open
const previewImage = document.querySelector('.img-upload__preview img'); // Главное превью
const effectPreviews = document.querySelectorAll('.effects__preview'); // Маленькие превью эффектов
const form = document.querySelector('.img-upload__form');

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

  document.removeEventListener('keydown', onDocumentKeydown); // Убираем обработчик Esc
};

// Функция для закрытия по клавише Esc
const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeImageEditingWindow();
  }
};

// Обработчик выбора файла
fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0]; // Получаем загруженный файл

  const fileURL = URL.createObjectURL(file); // Создаём ссылку на файл

  previewImage.src = fileURL; // Подставляем изображение в главное превью
  effectPreviews.forEach((preview) => (preview.style.backgroundImage = `url(${fileURL})`)); // Обновляем мини-превью

  openImageEditingWindow(); // Открываем окно редактирования
});

// Обработчик закрытия окна при нажатии на кнопку
closeButton.addEventListener('click', closeImageEditingWindow);

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'form-is-not-valid__error-text',
}); // Валидация формы

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    console.log('Form is valid');
  } else {
    console.log('Form is not valid');
  }
});

export {};

