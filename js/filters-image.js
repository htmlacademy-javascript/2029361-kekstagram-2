import { generatedPhotos } from './rendering-images';
import { debounce } from './utils';

const filters = document.querySelector('.img-filters');
const imgFiltersOpen = function () {
  filters.classList.remove('img-filters--inactive');
};

const FILTER_DELAY = 500;
const RANDOM_PHOTOS_COUNT = 10;

const imgFilters = document.querySelector('.img-filters');
const filterForm = imgFilters.querySelector('.img-filters__form');
const filterButtons = filterForm.querySelectorAll('.img-filters__button');

let currentFilter = 'filter-default';
let photos = [];

// Функция для отображения фотографий
const renderPhotos = (filteredPhotos) => {
  const picturesContainer = document.querySelector('.pictures');
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
      return [...photos].sort(() => Math.random() - 0.5).slice(0, RANDOM_PHOTOS_COUNT);
    case 'filter-discussed':
      return [...photos].sort((a, b) => b.comments.length - a.comments.length);
    default:
      return photos;
  }
};

// Функция обработки нажатия на фильтр
const onFilterChange = debounce((evt) => {
  if (!evt.target.classList.contains('img-filters__button')) {
    return;
  }

  // Удаляем активный класс у всех кнопок и добавляем текущей
  filterButtons.forEach((button) => button.classList.remove('img-filters__button--active'));
  evt.target.classList.add('img-filters__button--active');

  // Обновляем текущий фильтр
  currentFilter = evt.target.id;

  // Отображаем отсортированные фото
  renderPhotos(getFilteredPhotos());
}, FILTER_DELAY);

// Функция инициализации фильтров
const initFilters = (loadedPhotos) => {
  photos = loadedPhotos;

  // Показываем блок с фильтрами
  imgFilters.classList.remove('img-filters--inactive');

  // Добавляем обработчик на форму фильтров
  filterForm.addEventListener('click', onFilterChange);
};

export { initFilters, imgFiltersOpen };

