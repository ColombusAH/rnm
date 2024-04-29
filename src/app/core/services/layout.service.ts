import { inject, Injectable, signal } from '@angular/core';
import { DIRECTION_TOKEN } from '../../app.config';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private isSidebarCollapsed$ = signal(true);
  currentBodyDirection = inject(DIRECTION_TOKEN);
  isSidebarCollapsed = this.isSidebarCollapsed$.asReadonly();
  toggleSidebar() {
    this.isSidebarCollapsed$.update( c => !c);
  }

  collapseSidebar() {
    this.isSidebarCollapsed$.update(() => true);
  }
}
