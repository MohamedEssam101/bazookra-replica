import { Component, Input, ViewChild } from '@angular/core';
import { Drawer, DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass'; // Add this import

@Component({
  selector: 'app-sidebar',
  imports: [DrawerModule, ButtonModule, Ripple, StyleClassModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  @ViewChild('drawerRef') drawerRef!: Drawer;

  @Input() visible: boolean = false;
  closeCallback(e: any): void {
    this.drawerRef.close(e);
  }
}
