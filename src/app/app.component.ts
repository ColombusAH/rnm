import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { TranslateModule } from '@ngx-translate/core';
import { DIRECTION_TOKEN } from './app.config';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HttpClient } from '@angular/common/http';
import { remult } from 'remult'
import { LayoutService } from './core/services/layout.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent,TranslateModule,ToastModule],
  // providers: [MessageService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  bodyDirection = inject(DIRECTION_TOKEN);
  httpClient = inject(HttpClient);
  layoutService = inject(LayoutService);
  title = 'rnm';

  isCollapsed = this.layoutService.isSidebarCollapsed;

  constructor() {
    remult.apiClient.httpClient = this.httpClient;
  }

  collapseSidebar() {
    this.layoutService.collapseSidebar();
  }
}
