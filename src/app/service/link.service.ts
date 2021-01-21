import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LinkService {

  constructor(
    private readonly auth: AuthService,
    private http: HttpClient
  ) {}

  getLinks(): Observable<any> {
    const req = {
      token: this.auth.getToken()
    }

    return this.http.post(`${environment.apiURL}/link/getAll`, req);
  }

  getLinkById(id: string): Observable<any> {
    const req = {
      token: this.auth.getToken(),
      id
    }

    return this.http.post(`${environment.apiURL}/link/getById`, req);
  }

  getLinkByShortName(shortLink: string): Observable<any> {
    const req = {shortLink};

    return this.http.post(`${environment.apiURL}/link/getByShortName`, req);
  }

  addLink(name: string, originalLink: string): Observable<any> {
    const req = {
      token: this.auth.getToken(),
      name,
      originalLink
    }

    return this.http.post(`${environment.apiURL}/link/add`, req);
  }

  addEvent(shortLink: string): Observable<any> {
    const req = {shortLink};

    return this.http.post(`${environment.apiURL}/link/addClick`, req);
  }

  deleteLink(id: string): Observable<any> {
    const req = {
      token: this.auth.getToken(),
      id
    };

    return this.http.post(`${environment.apiURL}/link/delete`, req);
  }
}
