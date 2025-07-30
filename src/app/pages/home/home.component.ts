import { Component, inject, OnInit } from '@angular/core';
import { BannerService } from '../../services/banner.service';
import { TranslateService } from '@ngx-translate/core';
import { AsyncPipe } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [AsyncPipe, CarouselModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private banner_Service = inject(BannerService);
  protected translate_Service = inject(TranslateService);
  banners$ = this.banner_Service.banner$;
  curretLang = this.translate_Service.currentLang;
  ngOnInit(): void {
    console.log(this.curretLang);
    this.banner_Service.loadBanners(this.curretLang);
    console.log(this.banners$.subscribe((res) => console.log(res)));
  }
  navigate() {
    console.log('test');
  }
}
