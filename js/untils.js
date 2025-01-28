import {comments, photoValues, names, description} from './data';

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
};

let indexPhoto = 0;
let indexComment = 0;

const createComments = () => {
  const randomAvatarIndex = getRandomInteger(photoValues.RANDOM_MIN_NUMBER_AVATAR, photoValues.RANDOM_MAX_NUMBER_AVATAR);
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
  const randomDescriptionIndex = getRandomInteger(0, description.length - 1);
  const randomLikes = getRandomInteger(photoValues.RANDOM_MIN_NUMBER_LIKES, photoValues.RANDOM_MAX_NUMBER_LIKES);
  const randomCommentsCount = getRandomInteger(photoValues.RANDOM_MIN_NUMBER_COMMENTS, photoValues.RANDOM_MAX_NUMBER_COMMENTS);
  const commentsArray = Array.from({ length: randomCommentsCount }, createComments);

  return {
    id: ++indexPhoto,
    url: `photos/${indexPhoto}.jpg`,
    description: description[randomDescriptionIndex],
    likes: randomLikes,
    comments: commentsArray,
  };
};

const generatedPhotos = function () {
  return Array.from({ length: photoValues.PHOTOS_COUNT }, createImage);
};

export {createComments, getRandomInteger, generatedPhotos};
