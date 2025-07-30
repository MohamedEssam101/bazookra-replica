import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http_Client = inject(HttpClient);

  private readonly login_Api_Url = 'http://localhost:3000/login';
  private readonly register_Api_Url = 'http://localhost:3000/register';

  login(userData: any) {
    return this.http_Client.post(`${this.login_Api_Url}`, userData);
  }
  register(userData: any): Observable<any> {
    return this.http_Client.post(`${this.register_Api_Url}`, userData, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  onRegister(userData: any) {
    this.register(userData).subscribe({
      next: (res) => {
        console.log(res);
      },
    });
  }
  onLogin(userData: any) {
    this.login(userData).subscribe({
      next: (res) => {
        console.log(res);
      },
    });
  }
}
