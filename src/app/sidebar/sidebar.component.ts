import { Component, inject } from '@angular/core';
import { LayoutService } from '../core/services/layout.service';
import { NgClass, NgIf } from '@angular/common';
import { ClickOutsideDirective } from '../directives/click-outside.directive';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgIf,NgClass,ClickOutsideDirective, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  layoutService = inject(LayoutService);
  isCollapsed = this.layoutService.isSidebarCollapsed;

  toggleSidebar() {
      this.layoutService.toggleSidebar(); 
  }
}
