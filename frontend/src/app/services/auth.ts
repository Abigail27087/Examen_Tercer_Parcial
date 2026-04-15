import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/auth'; // cambia si tu backend usa otro puerto

  constructor(private http: HttpClient) {}

  // LOGIN
  login(username: string, password: string): Observable<any> {

    return this.http.post<any>(`${this.apiUrl}/login`, {
      username,
      password
    }).pipe(

      tap(res => {
        if (res.token) {
          localStorage.setItem('token', res.token);
        }
      })

    );

  }

  // REGISTRO
  registro(data: any): Observable<any> {

    return this.http.post(`${this.apiUrl}/registro`, data);

  }

  // VERIFICAR SI ESTÁ LOGUEADO
  estaAutenticado(): boolean {

    return !!localStorage.getItem('token');

  }

  // LOGOUT
  logout(): void {

    localStorage.removeItem('token');

  }

  getToken(): string | null {

    return localStorage.getItem('token'); 
  }

  getAuthHeaders(): { [header: string]: string } {

    const token = this.getToken();
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }

  getUsuario(): Observable<any> {

    return this.http.get(`${this.apiUrl}/me`, { headers: this.getAuthHeaders() });  
  }

}