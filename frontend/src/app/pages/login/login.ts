import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  cargando = false;
  errorMensaje = '';
  mostrarPass = false;

  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private router: Router
  ) {}
  
  ngOnInit(): void {

  this.loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(3)]]
  });

  if (this.authService.estaAutenticado()) {
    this.router.navigate(['/usuarios']);
  }
}

  get f() {
    return this.loginForm ? this.loginForm.controls : {};
  }
  
  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.cargando = true;
    this.errorMensaje = '';

    this.authService.login(this.f['username'].value, this.f['password'].value)
    .subscribe({
      next: () => {
        this.router.navigate(['/usuarios']);
      },
      error: (err) => {
        this.cargando = false;
        this.errorMensaje = err.error.message || 'Error al iniciar sesión';
      }
    });
  }
    togglemostrarPass(): void {
      this.mostrarPass = !this.mostrarPass;
    }
}

