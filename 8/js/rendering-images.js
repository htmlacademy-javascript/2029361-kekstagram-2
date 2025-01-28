import { generatedPhotos } from './untils';

const photoGallery = document.querySelector('.pictures');
const exampleImage = document.querySelector('#picture').content.querySelector('.picture');
const photos = generatedPhotos();
const photoGenerated = document.createDocumentFragment();

photos.forEach(({id, url, description, likes, comments}) => {
  const element = exampleImage.cloneNode(true);
  element.querySelector('.picture__img').src = url;
  element.querySelector('.picture__img').alt = description;
  element.querySelector('.picture__likes').textContent = likes;
  element.querySelector('.picture__comments').textContent = comments.length;
  element.dataset.id = id;
  photoGenerated.appendChild(element);
});
photoGallery.appendChild(photoGenerated);


export { photoGallery, photos };
