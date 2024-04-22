import { Component, inject } from '@angular/core';
import { LayoutService } from '../core/services/layout.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  layoutService = inject(LayoutService);
  isLoggedIn = false;

  toggleSidebar() {
    this.layoutService.toggleSidebar();
  }
}
