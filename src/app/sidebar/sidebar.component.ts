import { Component, inject } from '@angular/core';
import { LayoutService } from '../core/services/layout.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgIf],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  isCollapsed = inject(LayoutService).isSidebarCollapsed;
}
