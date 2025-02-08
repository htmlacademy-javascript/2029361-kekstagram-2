import { photoGallery } from './rendering-images';

const COMMENTS_STEP = 5;
const modalBigPicture = document.querySelector('.big-picture');
const buttonBigPictureCancel = modalBigPicture.querySelector('.big-picture__cancel');
const loadMoreButton = modalBigPicture.querySelector('.comments-loader'); // Кнопка "Загрузить ещё"
const commentCountBlock = modalBigPicture.querySelector('.social__comment-count'); // Блок счётчика комментариев
const commentsContainer = modalBigPicture.querySelector('.social__comments'); // Контейнер для комментариев

const exampleComment = document.querySelector('#user-comments').content.querySelector('.social__comment');

let currentPhotoComments = [];
let shownCommentsCount = 0;

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    onModalClose();
  }
};

// Функция добавления комментариев
const onCommentsRender = () => {
  const fragment = document.createDocumentFragment();
  const nextComments = currentPhotoComments.slice(shownCommentsCount, shownCommentsCount + COMMENTS_STEP);

  nextComments.forEach(({ name, avatar, message }) => {
    const comment = exampleComment.cloneNode(true);
    comment.querySelector('.social__picture').alt = name;
    comment.querySelector('.social__picture').src = avatar;
    comment.querySelector('.social__text').textContent = message;
    fragment.appendChild(comment);
  });

  commentsContainer.appendChild(fragment);
  shownCommentsCount += nextComments.length;
  commentCountBlock.textContent = `${shownCommentsCount} из ${currentPhotoComments.length} комментариев`;

  if (shownCommentsCount >= currentPhotoComments.length) {
    loadMoreButton.classList.add('hidden');
  }
};

// Функция открытия модального окна
function openModal(photo) {
  modalBigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);

  modalBigPicture.querySelector('.big-picture__img img').src = photo.url;
  modalBigPicture.querySelector('.likes-count').textContent = photo.likes;
  modalBigPicture.querySelector('.social__caption').textContent = photo.description;

  currentPhotoComments = photo.comments;
  shownCommentsCount = 0;
  commentsContainer.innerHTML = '';
  loadMoreButton.classList.remove('hidden');
  commentCountBlock.classList.remove('hidden');

  onCommentsRender();
  if (currentPhotoComments.length <= COMMENTS_STEP) {
    commentCountBlock.classList.add('hidden');
  }
  document.body.classList.add('modal-open');
}

// Функция закрытия модального окна
function onModalClose() {
  modalBigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  document.body.classList.remove('modal-open');
}

loadMoreButton.addEventListener('click', onCommentsRender);
buttonBigPictureCancel.addEventListener('click', onModalClose);

// Навешивание обработчика на динамически добавленные картинки
const initializePhotoClickHandlers = (photos) => {
  photoGallery.addEventListener('click', (event) => {
    const target = event.target.closest('.picture'); // Ищем ближайший элемент с классом .picture

    // Проверяем, существует ли target
    if (!target) {
      return; // Выходим из функции, если target не найден
    }
    const photoId = Number(target.dataset.id);
    const photoData = photos.find((photo) => photo.id === photoId);
    if (photoData) {
      openModal(photoData);
    }
  });
};

export { initializePhotoClickHandlers };
