import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { ResMDB, ResCredits, Genre } from '../interfaces/movies';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  public popularPage = 0;
  public genre: Genre[] = [];

  constructor(private http: HttpClient) { }

  getQuery(query: string) {
    const url = environment.url + query;
    const params: any =
      { api_key: environment.apiKey };

    return this.http.get(url, { params });
  }

  getNewMovies() {

    const today = new Date();
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const month = today.getMonth() + 1;

    let monthString;

    if (month < 10) {
      monthString = '0' + month;
    } else {
      monthString = month;
    }

    const start = `${today.getFullYear()}-${monthString}-01`;
    const end = `${today.getFullYear()}-${monthString}-${lastDay}`;

    return this.getQuery(`/discover/movie?primary_release_date.gte=${start}&primary_release_date.lte=${end}`)
      .pipe(
        map((data: ResMDB) => data.results));
  }

  getMoviePlaying() {
    return this.getQuery('/movie/now_playing')
      .pipe(
        map((data: ResMDB) => data.results));
  }

  getPopularMovie(){
    this.popularPage++;

    return this.getQuery(`/discover/movie?sort_by=popularity.desc&page=${ this.popularPage }`)
      .pipe(
        map((data: ResMDB) => data.results));
  }

  getDetail( id: string ) {
    return this.getQuery(`/movie/${ id }?a=1`);
  }

  getCast( id: string ) {
    return this.getQuery(`/movie/${ id }/credits?a=1`)
    .pipe(
      map((data: ResCredits) => data.cast));
  }

  searchMovie( text: string ) {
    return this.getQuery(`/search/movie?query=${ text }`)
    .pipe(
      map((data: ResMDB) => data.results));
  }


  loadGenre(): Promise<Genre[]> {

    return new Promise( resolve => {

      this.getQuery(`/genre/movie/list?a=1`)
        .subscribe( resp => {
          this.genre = resp['genres'];
          console.log(this.genre);
          resolve(this.genre);
        });

    });


  }
}
