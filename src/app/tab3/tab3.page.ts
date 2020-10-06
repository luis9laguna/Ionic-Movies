import { Component } from '@angular/core';
import { MovieDetail, Genre } from '../interfaces/movies';
import { LocalService } from '../services/local.service';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  movies: MovieDetail[] = [];
  genres: Genre[] = [];
  
  favGenre: any[] = [];

  constructor(private local: LocalService,
    private moviesService: MovieService) {}


  async ionViewWillEnter() {
    this.movies = await this.local.loadFavorites();
    this.genres = await this.moviesService.loadGenre();
    this.movieGenre( this.genres, this.movies );
  }

  movieGenre( genres: Genre[], movies: MovieDetail[] ){

    this.favGenre = [];

    genres.forEach( genr => {

      this.favGenre.push({
        genre: genr.name,
        fav: movies.filter( movie => {
          return movie.genres.find( genre => genre.id === genr.id );
        })
      });

    });

    console.log(this.favGenre);
  }

}
