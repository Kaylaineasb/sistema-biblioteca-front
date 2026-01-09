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

  logout(): void{
    localStorage.removeItem('token');
  }

  estaLogado(): boolean{
    return !!this.getToken();
  }

  requestPasswordReset(email: string){
    console.log('Solicitando reset para: ', email);
    return of(true).pipe(delay(1500));
  }
}
