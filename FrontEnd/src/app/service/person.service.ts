import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MoviePersonModel } from '../domain/movie-person.model';
import { TvCreditsModel } from '../domain/tv-credits.model';
import { MovieCastModel } from './moviecast';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  baseUrl = environment.myBaseUrl;
  private url_person = "https://api.themoviedb.org/3/person";
  private api_key = "cb4b280fa67edaa591ed48d4da421246";
  constructor(private _http: HttpClient) {}
  getPersonMovies(person_id: number): Observable<MovieCastModel> {
    return this._http.get<MovieCastModel>(
      `${this.url_person}/${person_id}/movie_credits?api_key=${this.api_key}`
    );
  }
  getPersonTv(person_id: number): Observable<TvCreditsModel> {
    return this._http.get<TvCreditsModel>(
      `${this.url_person}/${person_id}/tv_credits?api_key=${this.api_key}`
    );
  }
  getPerson(person_id: number): Observable<MoviePersonModel> {
    return this._http.get<MoviePersonModel>(
      `${this.url_person}/${person_id}?api_key=${this.api_key}`
    );
  }
}
