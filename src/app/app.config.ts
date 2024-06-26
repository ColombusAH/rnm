import { ApplicationConfig, importProvidersFrom, InjectionToken, LOCALE_ID, Signal, signal, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { routes } from './app.routes';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { tokenInterceptor } from './core/interceptors';
import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';
import localHe from '@angular/common/locales/he';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { provideServiceWorker } from '@angular/service-worker';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export const DIRECTION_TOKEN = new InjectionToken<string>('BodyDirection');
//better name for this function is
export function BodyDirection(translateService: TranslateService) {
  registerLocaleData(localeEn);
  registerLocaleData(localHe);
  const prefLang = localStorage.getItem('lang') || 'he';
  const direction = signal('');
  translateService.onLangChange.subscribe((event) => {
    if (event.lang === 'he') {
      document.body.dir = 'rtl';
      localStorage.setItem('lang', 'he');
      direction.update(() => 'rtl');
    } else {
      document.body.dir = 'ltr';
      localStorage.setItem('lang', 'en');
      direction.update(() => 'ltr');
    }
  });
  translateService.use(prefLang);
  return direction.asReadonly();
}


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(withInterceptors([tokenInterceptor])), provideAnimations(), importProvidersFrom(TranslateModule.forRoot({
        defaultLanguage: 'he',
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    }), ToastModule), MessageService, { provide: DIRECTION_TOKEN, useFactory: BodyDirection, deps: [TranslateService] },
    {
        provide: LOCALE_ID,
        useFactory: () => {
            const lang = localStorage.getItem('lang') || 'he';
            return lang === 'he' ? 'he-IL' : 'en-US';
        }
    }, provideServiceWorker('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000'
    })],

};
