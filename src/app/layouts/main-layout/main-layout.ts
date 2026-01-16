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
        <div class="brand">
          <i class="ph ph-book-open-text logo-icon"></i>
          <span class="logo-text">Biblio<span class="highlight">Tech</span></span>
        </div>
       <div class="user-info">
          <div class="user-avatar">
            {{ nomeUsuario.charAt(0).toUpperCase() }}
          </div>
          <span class="user-name">{{nomeUsuario}}</span>
          <button (click)="logout()" class="btn-logout" title="Sair">
            <i class="ph ph-sign-out"></i>
          </button>
        </div>
      </header>

      <div class="content-wrapper">
        <aside class="sidebar">
          <nav>
            <ul class="nav-list">
              <li>
                <a routerLink="/app/home" routerLinkActive="active" class="nav-link">
                  <i class="ph ph-books"></i>
                  <span>Acervo de Livros</span>
                </a>
              </li>
              @if (isAdmin) {
                <li class="section-title">Administração</li>
                <li>
                  <a routerLink="/app/emprestimos" routerLinkActive="active" class="nav-link">
                    <i class="ph ph-arrows-left-right"></i>
                    <span>Empréstimos</span>
                  </a>
                </li>
                <li>
                  <a routerLink="/app/clientes" routerLinkActive="active" class="nav-link">
                    <i class="ph ph-users"></i>
                    <span>Usuários</span>
                  </a>
                </li>
              }
              <li class="section-title">Minha Área</li>
              <li>
                <a routerLink="/app/meus-emprestimos" routerLinkActive="active" class="nav-link">
                  <i class="ph ph-bookmark-simple"></i>
                  <span>Meus Empréstimos</span>
                </a>
              </li>
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