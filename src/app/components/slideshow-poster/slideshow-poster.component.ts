import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/movies';
import { ModalController } from '@ionic/angular';
import { DetailComponent } from '../detail/detail.component';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent implements OnInit {

  @Input() movies: Movie[] = [];

  slideOpts = {
    slidesPerView: 3.3,
    freeMode: true
  };

  constructor( private modalCtrl: ModalController ) { }

  ngOnInit() {}

  async detail( id: string ) {

    const modal = await this.modalCtrl.create({
      component: DetailComponent,
      componentProps: {
        id
      }
    });
    
    modal.present();
  
  }

}
