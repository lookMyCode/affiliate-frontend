import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  private token: string;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getToken();
  }

  public getToken(): string {
    if (!this.token) this.token = localStorage.getItem('token');
    
    return this.token;
  }

  public setToken(token: string): void {
    localStorage.setItem('token', token);
    this.token = token;
  }

  isLogged(): boolean {
    if (!this.token) this.token = this.getToken();

    return !!this.token;
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  login(email: string, pass: string): Observable<any> {
    const req = {email, password: pass};

    return this.http.post(`${environment.apiURL}/profile/login`, req);
  }

  register(email: string, pass: string): Observable<any> {
    const req = {email, password: pass};

    return this.http.post(`${environment.apiURL}/profile/register`, req);
  }

  // reset(email: string): Observable<IRes> {}

  changeEmail(email: string, password: string): Observable<any> {
    const req = {
      email,
      password,
      token: this.getToken()
    }

    return this.http.post(`${environment.apiURL}/profile/email`, req);
  }

  changePass(oldPass: string, newPass: string): Observable<any> {
    const req = {
      oldPassword: oldPass,
      newPassword: newPass,
      token: this.getToken()
    }

    return this.http.post(`${environment.apiURL}/profile/password`, req);
  }

  deleteProfile(pass: string): Observable<any> {
    const req = {
      token: this.getToken(),
      password: pass
    }

    return this.http.post(`${environment.apiURL}/profile/delete`, req);
  }
}