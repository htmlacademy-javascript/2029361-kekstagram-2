import { photoGallery, photos } from './rendering-images';

const pictures = photoGallery.querySelectorAll('.picture');
const modalBigPicture = document.querySelector('.big-picture');
const buttonBigPictureCancel = modalBigPicture.querySelector('.big-picture__cancel');
const loadMoreButton = modalBigPicture.querySelector('.comments-loader'); // Кнопка "Загрузить ещё"
const commentCountBlock = modalBigPicture.querySelector('.social__comment-count'); // Блок счётчика комментариев
const commentsContainer = modalBigPicture.querySelector('.social__comments'); // Контейнер для комментариев

const exampleComment = document.querySelector('#user-comments').content.querySelector('.social__comment');

let currentPhotoComments = []; // Массив комментариев для текущего изображения
let shownCommentsCount = 0; // Счётчик показанных комментариев
const COMMENTS_STEP = 5; // Шаг показа комментариев (по 5 за раз)

// Функция обработчика закрытия модального окна по клавише "Escape"
const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeModalBigPicture();
  }
};

// Циклдля добавления обработчиков на все миниатюры фотографий
for (let i = 0; i < pictures.length; i++) {
  pictures[i].addEventListener('click', () => {
    openModalBigPicture(pictures[i]);
  });

  // Обработчик закрытия окна по клику на кнопку
  buttonBigPictureCancel.addEventListener('click', () => {
    closeModalBigPicture();
  });
}

// Функция отображения следующей порции комментариев
const renderComments = () => {
  // Создаем фрагмент для добавления комментариев
  const fragment = document.createDocumentFragment();
  const nextComments = currentPhotoComments.slice(shownCommentsCount, shownCommentsCount + COMMENTS_STEP);

  // Генерация комментариев из порции
  nextComments.forEach(({ name, avatar, message }) => {
    const comment = exampleComment.cloneNode(true);
    comment.querySelector('.social__picture').alt = name;
    comment.querySelector('.social__picture').src = avatar;
    comment.querySelector('.social__text').textContent = message;
    fragment.appendChild(comment);
  });

  commentsContainer.appendChild(fragment); // Добавляем сгенерированные комментарии в контейнер
  shownCommentsCount += nextComments.length; // Увеличиваем счётчик отображённых комментариев

  // Обновляем текст блока с информацией о количестве комментариев
  commentCountBlock.textContent = `${shownCommentsCount} из ${currentPhotoComments.length} комментариев`;

  // Если все комментарии показаны, скрываем кнопку "Загрузить ещё"
  if (shownCommentsCount >= currentPhotoComments.length) {
    loadMoreButton.classList.add('hidden');
  }
};

// Обработчик кнопки "Загрузить ещёё"
loadMoreButton.addEventListener('click', renderComments);

// Функция открытия модального окна
function openModalBigPicture(link) {
  modalBigPicture.classList.remove('hidden'); // Показываем модальное окно
  document.addEventListener('keydown', onDocumentKeydown); // Добавляем обработчик закрытия по клавише

  const elem = photos.find((el) => el.id === Number(link.dataset.id)); // Находим объект фото по id

  // Устанавливаем данные изображения
  modalBigPicture.querySelector('.big-picture__img img').src = elem.url;
  modalBigPicture.querySelector('.likes-count').textContent = elem.likes;
  modalBigPicture.querySelector('.social__caption').textContent = elem.description;

  // Устанавливаем комментарии
  currentPhotoComments = elem.comments; // Сохраняем массив комментариев текущего изображения
  shownCommentsCount = 0; // Сбрасываем счётчик показанных комментариев
  commentsContainer.innerHTML = ''; // Очищаем старые комментарии
  loadMoreButton.classList.remove('hidden'); // Показываем кнопку "Загрузить ещё"
  commentCountBlock.classList.remove('hidden'); // Показываем блок счётчика комментариев

  renderComments(); // Отображаем первую порцию комментариев

  document.querySelector('body').classList.add('modal-open'); // Убираем скролл страницы
}

// Функция закрытия модального окна
function closeModalBigPicture() {
  modalBigPicture.classList.add('hidden'); // Прячем модальное окно
  document.removeEventListener('keydown', onDocumentKeydown); // Убираем обработчик закрытия по клавише
  document.querySelector('body').classList.remove('modal-open'); // Включаем скролл страницы
}

export { openModalBigPicture };
