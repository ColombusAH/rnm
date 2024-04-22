import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  private isSidebarCollapsed$ = signal(true);
  isSidebarCollapsed = this.isSidebarCollapsed$.asReadonly();
  toggleSidebar() {
    this.isSidebarCollapsed$.update( c => !c);
  }
}
