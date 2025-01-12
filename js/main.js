const comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const names = [
  'Виктор Пупов',
  'Геннадий Изюмов',
  'Оксана Тетёхина',
  'Ваня Комментаторов',
  'Фотоспец3002'
];

const descriptions = [
  'здесь мог быть lorem, но ты просто чилишь',
  'Русалка села на шпагат',
  'Колобок повесился'
];

const PHOTOS_COUNT = 25;

const RANDOM_MAX_NUMBER_AVATAR = 6;
const RANDOM_MIN_NUMBER_AVATAR = 1;

const RANDOM_MAX_NUMBER_COMMENTS = 30;
const RANDOM_MIN_NUMBER_COMMENTS = 0;

const RANDOM_MAX_NUMBER_LIKES = 200;
const RANDOM_MIN_NUMBER_LIKES = 15;

let indexPhoto = 0;
let indexComment = 0;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
};

const createComments = () => {
  const randomAvatarIndex = getRandomInteger(RANDOM_MIN_NUMBER_AVATAR, RANDOM_MAX_NUMBER_AVATAR);
  const randomNameIndex = getRandomInteger(0, names.length - 1);
  const commentValue = comments[getRandomInteger(0, comments.length - 1)];
  const commentValue2 = comments[getRandomInteger(0, comments.length - 1)];
  const genMessage = commentValue !== commentValue2 ? `${commentValue} ${commentValue2}` : commentValue;

  return {
    id: ++indexComment,
    avatar: `img/avatar-${randomAvatarIndex}.svg`,
    message: genMessage,
    name: names[randomNameIndex],
  };
};

const createImage = () => {
  const randomDescriptionIndex = getRandomInteger(0, descriptions.length - 1);
  const randomLikes = getRandomInteger(RANDOM_MIN_NUMBER_LIKES, RANDOM_MAX_NUMBER_LIKES);
  const randomCommentsCount = getRandomInteger(RANDOM_MIN_NUMBER_COMMENTS, RANDOM_MAX_NUMBER_COMMENTS);
  const commentsArray = Array.from({ length: randomCommentsCount }, createComments);

  return {
    id: ++indexPhoto,
    url: `photos/${indexPhoto}.jpg`,
    description: descriptions[randomDescriptionIndex],
    likes: randomLikes,
    comments: commentsArray,
  };
};

const generatedPhotos = Array.from({ length: PHOTOS_COUNT }, createImage);
