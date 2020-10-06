import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { MovieDetail } from '../interfaces/movies';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  movies: MovieDetail[] = [];


  constructor( private storage: Storage,
               private toastCtrl: ToastController  ) {
    this.loadFavorites();
  }

  async presentToast( message: string ) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1500
    });
    toast.present();
  }

  guardarPelicula( pelicula: MovieDetail ) {

    let exist = false;
    let message = '';

    for ( const peli of this.movies ) {
      if ( peli.id === pelicula.id ) {
        exist = true;
        break;
      }
    }

    if ( exist ) {
      this.movies = this.movies.filter( peli => peli.id !== pelicula.id );
      message = 'Removido de favoritos';
    } else {
      this.movies.push( pelicula );
      message = 'Agregada a favoritos';
    }


    this.presentToast( message );
    this.storage.set('movies', this.movies );

    return !exist;


  }

  async loadFavorites() {

    const movies = await this.storage.get('movies');
    this.movies = movies || [];
    return this.movies;
  }

  async existMovie( id ) {

    await this.loadFavorites();
    const exist = this.movies.find( data => data.id === id );

    return (exist) ? true : false;
  }

}
