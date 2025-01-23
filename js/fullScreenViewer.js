import { photoGallery } from './rendering-images';
import { generatedPhotos } from './until';

const pictures = photoGallery.querySelectorAll('.picture');
const modalBigPicture = document.querySelector('.big-picture');
const buttonBigPictureCancel = modalBigPicture.querySelector('.big-picture__cancel');

const exampleComment = document.querySelector('#user-comments').content.querySelector('.social__comment');
const allGenerateComment = modalBigPicture.querySelector('.social__comments');
const allComment = generatedPhotos();

const generateComment = document.createDocumentFragment();

allComment.forEach(({comments}) => {
  const comment = exampleComment.cloneNode(true);
  comment.querySelector('.social__picture').alt = comments.name;
  comment.querySelector('.social__picture').src = comments.avatar;
  comment.querySelector('.social__text').textContent = comments.message;
  generateComment.appendChild(comment);
});
allGenerateComment.appendChild(generateComment);

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

function openModalBigPicture (evt) {
  modalBigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  modalBigPicture.querySelector('.big-picture__img').children.src = evt.querySelector('.picture__img').src;
  modalBigPicture.querySelector('.likes-count').textContent = evt.querySelector('.picture__likes').textContent;
  modalBigPicture.querySelector('.social__comment-shown-count').textContent = evt.querySelector('.picture__comments').textContent;
  modalBigPicture.querySelector('.social__comment-total-count').textContent = evt.querySelector('.picture__comments').textContent;
  modalBigPicture.querySelector('.social__caption').textContent = evt.querySelector('.picture__img').alt;

  document.querySelector('body').classList.add('modal-open');

  modalBigPicture.querySelector('.social__comment-count').classList.add('hidden');
  modalBigPicture.querySelector('.comments-loader').classList.add('hidden');
}


function closeModalBigPicture (){
  modalBigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);

  document.querySelector('body').classList.remove('modal-open');

  modalBigPicture.querySelector('.social__comment-count').classList.remove('hidden');
  modalBigPicture.querySelector('.comments-loader').classList.remove('hidden');
}

export {};
