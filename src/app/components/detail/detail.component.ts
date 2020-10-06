import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MovieService } from '../../services/movie.service';
import { LocalService } from '../../services/local.service';
import { MovieDetail, Cast } from '../../interfaces/movies';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {

  @Input() id;
  public movie: MovieDetail = {};
  public casts: Cast[] = [];
  oculto = 150;
  star = 'star-outline';

  slideOptCast = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: 0
  };


  constructor( private modalCtrl: ModalController,
              private movieService: MovieService,
              private local: LocalService ) { }

  ngOnInit() {
    console.log(this.id);
    this.detailMovie();
    this.movieCast();
  }

  back() {
    this.modalCtrl.dismiss();
  }

  detailMovie(){
    this.movieService.getDetail(this.id)
    .subscribe(data => this.movie = data );
  }

  movieCast(){
    this.movieService.getCast(this.id)
    .subscribe(data => this.casts = data);
  }

  favorite() {
    const exists = this.local.guardarPelicula( this.movie );
    this.star = ( exists ) ? 'star' : 'star-outline';
  }

}
