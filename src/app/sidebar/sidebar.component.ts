import { Component, inject } from '@angular/core';
import { LayoutService } from '../core/services/layout.service';
import { NgClass, NgIf } from '@angular/common';
import { ClickOutsideDirective } from '../directives/click-outside.directive';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgIf,NgClass,ClickOutsideDirective, RouterModule, TranslateModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  layoutService = inject(LayoutService);
  isCollapsed = this.layoutService.isSidebarCollapsed;
  currentBodyDirection = this.layoutService.currentBodyDirection;

  toggleSidebar() {
      this.layoutService.toggleSidebar(); 
  }
}
