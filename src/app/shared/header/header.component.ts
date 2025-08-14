import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Button } from 'primeng/button';
import { TieredMenu, TieredMenuModule } from 'primeng/tieredmenu';
import { authService } from '../../services/auth.service';
import { AsyncPipe } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [TranslateModule, Button, RouterLink, TieredMenuModule, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  protected translate = inject(TranslateService);
  private readonly router = inject(Router);
  private readonly auth_Service = inject(authService);

  protected readonly loggedIn$ = this.auth_Service.loggedIn$;

  protected destroy$ = new Subject<void>();
  @ViewChild(TieredMenu) menu!: TieredMenu;

  changeLanguage() {
    let newLang = '';
    if (this.translate.currentLang === 'ar') {
      newLang = 'en';
    } else {
      newLang = 'ar';
    }

    this.translate.use(newLang);
  }

  ngOnInit(): void {}

  userItems = [
    {
      label: 'Profile',
      command: () => this.router.navigate(['/profile']),
    },
    {
      label: 'logout',
      command: () => this.router.navigate(['/menu']),
    },
  ];

  guestItems = [
    {
      label: 'Login',
      command: () => this.router.navigate(['/login']),
    },
    {
      label: 'Regiser',
      command: () => this.router.navigate(['/register']),
    },
  ];
  protected toggleEvent(event: Event) {
    this.menu.toggle(event);
  }
}
