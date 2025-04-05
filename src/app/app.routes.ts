import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage),
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then(m => m.RegisterPage),
  },
  {
    path: 'players',
    loadComponent: () =>
      import('./pages/player-list/player-list.page').then(m => m.PlayerListPage)
  },
  {
    path: 'player/:id',
    loadComponent: () => import('./pages/player-detail/player-detail.page').then(m => m.PlayerDetailPage),
  },
  {
    path: 'favorites',
    loadComponent: () => import('./pages/favorites/favorites.page').then(m => m.FavoritesPage),
  },
  {
    path: 'player-detail',
    loadComponent: () => import('./pages/player-detail/player-detail.page').then(m => m.PlayerDetailPage),
  }


];

