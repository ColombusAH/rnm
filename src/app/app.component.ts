import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { DIRECTION_TOKEN } from './app.config';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  bodyDirection = inject(DIRECTION_TOKEN);
  title = 'rnm';

  isCollapsed = true;
}
