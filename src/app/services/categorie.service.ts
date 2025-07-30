import { inject, Injectable } from '@angular/core';
import { Category } from '../interfaces/categorie.interface';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CategorieService {
  private readonly apiUrl = 'http://localhost:3000/categories';
  private CategoriesSubject = new BehaviorSubject<Category[]>([]);
  readonly categories$ = this.CategoriesSubject.asObservable();

  private readonly http_Client = inject(HttpClient);

  getProductCategoires(): Observable<Category[]> {
    return this.http_Client.get<Category[]>(this.apiUrl).pipe(
      catchError((error) => {
        if (error.status === 404) {
          return of([]);
        }
        throw error;
      })
    );
  }
  loadCategories() {
    return this.getProductCategoires().pipe(
      tap((categories) => {
        this.CategoriesSubject.next(categories);
      })
    );
  }
}
