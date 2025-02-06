const photoGallery = document.querySelector('.pictures');
const exampleImage = document.querySelector('#picture').content.querySelector('.picture');
const photoGenerated = document.createDocumentFragment();

const generatedPhotos = (photos) => {
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
};

export { photoGallery, generatedPhotos };
