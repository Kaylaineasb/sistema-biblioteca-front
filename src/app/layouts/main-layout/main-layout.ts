import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLinkWithHref, RouterLinkActive],
  template: `
    <div class="app-container">
      <header class="app-header">
        <div class="logo">Meu Sistema</div>
        <div class="user-info">
          <span>Olá, {{nomeUsuario}}</span>
          <button (click)="logout()" class="btn-logout">Sair</button>
        </div>
      </header>

      <div class="content-wrapper">
        <aside class="sidebar">
          <nav>
            <ul>
              <li routerLink="/app/home" routerLinkActive="active">
                 Dashboard
              </li>
              @if(isAdmin){
                <li routerLink="/app/emprestimos" routerLinkActive="active">Emprestimos</li>
              }
              @if(isAdmin){
                <li routerLink="/app/clientes" routerLinkActive="active">Clientes</li>
              }
              <li>Configurações</li>
            </ul>
          </nav>
        </aside>

        <main class="main-content">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
  styleUrls: ['./main-layout.scss']
})
export class MainLayoutComponent {
  authService = inject(AuthService);
  router = inject(Router);
  nomeUsuario: string = '';
  isAdmin: boolean = false;

  constructor(){
    this.nomeUsuario = this.authService.getNomeUsuario();
    this.isAdmin = this.authService.isAdmin();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}