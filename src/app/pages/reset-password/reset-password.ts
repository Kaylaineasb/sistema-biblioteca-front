import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BtnPrimary } from '../../components/btn-primary/btn-primary';
import { AuthService } from '../../services/auth';
import { passwordMatchValidator } from '../../utils/passwordMatchValidator';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-reset-password',
  imports: [ CommonModule, ReactiveFormsModule, RouterLink, BtnPrimary],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.scss',
})
export class ResetPasswordComponent implements OnInit{
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);

  token = '';
  isLoading = false;
  errorMessage = '';

  resetForm = this.fb.group({
    usuTxSenha: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required]
  },{ validators: passwordMatchValidator });

  ngOnInit() {
    this.route.queryParams.subscribe(params =>{
      this.token = params['token'];
      if(!this.token){
        this.errorMessage = 'Link inválido ou incompleto.';
        this.resetForm.disable();
      }
    })
  }

  onSubmit(){
    if(this.resetForm.valid && this.token){
      this.isLoading = true;
      this.errorMessage = '';

      const novaSenha = this.resetForm.get('usuTxSenha')?.value!;

      this.authService.redefinirSenha(this.token, novaSenha).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/login']);
          this.toastService.sucess("Senha redefinida!");
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = 'Erro ao redefinir. O link pode ter expirado.';
        }
      })
    }else{
      this.resetForm.markAllAsTouched();
    }
  }
}
