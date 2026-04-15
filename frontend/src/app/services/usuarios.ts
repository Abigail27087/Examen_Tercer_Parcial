import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {

  private apiUrl = `${environment.apiUrl}/usuarios`;

  constructor(
    private http: HttpClient,
    private Auth: AuthService
  ) {}

  // ─── HEADERS con token JWT ────────────────────
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.Auth.getToken()}`
    });
  }

  // ─── VER TODOS ────────────────────────────────
  getAll(): Observable<any> {
    return this.http.get(this.apiUrl, {
      headers: this.getHeaders()
    });
  }

  // ─── VER UNO ──────────────────────────────────
  getOne(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }

  // ─── AGREGAR ──────────────────────────────────
  agregar(datos: any): Observable<any> {
    return this.http.post(this.apiUrl, datos, {
      headers: this.getHeaders()
    });
  }

  // ─── ACTUALIZAR ───────────────────────────────
  actualizar(id: number, datos: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, datos, {
      headers: this.getHeaders()
    });
  }

  // ─── ELIMINAR ───────────────────────────────
  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }

  getUsuario(): Observable<any> {
    return this.http.get(`${this.apiUrl}/me`, {
      headers: this.getHeaders()
    });
  }
}