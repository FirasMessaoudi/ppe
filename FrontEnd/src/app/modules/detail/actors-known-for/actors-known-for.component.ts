import { Component, OnInit } from '@angular/core';
import { MoviePersonModel } from 'src/app/core/domain/movie-person.model';
import {  MovieCast } from 'src/app/core/domain/moviecast';
import { TvCastModel } from 'src/app/core/domain/tv-cast.model';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Location } from '@angular/common';
import { MovieVideosModel } from 'src/app/core/domain/moviemodelvideo';
import { NgxSpinnerService } from 'ngx-spinner';
import { PersonService } from 'src/app/core/api_services/person.service';

@Component({
  selector: 'app-actors-known-for',
  templateUrl: './actors-known-for.component.html',
  styleUrls: ['./actors-known-for.component.scss']
})
export class ActorsKnownForComponent implements OnInit {
  person: MoviePersonModel;
  movies: MovieCast[];
  tv_credits: TvCastModel[];
  path ='https://image.tmdb.org/t/p/w185/';
 cover='https://image.tmdb.org/t/p/original/';
 youtube = 'https://www.youtube.com/embed/';

 video: MovieVideosModel;

  constructor(private route: ActivatedRoute,
    private location: Location,private serviceactor: PersonService,private spinner: NgxSpinnerService
    ) { }

  ngOnInit() {
    this.spinner.show();
    const id = this.route.snapshot.paramMap.get('id');
    const getPerson = this.serviceactor.getPerson(+id);
    const getPersonMovies = this.serviceactor.getPersonMovies(+id);
    const getPersonTv = this.serviceactor.getPersonTv(+id);

    forkJoin(getPerson, getPersonMovies, getPersonTv).subscribe(([person, movies, tv_credits]) => {
      this.spinner.hide();
      this.person = person;
      this.movies = movies.cast;
      this.tv_credits = tv_credits.cast;
  
    })
 
  }
  back() {
    this.location.back();
  }


}
