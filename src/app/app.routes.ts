import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { JoinUs } from './auth/join-us/join-us';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // Eagerly loaded: bundled into the main file, available immediately
  { path: 'login', component: Login, title: 'Login | YRA' },
  { path: 'join-us', component: JoinUs, title: 'Join Us | YRA' },

  // Lazy loaded: each page is its own chunk, fetched when needed
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
    title: 'Home | YRA',
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then((m) => m.About),
    title: 'About | YRA',
  },
  {
    path: 'programmes',
    loadComponent: () => import('./pages/programmes/programmes').then((m) => m.Programmes),
    title: 'Programmes | YRA',
  },
  {
    path: 'events',
    loadComponent: () => import('./pages/events/events').then((m) => m.Events),
    title: 'Events | YRA',
  },
  {
    path: 'opportunities',
    loadComponent: () => import('./pages/opportunities/opportunities').then((m) => m.Opportunities),
    title: 'Opportunities | YRA',
  },
  {
    path: 'community',
    loadComponent: () => import('./pages/community/community').then((m) => m.Community),
    title: 'Community | YRA',
  },
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin/admin').then((m) => m.Admin),
    title: 'Admin | YRA',
  },

  // Protected: only authenticated users can open these
  {
    path: 'resources',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/resources/resources').then((m) => m.Resources),
    title: 'Resources | YRA',
  },
  {
    path: 'media',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/media/media').then((m) => m.Media),
    title: 'Media | YRA',
  },

  { path: '**', redirectTo: '' },
];