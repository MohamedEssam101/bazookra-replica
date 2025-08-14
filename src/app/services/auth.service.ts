import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthResponse } from '../interfaces/auth.interface';
import { User } from '../interfaces/user.interface';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class authService {
  private readonly http_Client = inject(HttpClient);

  private readonly login_Api_Url = 'http://localhost:3000/login';
  private readonly register_Api_Url = 'http://localhost:3000/register';

  private cookieService = inject(CookieService);
  private _router = inject(Router);

  private loggedInSubject = new BehaviorSubject<boolean>(false);
  readonly loggedIn$ = this.loggedInSubject.asObservable();

  private jwtHelper = new JwtHelperService();
  userId: User['id'];

  constructor() {
    // check if cookies and set the loggedin as true.
    this.initializeUserStatus();
  }
  login(userData: User): Observable<AuthResponse> {
    return this.http_Client.post<AuthResponse>(
      `${this.login_Api_Url}`,
      userData
    );
  }

  register(userData: User): Observable<AuthResponse> {
    return this.http_Client.post<AuthResponse>(
      `${this.register_Api_Url}`,
      userData,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      }
    );
  }

  onRegister(userData: User) {
    this.register(userData).subscribe({
      next: (res) => {
        console.log(res);
        this.cookieService.set('token', res.accessToken);
      },
    });
  }
  onLogin(userData: User) {
    return this.login(userData).pipe(
      tap((res) => {
        this.SetAccessToken(res.accessToken);
        this.loggedInSubject.next(true);
        this._router.navigate(['/menu']);
      })
    );
  }

  SetAccessToken(res: AuthResponse['accessToken']) {
    if (res) {
      this.cookieService.set('accessToken', res);
    }
  }
  isTokenExpired() {
    const token = this.cookieService.get('accessToken');
    // return true if token expired
    return this.jwtHelper.isTokenExpired(token);
  }
  checkTokenExists(): boolean {
    const token = this.cookieService.get('accessToken');
    if (token) {
      return true;
    }
    return false;
  }

  hasValidToken(): boolean {
    if (this.checkTokenExists() && !this.isTokenExpired()) {
      console.log('has valid token ');
      return true;
    } else {
      console.log('not valid token ');
      return false;
    }
  }
  initializeUserStatus() {
    try {
      if (this.hasValidToken()) {
        this.loggedInSubject.next(true);
      }
    } catch (error) {
      this.loggedInSubject.next(false);
      console.log(error);
    }
  }
}
