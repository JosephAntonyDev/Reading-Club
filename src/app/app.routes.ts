import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent), title: 'Reading Club — Inicio' },
  { path: 'explorar', loadComponent: () => import('./features/explore/explore.component').then(m => m.ExploreComponent), title: 'Explorar Libros — Reading Club' },
  { path: 'libro/:id', loadComponent: () => import('./features/book-detail/book-detail.component').then(m => m.BookDetailComponent), title: 'Detalle de Libro — Reading Club' },
  { path: 'clubs', loadComponent: () => import('./features/clubs/clubs.component').then(m => m.ClubsComponent), title: 'Clubs de Lectura — Reading Club' },
  { path: 'club/:id', loadComponent: () => import('./features/club-detail/club-detail.component').then(m => m.ClubDetailComponent), title: 'Detalle de Club — Reading Club' },
  { path: 'mi-biblioteca', loadComponent: () => import('./features/my-library/my-library.component').then(m => m.MyLibraryComponent), title: 'Mi Biblioteca — Reading Club' },
  { path: 'login', loadComponent: () => import('./features/auth/login.component').then(m => m.LoginComponent), title: 'Iniciar Sesión — Reading Club' },
  { path: 'registro', loadComponent: () => import('./features/auth/register.component').then(m => m.RegisterComponent), title: 'Registrarse — Reading Club' },
  { path: 'ajustes', loadComponent: () => import('./features/settings/settings.component').then(m => m.SettingsComponent), title: 'Ajustes — Reading Club' },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
