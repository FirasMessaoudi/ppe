import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Genre } from "../domain/icategory";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: "root",
})
export class CategoryService {
  baseUrl = environment.myBaseUrl;
  moviegenres =
    "https://api.themoviedb.org/3/genre/movie/list?api_key=cb4b280fa67edaa591ed48d4da421246";
  tvgenres =
    "https://api.themoviedb.org/3/genre/tv/list?api_key=cb4b280fa67edaa591ed48d4da421246";
  private api_key = "cb4b280fa67edaa591ed48d4da421246";

  constructor(private _http: HttpClient) {}
  getMovieGenres(lang?: string): Observable<Genre> {
    return this._http.get<Genre>(this.moviegenres + "&language=" + lang);
  }
  getTvGenres(lang?: string): Observable<Genre> {
    return this._http.get<Genre>(this.tvgenres + "&language=" + lang);
  }

}
