import { Component, inject } from '@angular/core';
import { LayoutService } from '../core/services/layout.service';

import { RouterModule } from '@angular/router';
import { ToggleLangComponent } from '../components/toggle-lang/toggle-lang.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ToggleLangComponent, RouterModule, TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  layoutService = inject(LayoutService);
  translateService = inject(TranslateService);

  isLoggedIn = inject(AuthService).isLoggedIn
  currentLang = this.translateService.currentLang;



  toggleSidebar() {
    this.layoutService.toggleSidebar();
  }

  toggleLang() {
    const currentLang = this.translateService.currentLang;
    const targetLang = currentLang === 'en' ? 'he' : 'en';
    this.translateService.use(targetLang);
    this.currentLang = targetLang

  }
}
