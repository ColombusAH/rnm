import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'clients',
        loadComponent: () => import('./pages/clients/clients.component').then(m => m.ClientsComponent)
    }
];
