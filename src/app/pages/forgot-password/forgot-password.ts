import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { BtnPrimary } from '../../components/btn-primary/btn-primary';

@Component({
  selector: 'app-forgot-password',
  imports: [ CommonModule, ReactiveFormsModule, RouterLink, BtnPrimary],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss',
})
export class ForgotPasswordComponent {
  private fb = inject(NonNullableFormBuilder);
  private authService = inject(AuthService);

  protected emailSent = false;
  protected isLoading = false;
  errorMessage = '';

  protected forgotForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  onSubmit(){
    if(this.forgotForm.valid){
      this.isLoading = true;
      this.errorMessage = '';
    
      const email = this.forgotForm.get('email')!.value;

      this.authService.esqueciSenha(email).subscribe({
        next: () => {
          this.emailSent = true;
          this.isLoading = false;
        },
        error: (error) =>{
          this.isLoading = false;
          if(error.status === 404){
            this.errorMessage = 'Este e-mail não foi encontrado em nossa base.';
          }else{
            this.errorMessage = 'Erro ao enviar. Tente novamente mais tarde.';
          }
        }
      });
    }else{
      this.forgotForm.markAllAsTouched();
    }
  }
}
