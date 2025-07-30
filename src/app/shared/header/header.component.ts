import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Button } from 'primeng/button';
import { TieredMenuModule } from 'primeng/tieredmenu';

@Component({
  selector: 'app-header',
  imports: [TranslateModule, Button, RouterLink, TieredMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  protected translate = inject(TranslateService);
  private router = inject(Router);
  changeLanguage() {
    let newLang = '';
    if (this.translate.currentLang === 'ar') {
      newLang = 'en';
    } else {
      newLang = 'ar';
    }

    this.translate.use(newLang);
  }
  profile = [
    {
      label: 'Login',
      command: () => this.router.navigate(['/login']),
    },
    {
      label: 'Regiser',
      command: () => this.router.navigate(['/register']),
    },
  ];
}
