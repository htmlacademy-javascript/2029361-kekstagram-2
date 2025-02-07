import { generatedPhotos } from './rendering-images';
import { initializePhotoClickHandlers } from './fullScreenViewer';
import { form, pristine, imageLoadingWindow, body } from './form-loading-editing-image';
import { openImageFilters, initFilters } from './filters-image';

const BASE_URL_LOADING = 'https://31.javascript.htmlacademy.pro/kekstagram/data';
const BASE_URL_SENDING = 'https://31.javascript.htmlacademy.pro/kekstagram';

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

const showErrorMessage = (templateId) => {
  const template = document.querySelector(templateId);
  if (!template) {
    return;
  }

  const clonedTemplate = template.content.cloneNode(true);
  document.body.appendChild(clonedTemplate);

  const errorWindow = document.body.querySelector('.error');

  if (!errorWindow) {
    return;
  }

  let autoCloseTimeout = null;

  // Функция закрытия окна ошибки
  const closeMessage = () => {
    if (errorWindow && errorWindow.parentNode) {
      errorWindow.remove();
    }
    clearTimeout(autoCloseTimeout);
    document.removeEventListener('keydown', onErrorEscPress);
  };

  // Функция для закрытия ошибки по Esc
  const onErrorEscPress = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeMessage();
    }
  };

  // Добавляем обработчик `Esc` ТОЛЬКО на окно ошибки!
  document.addEventListener('keydown', onErrorEscPress);

  // Закрытие по клику вне окна
  errorWindow.addEventListener('click', (evt) => {
    if (!evt.target.closest('.error__inner')) {
      closeMessage();
    }
  });

  // Закрытие по кнопке "Попробовать еще раз"
  const errorButton = errorWindow.querySelector('.error__button');
  if (errorButton) {
    errorButton.addEventListener('click', () => {
      closeMessage();
    });
  }

  // Автоматическое закрытие через 5 секунд
  autoCloseTimeout = setTimeout(() => {
    closeMessage();
  }, 5000);
};

const closeImageEditingWindow = () => {
  imageLoadingWindow.classList.add('hidden');
  body.classList.remove('modal-open');
  resetForm();
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  // Проверяем, открыто ли окно ошибки
  const errorWindow = document.querySelector('.error'); // Или '.error', если ты поменял HTML

  if (evt.key === 'Escape') {
    evt.preventDefault();

    if (errorWindow) {
      errorWindow.remove();
      return;
    }
    if (!document.activeElement.matches('.text__hashtags, .text__description')) {
      closeImageEditingWindow();
    }
  }
}


const getData = () => {
  fetch(BASE_URL_LOADING)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Ошибка загрузки данных');
      }
      return response.json();
    })
    .then((data) => {
      generatedPhotos(data);
      openImageFilters();
      initFilters(data);
      initializePhotoClickHandlers(data);
    })
    .catch(() => {
      showErrorMessage('#data-error');
    });
};

const uploadImage = (formData) => {
  fetch(BASE_URL_SENDING, {
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

export { getData };
