import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login';
import { UsuariosComponent } from './pages/usuarios/usuarios';
import { RegistroComponent } from './pages/auth/register/register';
import { AuthGuard } from './guards/auth-guard';

export const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },

  { path: 'registro', component: RegistroComponent },

  {
    path: 'usuarios',
    component: UsuariosComponent,
    canActivate: [AuthGuard]
  },

  { path: '**', redirectTo: 'login' }
  
];