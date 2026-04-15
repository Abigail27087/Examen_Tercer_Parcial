import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  templateUrl: './register.html',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class RegistroComponent {

  usuario = {
    nombre: '',
    email: '',
    password: ''
  };

  cargando = false;
  errorMensaje = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onRegister() {

    if (!this.usuario.nombre || !this.usuario.email || !this.usuario.password) {
      this.errorMensaje = 'Todos los campos son obligatorios';
      return;
    }

    this.cargando = true;
    this.errorMensaje = '';

    this.authService.registro(this.usuario).subscribe({

      next: () => {
        this.router.navigate(['/login']);
      },

      error: (err) => {
        this.cargando = false;
        this.errorMensaje =
          err?.error?.message || 'Error al registrar usuario';
      }

    });

  }

  irALogin() {
    this.router.navigate(['/login']);
  }

}