import { ResolveFn, Routes } from '@angular/router';
import { authGuard, noAuthGuard } from './core/guards';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { inject } from '@angular/core';

// a function that return a resolve function
const resolveTitleFactory = (title: string) => {
    return () => {
        const translate = inject(TranslateService);
        return translate.get(title);
    };
}


export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        title: resolveTitleFactory('NAVIGATION_LINKS.HOME'),
        loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
        canActivate: [authGuard]
    },
    {
        path: 'clients',
        title: resolveTitleFactory('NAVIGATION_LINKS.CLIENTS'),
        loadComponent: () => import('./pages/clients/clients.component').then(m => m.ClientsComponent),
        canActivate: [authGuard]
    },
    {
        path: 'events',
        title: resolveTitleFactory('NAVIGATION_LINKS.EVENTS'),
        loadComponent: () => import('./pages/events/events.component').then(m => m.EventsComponent),
        canActivate: [authGuard]
    },
    {
        path: 'leads',
        title: resolveTitleFactory('NAVIGATION_LINKS.LEADS'),
        loadComponent: () => import('./pages/leads/leads.component').then(m => m.LeadsComponent),
        canActivate: [authGuard]
    },
    {
        path: 'login',
        title: resolveTitleFactory('NAVIGATION_LINKS.LOGIN'),
        loadComponent: () => import('./pages/auth/auth.component').then(m => m.AuthComponent),
        canActivate: [noAuthGuard]
    },
    {
        path: 'register',
        title: resolveTitleFactory('NAVIGATION_LINKS.REGISTER'),
        loadComponent: () => import('./pages/auth/auth.component').then(m => m.AuthComponent),
        canActivate: [noAuthGuard]
    }
];
