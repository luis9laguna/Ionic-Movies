import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const URL = environment.imgPath;

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(image: string): string {
    if(image){
      return URL + image;
    }else{
      return './assets/img/no-image.jpg';
    }
  }

}
