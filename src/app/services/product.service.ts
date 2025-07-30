import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, delay, finalize, of, tap } from 'rxjs';
import { Product } from '../interfaces/product.interface';
import { loaderService } from './loader.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly apiUrl = 'http://localhost:3000/products';

  private http_Client = inject(HttpClient);

  private productsSubject = new BehaviorSubject<Product[]>([]);

  readonly products$ = this.productsSubject.asObservable();

  private selectedCategorySubject = new BehaviorSubject<number>(1);

  readonly selectedCategory$ = this.selectedCategorySubject.asObservable();

  private loader_Service = inject(loaderService);

  // function to get product by id, with intial value for offers for ngonit.
  getProductsByCategorieId(cId: number = 1) {
    let params = new HttpParams().set('category_id', cId);
    // intial value for offers
    return this.http_Client.get<Product[]>(this.apiUrl, { params }).pipe(
      catchError((error) => {
        if (error.status === 404) {
          return of([]);
        }
        throw error;
      })
    );
  }
  loadProducts() {
    this.loader_Service.startLoading();

    return this.getProductsByCategorieId(
      this.selectedCategorySubject.value
    ).pipe(
      delay(1000),
      tap((products) => {
        this.productsSubject.next(products);
      }),
      finalize(() => {
        this.loader_Service.stopLoading();
      })
    );
  }
  setSelectCategorySubject(cId: number) {
    this.selectedCategorySubject.next(cId);
  }
}
