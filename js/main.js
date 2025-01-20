
import { photoValues } from './data';
import { createImage } from './until';


const generatedPhotos = Array.from({ length: photoValues.PHOTOS_COUNT }, createImage);
generatedPhotos();
//console.log(generatedPhotos);
