import { photoGallery } from './rendering-images';

const modalBigPicture = document.querySelector('.big-picture');
const buttonBigPictureCancel = modalBigPicture.querySelector('.big-picture__cancel');
const loadMoreButton = modalBigPicture.querySelector('.comments-loader'); // Кнопка "Загрузить ещё"
const commentCountBlock = modalBigPicture.querySelector('.social__comment-count'); // Блок счётчика комментариев
const commentsContainer = modalBigPicture.querySelector('.social__comments'); // Контейнер для комментариев

const exampleComment = document.querySelector('#user-comments').content.querySelector('.social__comment');

let currentPhotoComments = [];
let shownCommentsCount = 0;
const COMMENTS_STEP = 5;

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeModalBigPicture();
  }
};

// Функция добавления комментариев
const renderComments = () => {
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
function openModalBigPicture(photo) {
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

  renderComments();
  document.body.classList.add('modal-open');
}

// Функция закрытия модального окна
function closeModalBigPicture() {
  modalBigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  document.body.classList.remove('modal-open');
}

loadMoreButton.addEventListener('click', renderComments);
buttonBigPictureCancel.addEventListener('click', closeModalBigPicture);

// Навешивание обработчика на динамически добавленные картинки
const initializePhotoClickHandlers = (photos) => {
  photoGallery.addEventListener('click', (event) => {
    const target = event.target.closest('.picture');

    const photoId = Number(target.dataset.id);
    const photoData = photos.find((photo) => photo.id === photoId);

    if (photoData) {
      openModalBigPicture(photoData);
    }
  });
};

export { initializePhotoClickHandlers };
