import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  protected footer = {
    copyright: '© 2025 Bazooka. All Rights Reserved',
    links: [
      'Usage conditions',
      'Terms and conditions',
      'Privacy policy',
      'Jobs applications',
      'Contact us',
      'Bazooka franchise',
    ],
  };
}
