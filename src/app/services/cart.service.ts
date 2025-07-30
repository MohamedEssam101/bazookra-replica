import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly http_Client = inject(HttpClient);
  private cartSubject = new BehaviorSubject<Cart | null>(null);

  readonly cart$ = this.cartSubject.asObservable();

  private readonly http_Client = inject(HttpClient);
  getUserCartItems(userId: string) {}
}
