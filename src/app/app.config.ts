import { ApplicationConfig, importProvidersFrom, InjectionToken } from '@angular/core';
import { provideRouter } from '@angular/router';
import {provideAnimations} from '@angular/platform-browser/animations';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import { routes } from './app.routes';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { tokenInterceptor } from './core/interceptors';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export const DIRECTION_TOKEN = new InjectionToken<string>('BodyDirection');
//better name for this function is
export function BodyDirection(translateService: TranslateService) {
  document.body.dir = 'rtl';
 translateService.onLangChange.subscribe((event) => {
    if (event.lang === 'he') {
      document.body.dir = 'rtl';
    } else {
      document.body.dir = 'ltr';
    }
  })
  translateService.use('he');
}


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),provideHttpClient(withInterceptors([tokenInterceptor])),   provideAnimations(),importProvidersFrom(TranslateModule.forRoot(
    {
      defaultLanguage: 'he',
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  },
  )), {provide: DIRECTION_TOKEN, useFactory: BodyDirection, deps: [TranslateService]},
],
  
}
