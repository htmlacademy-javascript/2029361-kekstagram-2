import { generatedPhotos } from './rendering-images';
import { initializePhotoClickHandlers } from './fullScreenViewer';
import { form, pristine, imageLoadingWindow, body } from './form-loading-editing-image';
import { imgFiltersOpen, initFilters } from './filters-image';

const showErrorMessage = (templateId) => {
  const template = document.querySelector(templateId).content.cloneNode(true);
  document.body.appendChild(template);
  const errorWindow = document.body.querySelector('.error');

  const closeMessage = () => {
    errorWindow.remove();
  };

  // Закрытие сообщения по клику на кнопку
  const errorButton = errorWindow.querySelector('.error__button');
  if (errorButton) {
    errorButton.addEventListener('click', () => {
      closeMessage();
    });
  }

  // Закрытие по нажатию на клавишу Esc
  const onEscPress = (evt) => {
    if (evt.key === 'Escape') {
      closeMessage();
      document.removeEventListener('keydown', onEscPress);
    }
  };

  document.addEventListener('keydown', onEscPress);

  // Закрытие по клику вне окна
  errorWindow.addEventListener('click', (evt) => {
    if (!evt.target.closest('.error__inner')) {
      closeMessage();
    }
  });
};

const showSuccessMessage = () => {
  const template = document.querySelector('#success').content.cloneNode(true);
  document.body.appendChild(template);

  const successWindow = document.body.querySelector('.success');

  const closeMessage = () => {
    successWindow.remove();
  };

  // Закрытие сообщения по клику на кнопку
  const successButton = successWindow.querySelector('.success__button');
  if (successButton) {
    successButton.addEventListener('click', closeMessage);
  }

  // Закрытие по нажатию на клавишу Esc
  const onEscPress = (evt) => {
    if (evt.key === 'Escape') {
      closeMessage();
      document.removeEventListener('keydown', onEscPress);
    }
  };

  document.addEventListener('keydown', onEscPress);

  // Закрытие по клику вне окна
  successWindow.addEventListener('click', (evt) => {
    if (!evt.target.closest('.success__inner')) {
      closeMessage();
    }
  });
};

const resetForm = () => {
  form.reset();
  pristine.reset();
};

const closeImageEditingWindow = () => {
  imageLoadingWindow.classList.add('hidden');
  body.classList.remove('modal-open');
  resetForm();
  document.removeEventListener('keydown', onDocumentKeydown);
};

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape' && !document.activeElement.matches('.text__hashtags, .text__description')) {
    evt.preventDefault();
    closeImageEditingWindow();
  }
};

const getData = () => {
  fetch('https://31.javascript.htmlacademy.pro/kekstagram/data')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Ошибка загрузки данных');
      }
      return response.json();
    })
    .then((data) => {
      generatedPhotos(data);
      imgFiltersOpen();
      initFilters(data);
      initializePhotoClickHandlers(data);
    })
    .catch(() => {
      showErrorMessage('#data-error');
    });
};

const uploadImage = (formData) => {
  fetch('https://31.javascript.htmlacademy.pro/kekstagram', {
    method: 'POST',
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Ошибка загрузки файла');
      }
      showSuccessMessage();
      closeImageEditingWindow();
    })
    .catch(() => {
      showErrorMessage('#error', formData);
    });
};

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    const formData = new FormData(form);
    uploadImage(formData);
  }
});

getData();
