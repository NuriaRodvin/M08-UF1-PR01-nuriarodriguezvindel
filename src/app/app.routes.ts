// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';

import { PlayerListPage } from './pages/player-list/player-list.page';
import { FavoritesPage } from './pages/favorites/favorites.page';
import { PlayerDetailPage } from './pages/player-detail/player-detail.page';
import { RegisterPage } from './pages/register/register.page';
import { LoginPage } from './pages/login/login.page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'players',
    pathMatch: 'full'
  },
  {
    path: 'players',
    component: PlayerListPage
  },
  {
    path: 'favorites',
    component: FavoritesPage
  },
  {
    path: 'player-detail',
    component: PlayerDetailPage
  },
  {
    path: 'register',
    component: RegisterPage
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage)
  }
  
];

export const appRouterProviders = [provideRouter(routes)];


