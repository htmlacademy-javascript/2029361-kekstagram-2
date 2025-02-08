import { generatedPhotos } from './rendering-images';
import { debounce } from './utils';

const FILTER_DELAY = 500;
const RANDOM_PHOTOS_COUNT = 10;

const imgFilters = document.querySelector('.img-filters');
const filterForm = imgFilters.querySelector('.img-filters__form');

const filters = document.querySelector('.img-filters');
const openImageFilters = function () {
  filters.classList.remove('img-filters--inactive');
};

let currentFilter = 'filter-default';
let photosList = [];

// Функция для отображения фотографий
const picturesContainer = document.querySelector('.pictures');

const renderPhotos = (filteredPhotos) => {
  const oldPhotos = picturesContainer.querySelectorAll('.picture');
  // Удаляем старые фотографии
  oldPhotos.forEach((photo) => photo.remove());
  // Отрисовываем новые
  generatedPhotos(filteredPhotos);
};

// Фильтры для сортировки
const getFilteredPhotos = () => {
  switch (currentFilter) {
    case 'filter-random':
      return [...photosList].sort(() => Math.random() - 0.5).slice(0, RANDOM_PHOTOS_COUNT);
    case 'filter-discussed':
      return [...photosList].sort((a, b) => b.comments.length - a.comments.length);
    default:
      return photosList;
  }
};

// Функция обработки нажатия на фильтр
let activeFilterButton = document.querySelector('.img-filters__button--active'); // Сохраняем активную кнопку

const onFilterChange = debounce((evt) => {
  if (!evt.target.classList.contains('img-filters__button')) {
    return;
  }
  if (activeFilterButton) {
    activeFilterButton.classList.remove('img-filters__button--active');
  }
  activeFilterButton = evt.target;
  activeFilterButton.classList.add('img-filters__button--active');
  currentFilter = activeFilterButton.id;
  renderPhotos(getFilteredPhotos());
}, FILTER_DELAY);

// Функция инициализации фильтров
const initFilters = (loadedPhotos) => {
  photosList = loadedPhotos;

  // Показываем блок с фильтрами
  imgFilters.classList.remove('img-filters--inactive');

  // Добавляем обработчик на форму фильтров
  filterForm.addEventListener('click', onFilterChange);
};

export { initFilters, openImageFilters };

