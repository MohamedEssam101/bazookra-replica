import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  finalize,
  map,
  Observable,
  of,
  reduce,
  take,
  tap,
} from 'rxjs';
import { loaderService } from './loader.service';
import { authService } from './auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Cart, GuestCartItem } from '../interfaces/cart.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private api_url = 'http://localhost:3000/cart_items';

  private readonly http_Client = inject(HttpClient);

  private readonly _cookiesService = inject(CookieService);

  private loader_Service = inject(loaderService);

  private _authService = inject(authService);
  private readonly loggedIn$ = this._authService.loggedIn$;

  private cartSubject = new BehaviorSubject<Cart[] | null>(null);
  readonly userCart$ = this.cartSubject.asObservable();

  constructor() {
    this.intializeCart();
  }
  getUserCartItems(userId: string): Observable<Cart[] | null> {
    let params = new HttpParams().set('user_id', userId);

    return this.http_Client.get<Cart[]>(this.api_url, { params }).pipe(
      catchError((err) => {
        if (err.status === 404) {
          return of([]);
        }
        throw err;
      })
    );
  }

  loadUserCartItems(userId: string): Observable<Cart[] | null> {
    this.loader_Service.startLoading();
    return this.getUserCartItems(userId).pipe(
      tap((res) => {
        this.cartSubject.next(res);
      }),
      finalize(() => {
        this.loader_Service.stopLoading();
      })
    );
  }

  // adding cart item to the data .
  addItemToCart(cartItem: GuestCartItem) {
    //  if user is not logged in ?

    this.loggedIn$.pipe(take(1)).subscribe((res) => {
      console.log(res);
      // response equal to true means the user is logged in
      if (res) {
        // add the cartItem to database.
        console.log('res equal to ', res);
      } else {
        // guest mode.
        // add cartTiem to cart cookies , check if it exists  and add if not creat eit and add.
        if (this.checkCartExists()) {
          // add item to cartCookie.
          // set each item without user_id , then if logged in , id will be added.
          this.updateCartItems(cartItem);
        } else {
          this.createCartItems(cartItem);
        }
      }
    });
  }

  //  to do : , if item is added and its already in the localStoarge with same , product_id and spiceLevel and size , then update the quantity thats it.
  checkCartExists(): boolean {
    if (localStorage.getItem('cart')) {
      return true;
    }
    return false;
  }
  updateCartItems(cartItem: GuestCartItem) {
    const existingCartJson = localStorage.getItem('cart');

    if (existingCartJson) {
      const cartArray = JSON.parse(existingCartJson);
      cartArray.push(cartItem);
      console.log(cartArray);
      this.cartSubject.next(cartArray);
      localStorage.setItem('cart', JSON.stringify(cartArray));
    }
  }
  createCartItems(cartItem: GuestCartItem) {
    // intial cart
    localStorage.setItem('cart', '[]');
    const emptyCartJson = localStorage.getItem('cart');
    const cartArray = JSON.parse(emptyCartJson || '[]');
    cartArray.push(cartItem);
    console.log(cartArray);
    this.cartSubject.next(cartArray);
    localStorage.setItem('cart', JSON.stringify(cartArray));
  }
  private intializeCart() {
    const existingCart = localStorage.getItem('cart');

    if (existingCart) {
      const cartArry = JSON.parse(existingCart);
      this.cartSubject.next(cartArry);
    } else {
      this.cartSubject.next([]);
    }
  }
  calculateTotalPrice(): Observable<number | undefined> {
    return this.userCart$.pipe(
      // mapping ofer cartItems , then reducing each item - total is the 0 , while cartItem is each object.
      map((cartItems) =>
        cartItems?.reduce(
          (total, cartItem) => cartItem.price * cartItem.quantity + total,
          0
        )
      )
    );
  }
}
