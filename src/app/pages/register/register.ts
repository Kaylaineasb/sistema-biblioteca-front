import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { passwordMatchValidator } from '../../utils/passwordMatchValidator';

@Component({
  selector: 'app-register',
  imports: [ CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class RegisterComponent {
  private fb = inject(NonNullableFormBuilder);
  private authService = inject(AuthService);

  protected registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [ Validators.required, Validators.email]],
    password:['',[Validators.required,Validators.minLength(6)]],
    confirmPassword:['',[Validators.required]]
  },{validators: passwordMatchValidator});

  onSubmit(){
    if(this.registerForm.valid){
      const { confirmPassword, ...dataToSend } = this.registerForm.getRawValue();
      this.authService.register(dataToSend);
    }else{
      this.registerForm.markAllAsTouched();
    }
  }
}
