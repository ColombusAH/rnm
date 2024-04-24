import { Routes } from '@angular/router';
import { authGuard, noAuthGuard } from './core/guards';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
        canActivate: [authGuard]
    },
    {
        path: 'clients',
        loadComponent: () => import('./pages/clients/clients.component').then(m => m.ClientsComponent),
        canActivate: [authGuard]
    },
    {
        path: 'events',
        loadComponent: () => import('./pages/events/events.component').then(m => m.EventsComponent),
        canActivate: [authGuard]
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/auth/auth.component').then(m => m.AuthComponent),
        canActivate: [noAuthGuard]
    },
    {
        path: 'register',
        loadComponent: () => import('./pages/auth/auth.component').then(m => m.AuthComponent),
        canActivate: [noAuthGuard]
    }
];
