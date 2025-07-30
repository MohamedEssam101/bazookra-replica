import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  Observable,
  of,
  Subject,
  takeUntil,
} from 'rxjs';
import { bannerApiResponse } from '../interfaces/banner.interface';

@Injectable({
  providedIn: 'root',
})
export class BannerService {
  constructor() {}

  private readonly http_Client = inject(HttpClient);
  private readonly ApiUrl = 'http://localhost:3000/banners';

  private bannerSubject = new BehaviorSubject<bannerApiResponse[] | null>(null);

  readonly banner$ = this.bannerSubject.asObservable();

  getBanners(lang: string): Observable<bannerApiResponse[] | null> {
    return this.http_Client
      .get<bannerApiResponse[]>(`${this.ApiUrl}?language=${lang}`)
      .pipe(
        catchError((error) => {
          if (error.status === 404) {
            return of(null);
          }
          throw error;
        })
      );
  }
  loadBanners(lang: string = 'en'): void {
    this.getBanners(lang).subscribe((response) => {
      if (response) {
        console.log(response);
        this.bannerSubject.next(response);
      } else {
        this.bannerSubject.next(null);
      }
    });
  }
}
