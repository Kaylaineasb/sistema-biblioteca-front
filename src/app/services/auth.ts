import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { delay, Observable, of, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { LoginPayload, LoginResponse, Usuario } from '../models/usuario.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private apiUrl = environment.apiUrl;

  constructor(private router: Router, private http: HttpClient) { }

  login(dadosLogin: LoginPayload): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`,dadosLogin).pipe(
      tap(resposta => {
        if(resposta.token){
          localStorage.setItem('token',resposta.token);
        }
      })
    )
  }

  register(usuario: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(`${this.apiUrl}/usuarios`,usuario);
  }

  getToken(): string | null{
    return localStorage.getItem('token');
  }

  getNomeUsuario(): string {
  const token = this.getToken();
  if (token) {
    try {
      const payloadBase64Url = token.split('.')[1];
      const base64 = payloadBase64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      const payload = JSON.parse(jsonPayload);
      
      return payload.nome || 'Usuário';
    } catch (e) {
      console.error('Erro ao decodificar token:', e);
      return 'Usuário';
    }
  }
  return '';
}

  isAdmin(): boolean {
    const token = this.getToken();
    if(token){
      const payloadBase64 = token.split('.')[1];
      try{
        const payload = JSON.parse(atob(payloadBase64));
        return payload.perfil === 'ADMIN';
      }catch (e){
        return false;
      }
    }
    return false;
  }

  logout(): void{
    localStorage.removeItem('token');
  }

  estaLogado(): boolean{
    return !!this.getToken();
  }

  esqueciSenha(email: string): Observable<any>{
    return this.http.post(`${this.apiUrl}/auth/forgot-password`,{email});
  }

  redefinirSenha(token: string, senhaNova :string): Observable<any>{
    return this.http.post(`${this.apiUrl}/auth/reset-password`,{
      token: token,
      newPassword: senhaNova
    });
  }
}
