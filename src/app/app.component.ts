import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { TranslateModule } from '@ngx-translate/core';
import { DIRECTION_TOKEN } from './app.config';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HttpClient } from '@angular/common/http';
import { remult } from 'remult'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent,TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  bodyDirection = inject(DIRECTION_TOKEN);
    httpClient = inject(HttpClient);
  title = 'rnm';

  isCollapsed = true;

  constructor() {
    remult.apiClient.httpClient = this.httpClient;
  }
}
