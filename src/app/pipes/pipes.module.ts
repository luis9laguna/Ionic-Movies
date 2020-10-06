import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagePipe } from './image.pipe';
import { CouplesPipe } from './couples.pipe';



@NgModule({
  declarations: [
    ImagePipe,
    CouplesPipe
  ],
  exports: [
    ImagePipe,
    CouplesPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
