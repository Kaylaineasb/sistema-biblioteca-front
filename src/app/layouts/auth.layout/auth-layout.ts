import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="auth-wrapper">
      <div class="auth-box">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styleUrls: ['./auth-layout.scss']
})
export class AuthLayoutComponent {}