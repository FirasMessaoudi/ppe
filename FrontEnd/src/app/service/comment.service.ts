import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  baseUrl = environment.myBaseUrl+'/comments';
  constructor(private httpClient: HttpClient) { }
  findAllComments(idMovie: number): Observable<any[]>{
    return this.httpClient.get<any[]>(this.baseUrl+'/findAll/'+idMovie);  
  }
  addComment(comment: any){
    return this.httpClient.post<any>(this.baseUrl+'/addComment',comment);
  }
  updateComment(comment: any){
    return this.httpClient.put<any>(this.baseUrl+'/updateComment',comment);
  }
  deleteComment(id: number){
    return this.httpClient.delete<any>(this.baseUrl+'/delete/'+id);
  }
  likeDislike(idComment: number, idUser: number){
    return this.httpClient.get<any>(this.baseUrl+'/likedislike/'+idComment+'/'+idUser);
  }
}
