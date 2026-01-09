import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser = signal<{name: string; email: string; token?: string} | null>(null);

  constructor(private router: Router) {
    const savedUser = localStorage.getItem('user');
    if(savedUser){
      try{
        this.currentUser.set(JSON.parse(savedUser));
      }catch(e){
        this.logout();
      }
    }
  }

  login(credentials: any){
    const user ={name: 'Kay', email: credentials.email, 
        token: 'eyJhGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.fake-token-12345'};
    console.log('Login com: ', credentials);
    localStorage.setItem('user',JSON.stringify(user));
    this.currentUser.set(user);
    this.router.navigate(['/home']);
  }

  register(data: any){
    const user = {
        name: data.name, 
        email: data.email,
        token: 'eyJhGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.fake-token-register'
    };
    console.log('Cadastro: ', data);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUser.set(user);
    this.router.navigate(['/app/home']);
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUser.set(null);
    this.router.navigate(['/login'])
  }

  requestPasswordReset(email: string){
    console.log('Solicitando reset para: ', email);
    return of(true).pipe(delay(1500));
  }
}
