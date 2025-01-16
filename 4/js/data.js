import {comments, photoValues, names, descriptions} from './until';
import { getRandomInteger } from './randomInteger';

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
  const randomDescriptionIndex = getRandomInteger(0, descriptions.length - 1);
  const randomLikes = getRandomInteger(photoValues.RANDOM_MIN_NUMBER_LIKES, photoValues.RANDOM_MAX_NUMBER_LIKES);
  const randomCommentsCount = getRandomInteger(photoValues.RANDOM_MIN_NUMBER_COMMENTS, photoValues.RANDOM_MAX_NUMBER_COMMENTS);
  const commentsArray = Array.from({ length: randomCommentsCount }, createComments);

  return {
    id: ++indexPhoto,
    url: `photos/${indexPhoto}.jpg`,
    description: descriptions[randomDescriptionIndex],
    likes: randomLikes,
    comments: commentsArray,
  };
};

export {createComments, createImage};
