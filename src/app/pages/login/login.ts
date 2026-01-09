import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { LoginPayload } from '../../models/usuario.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {
  private fb = inject(NonNullableFormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  errorMessage = '';

  protected loginForm = this.fb.group({
    usuTxEmail: ['',[Validators.required, Validators.email]],
    usuTxSenha: ['',[Validators.required, Validators.minLength(6)]]
  });

  onSubmit(){
    this.errorMessage = '';
    if(this.loginForm.valid){
      const credentials = this.loginForm.getRawValue() as LoginPayload;
      this.authService.login(credentials).subscribe({
        next: (response) => {
          console.log('Login com sucesso!', response);
          this.router.navigate(['/app/home']);
        },
        error: (err) => {
          console.error('Erro no login', err);
          this.errorMessage = "Email ou senha inválidos";
        }
      });
    } else{
      this.loginForm.markAllAsTouched();
    }
  }
}
