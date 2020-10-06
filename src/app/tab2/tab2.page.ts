import { Component } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { Movie } from '../interfaces/movies';
import { ModalController } from '@ionic/angular';
import { DetailComponent } from '../components/detail/detail.component';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  textoBuscar = '';
  buscando = false;
  movies: Movie[] = [];

  constructor( private moviesService: MovieService,
               private modalCtrl: ModalController) { }

  search( event ) {
    const text: string = event.detail.value;

    if ( text.length === 0 ) {
      this.buscando = false;
      this.movies = [];
      return;
    }
    this.buscando = true;
    
    this.moviesService.searchMovie( text )
        .subscribe( data => {
          this.movies = data;
          this.buscando = false;
        });
  }

  async detail( id: string ) {

    const modal = await this.modalCtrl.create({
      component: DetailComponent,
      componentProps: {id}
    });
    modal.present();
  }

}
