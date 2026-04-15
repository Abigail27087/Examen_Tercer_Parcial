import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService  } from '../../services/auth';
import { UsuariosService } from '../../services/usuarios';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.html',
  styleUrls: ['./usuarios.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})

export class UsuariosComponent implements OnInit {

  // Lista de usuarios
  usuarios: any[] = [];

  // Estados UI
  cargando = false;
  errorMsg = '';
  exitoMsg = '';

  // Modal
  mostrarModal = false;
  modoEdicion = false;
  idEditando = 0;

  // Formulario
  usuarioForm!: FormGroup;

  // Usuario actual
  usuarioActual: any;

  constructor(
    private fb: FormBuilder,
    private Auth: AuthService,
    private usuariosService: UsuariosService
  ) {}

  ngOnInit(): void {
    this.usuarioActual = this.Auth.getUsuario();
    this.initForm();
    this.cargarUsuarios();
  }

  // ─── FORMULARIO ─────────────────────────────
  initForm(): void {
    this.usuarioForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      lduser: [null]
    });
  }

  get f() {
    return this.usuarioForm.controls;
  }

  // ─── CARGAR USUARIOS ────────────────────────
  cargarUsuarios(): void {
    this.cargando = true;

    this.usuariosService.getAll().subscribe({
      next: (res: any) => {
        this.usuarios = res.usuarios || res;
        this.cargando = false;
      },
      error: () => {
        this.errorMsg = 'Error al cargar usuarios';
        this.cargando = false;
      }
    });
  }

  // ─── ABRIR AGREGAR ─────────────────────────
  abrirAgregar(): void {
    this.modoEdicion = false;
    this.usuarioForm.reset();
    this.mostrarModal = true;
    this.errorMsg = '';

    // restaurar validaciones
    this.usuarioForm.get('password')!.setValidators([Validators.required, Validators.minLength(3)]);
    this.usuarioForm.get('password')!.updateValueAndValidity();
  }

  // ─── ABRIR EDITAR ──────────────────────────
  abrirEditar(usuario: any): void {
    this.modoEdicion = true;
    this.idEditando = usuario.id; // ⚠️ ajusta si tu campo es distinto
    this.mostrarModal = true;
    this.errorMsg = '';

    this.usuarioForm.patchValue({
      username: usuario.username,
      password: '',
      lduser: usuario.lduser
    });

    // quitar validación de password en edición
    this.usuarioForm.get('password')!.clearValidators();
    this.usuarioForm.get('password')!.updateValueAndValidity();
  }

  // ─── CERRAR MODAL ──────────────────────────
  cerrarModal(): void {
    this.mostrarModal = false;
    this.usuarioForm.reset();
  }

  // ─── GUARDAR ───────────────────────────────
  guardar(): void {
    if (this.usuarioForm.invalid) {
      this.usuarioForm.markAllAsTouched();
      return;
    }

    let datos = this.usuarioForm.value;
    
    // En modo edición, si password está vacío, no lo enviar
    if (this.modoEdicion && !datos.password) {
      delete datos.password;
    }
    
    this.cargando = true;

    if (this.modoEdicion) {
      // ACTUALIZAR
      this.usuariosService.actualizar(this.idEditando, datos).subscribe({
        next: () => {
          this.exitoMsg = 'Usuario actualizado correctamente';
          this.cerrarModal();
          this.cargarUsuarios();
          this.cargando = false;
          setTimeout(() => this.exitoMsg = '', 3000);
        },
        error: (err: any) => {
          this.errorMsg = err.error?.mensaje || 'Error al actualizar';
          this.cargando = false;
        }
      });

    } else {
      // AGREGAR
      this.usuariosService.agregar(datos).subscribe({
        next: () => {
          this.exitoMsg = 'Usuario agregado correctamente';
          this.cerrarModal();
          this.cargarUsuarios();
          this.cargando = false;
          setTimeout(() => this.exitoMsg = '', 3000);
        },
        error: (err: any) => {
          this.errorMsg = err.error?.mensaje || 'Error al agregar';
          this.cargando = false;
        }
      });
    }
  }

  // ─── LOGOUT ────────────────────────────────
  cerrarSesion(): void {
    this.Auth.logout();
  }
}