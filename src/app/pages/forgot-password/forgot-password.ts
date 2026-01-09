import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-forgot-password',
  imports: [ CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss',
})
export class ForgotPasswordComponent {
  private fb = inject(NonNullableFormBuilder);
  private authService = inject(AuthService);

  protected emailSent = false;
  protected isLoading = false;

  protected forgotForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  onSubmit(){
    if(this.forgotForm.valid){
      this.isLoading = true;
      const { email } = this.forgotForm.getRawValue();

      this.authService.requestPasswordReset(email).subscribe({
        next: () => {
          this.emailSent = true;
          this.isLoading = false;
        },
        error: () =>{
          this.isLoading = false;
        }
      });
    }else{
      this.forgotForm.markAllAsTouched();
    }
  }
}
