import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { passwordMatchValidator } from '../../utils/passwordMatchValidator';
import { Usuario } from '../../models/usuario.interface';

@Component({
  selector: 'app-register',
  imports: [ CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class RegisterComponent {
  private fb = inject(NonNullableFormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  errorMessage = '';

  protected registerForm = this.fb.group({
    usuTxNome: ['', [Validators.required, Validators.minLength(3)]],
    usuTxEmail: ['', [ Validators.required, Validators.email]],
    usuTxSenha:['',[Validators.required,Validators.minLength(6)]],
    confirmPassword:['',[Validators.required]],
    usuTxPerfil: ['CLIENTE']
  },{validators: passwordMatchValidator});

  onSubmit(){
    this.errorMessage = '';
    if(this.registerForm.valid){
      const formValue = this.registerForm.getRawValue();
      const {confirmPassword, ...usuarioLimpo} = formValue;

      const novoUsuario = usuarioLimpo as unknown as Usuario;
      
      this.authService.register(novoUsuario).subscribe({
        next: (resp) => {
          console.log('Cadastrado com sucesso! ',resp);
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Erro ao cadastrar', err);
          this.errorMessage = "Erro ao criar conta. Tente outro email.";
        }
      });
    }else{
      this.registerForm.markAllAsTouched();
    }
  }
}
