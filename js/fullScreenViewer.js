import { photoGallery, photos } from './rendering-images';

const pictures = photoGallery.querySelectorAll('.picture');
const modalBigPicture = document.querySelector('.big-picture');
const buttonBigPictureCancel = modalBigPicture.querySelector('.big-picture__cancel');

const exampleComment = document.querySelector('#user-comments').content.querySelector('.social__comment');

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    modalBigPicture.classList.add('hidden');

    document.querySelector('body').classList.remove('modal-open');

    modalBigPicture.querySelector('.social__comment-count').classList.remove('hidden');
    modalBigPicture.querySelector('.comments-loader').classList.remove('hidden');
  }
};

for (let i = 0; i < pictures.length; i++) {
  pictures[i].addEventListener('click', () => {
    openModalBigPicture(pictures[i]);
  });

  buttonBigPictureCancel.addEventListener('click', () => {
    closeModalBigPicture();
  });
}

function openModalBigPicture(link) {
  modalBigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);

  const elem = photos.find((el) => el.id === Number(link.dataset.id));

  // Устанавливаем данные в модальное окно
  modalBigPicture.querySelector('.big-picture__img img').src = elem.url;
  modalBigPicture.querySelector('.likes-count').textContent = elem.likes;
  modalBigPicture.querySelector('.social__caption').textContent = elem.description;
  modalBigPicture.querySelector('.social__comment-shown-count').textContent = elem.comments.length;
  modalBigPicture.querySelector('.social__comment-total-count').textContent = elem.comments.length;

  // Очищаем старые комментарии
  const commentsContainer = modalBigPicture.querySelector('.social__comments');
  commentsContainer.innerHTML = '';

  // Генерируем и добавляем новые комментарии
  const commentsFragment = document.createDocumentFragment();
  elem.comments.forEach(({ name, avatar, message }) => {
    const comment = exampleComment.cloneNode(true);
    comment.querySelector('.social__picture').alt = name;
    comment.querySelector('.social__picture').src = avatar;
    comment.querySelector('.social__text').textContent = message;
    commentsFragment.appendChild(comment);
  });
  commentsContainer.appendChild(commentsFragment);

  document.querySelector('body').classList.add('modal-open');
}


function closeModalBigPicture (){
  modalBigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);

  document.querySelector('body').classList.remove('modal-open');

  modalBigPicture.querySelector('.social__comment-count').classList.remove('hidden');
  modalBigPicture.querySelector('.comments-loader').classList.remove('hidden');
}

export {openModalBigPicture};
