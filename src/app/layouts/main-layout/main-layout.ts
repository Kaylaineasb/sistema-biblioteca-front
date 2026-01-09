import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  template: `
    <div class="app-container">
      <header class="app-header">
        <div class="logo">Meu Sistema</div>
        <div class="user-info">
          <span>Olá, {{ authService.currentUser()?.name }}</span>
          <button (click)="logout()" class="btn-logout">Sair</button>
        </div>
      </header>

      <div class="content-wrapper">
        <aside class="sidebar">
          <nav>
            <ul>
              <li>Dashboard</li>
              <li>Clientes</li>
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

  logout() {
    this.authService.logout();
  }
}