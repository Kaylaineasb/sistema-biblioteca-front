import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { passwordMatchValidator } from '../../utils/passwordMatchValidator';
import { Usuario } from '../../models/usuario.interface';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-register',
  imports: [ CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class RegisterComponent implements OnInit{
  private fb = inject(NonNullableFormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private usuarioService = inject(UsuarioService);
  private route = inject(ActivatedRoute);

  errorMessage = '';
  idEdicao: number | null = null;

  protected registerForm = this.fb.group({
    usuTxNome: ['', [Validators.required, Validators.minLength(3)]],
    usuTxEmail: ['', [ Validators.required, Validators.email]],
    usuTxSenha:['',[Validators.required,Validators.minLength(6)]],
    confirmPassword:['',[Validators.required]],
    usuTxPerfil: ['CLIENTE']
  },{validators: passwordMatchValidator});

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.idEdicao = Number(id);
      this.carregarDados(this.idEdicao);
      this.registerForm.get('usuTxSenha')?.clearValidators();
      this.registerForm.get('usuTxSenha')?.updateValueAndValidity();

      this.registerForm.get('confirmPassword')?.clearValidators();
      this.registerForm.get('confirmPassword')?.updateValueAndValidity();
    }
  }

  carregarDados(id: number) {
    this.usuarioService.buscarPorId(id).subscribe(user => {
      this.registerForm.patchValue({
        usuTxNome: user.usuTxNome,
        usuTxEmail: user.usuTxEmail,
        usuTxPerfil: user.usuTxPerfil as any,
      });
    });
  }

  onSubmit(){
    this.errorMessage = '';
    if(this.registerForm.valid){
      const formValue = this.registerForm.getRawValue() as any;
      const {confirmPassword, ...usuarioLimpo} = formValue;

      const novoUsuario = usuarioLimpo as unknown as Usuario;

      if(this.idEdicao){
        this.usuarioService.editar(this.idEdicao,novoUsuario).subscribe({
          next: () => {
            alert('Usuário Atualizado!');
            this.router.navigate(['/app/clientes']);
          },
          error: () => alert('Erro ao atualizar.')
        });
      }else{
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
      }
    }else{
      this.registerForm.markAllAsTouched();
    }
  }
}
