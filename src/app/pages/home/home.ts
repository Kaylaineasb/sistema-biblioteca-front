import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [ CommonModule ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent implements OnInit{
  protected authService = inject(AuthService);
  private http = inject(HttpClient);
  private router = inject(Router);
  
  ngOnInit(){
      this.http.get('http://localhost:8080/usuarios').subscribe({
    next: (dados) => console.log('DADOS PROTEGIDOS RECEBIDOS:', dados),
    error: (erro) => console.error('ERRO DE ACESSO:', erro)
  });
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
