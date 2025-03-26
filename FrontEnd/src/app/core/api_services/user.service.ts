import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IFavorit } from 'src/app/core/domain/ifavorit';
import { IMovieUserId } from 'src/app/core/domain/imovieuserid';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.myBaseUrl;
  URL =  this.baseUrl + '/user/';
  addLToListUrl =  this.baseUrl + '/watchlist/addToWatchList';
  urlExistInWatchList =  this.baseUrl + '/watchlist/existInWatchList';
  urlExistInFavoris =  this.baseUrl + '/favoris/existInFavorit';
  urlWatch =    this.baseUrl + '/watchlist/updateWatchList';
  urlRate =    this.baseUrl + '/movieNote/rateMovie/';
  urUserFavoris =    this.baseUrl + '/favoris/getFavoris/';
  urlUserWatchList =  this.baseUrl + '/watchlist/getWatchList/';
  urlIsWatched =  this.baseUrl + '/watchlist/isWatched/';
  addtofav =  this.baseUrl + '/favoris/addFavorit';
  getMovieNoteURL = this.baseUrl + '/movieNote/getMovieNote';
  getWatchListByMovie = this.baseUrl + '/watchlist/getWatchListByMovie/';

  constructor(private http: HttpClient) {
  }
  getUser(username: string): Observable<any> {
    return this.http.get<any>(this.URL + username);
  }

  addToList (fav: IFavorit): Observable<any> {
    return this.http.post(this.addLToListUrl, fav, httpOptions);
  }
  existsInWatchList(movieUserID: IMovieUserId): Observable<boolean> {
    return this.http.post<boolean>(this.urlExistInWatchList , movieUserID);
  }
  existsInFavoris(movieUserID: IMovieUserId): Observable<boolean> {
    return this.http.post<boolean>(this.urlExistInFavoris, movieUserID);
  }
  isWatched(movieUserID: IMovieUserId): Observable<boolean> {
    return this.http.post<boolean>(this.urlIsWatched, movieUserID);
  }
  watchUnWatchMovie(fav: IFavorit): Observable<any> {
   return this.http.put(this.urlWatch, fav, httpOptions);
  }
  getFavoritsByUser(email: string): Observable<IFavorit[]> {
    return this.http.get<IFavorit[]>(this.urUserFavoris + email);
  }
  rateMovie(fav: IFavorit) {

    return this.http.post(this.urlRate, fav, httpOptions);
  }
  getWatchList(email: string): Observable<IFavorit[]> {
    return this.http.get<IFavorit[]>(this.urlUserWatchList + email );
  }
  getWatchListByCriteria(email: string, criteria: string): Observable<IFavorit[]> {
    return this.http.get<IFavorit[]>(this.urlUserWatchList + email + '/' + criteria );
  }
  addToMyFav(fav: IFavorit) {
    return this.http.post(this.addtofav, fav, httpOptions);
  }
  getMovieNote(userId: IMovieUserId): Observable<number> {
    return this.http.post<number>(this.getMovieNoteURL , userId);
  }
  getWatchListById(idMovie: number, email: string): Observable<IFavorit> {
    return this.http.get<IFavorit>(this.getWatchListByMovie + email + '/' + idMovie);
  }
  pushFileToStorage(formdata: FormData): Observable<any> {
    // let formdata: FormData = new FormData();

    // formdata.append('file', file);
     // formdata.append('name',name);

     const req = new HttpRequest('POST', this.baseUrl + '/api/fileupload/post', formdata, {
       reportProgress: true,
       responseType: 'text'
     });

     return this.http.request(req);
   }
   getFile(fileName: string, type: any) {
    const headers2 = new HttpHeaders().set('Accept', type);
    return this.http.post(this.baseUrl + '/api/fileupload/files/', fileName, {headers: headers2, responseType: 'blob'});
  }
  update(user: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + '/user/update', user);
  }
  findOne(movieUserID: IMovieUserId): Observable<IFavorit> {
    return this.http.post<IFavorit>(this.baseUrl + '/watchlist/findOne', movieUserID);
  }
  likeDislike(movieNote: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/movieNote/rateMovie', movieNote);

  }
  getLikedDisliked(userId: IMovieUserId): Observable<any> {
    return this.http.post<any>(this.getMovieNoteURL , userId);
  }
}
