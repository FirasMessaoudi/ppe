import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MoviePersonModel } from 'src/app/core/domain/movie-person.model';
import { MovieCast, MovieCastModel } from 'src/app/core/domain/moviecast';
import { TvCreditsModel } from 'src/app/core/domain/tv-credits.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  baseUrl = environment.myBaseUrl;
  private url_person = "https://api.themoviedb.org/3/person";
  private url_search = "https://api.themoviedb.org/3/search/person";
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
  getPersonByName(name: string, page:number): Observable<any> {
    return this._http.get<any>(
      `${this.url_search}?api_key=${this.api_key}&query=${name}&page=${page}`
    );
}
}