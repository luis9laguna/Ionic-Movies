import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/movies';
import { ModalController } from '@ionic/angular';
import { DetailComponent } from '../detail/detail.component';


@Component({
  selector: 'app-slideshow-backdrop',
  templateUrl: './slideshow-backdrop.component.html',
  styleUrls: ['./slideshow-backdrop.component.scss'],
})
export class SlideshowBackdropComponent implements OnInit {

  @Input() movies: Movie[] = [];

  slideOpts = {
    slidesPerView: 1.1
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
