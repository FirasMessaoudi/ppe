import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from 'src/app/core/domain/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  baseUrl=environment.myBaseUrl;
  private url='/contacts';
  constructor(private _http: HttpClient) { }
  addMessage(message:Contact):Observable<Contact>{
    return this._http.post<Contact>(this.baseUrl+this.url+'/addMessage',message);
  }
}
