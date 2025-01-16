
import { photoValues } from './until';
import { createImage } from './data';


const generatedPhotos = Array.from({ length: photoValues.PHOTOS_COUNT }, createImage);
generatedPhotos();
//console.log(generatedPhotos);
