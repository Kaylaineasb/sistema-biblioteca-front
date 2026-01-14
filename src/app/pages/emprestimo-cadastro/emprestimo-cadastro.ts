import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EmprestimoService } from '../../services/emprestimo.service';
import { LivroService } from '../../services/livro.service';
import { UsuarioService } from '../../services/usuario.service';

import { Livro } from '../../models/livro.interface';
import { Usuario } from '../../models/usuario.interface';
import { EmprestimoDTO } from '../../models/emprestimo.interface';

@Component({
  selector: 'app-emprestimo-cadastro',
  imports: [ CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './emprestimo-cadastro.html',
  styleUrl: './emprestimo-cadastro.scss',
})
export class EmprestimoCadastroComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private emprestimoService = inject(EmprestimoService);
  private livroService = inject(LivroService);
  private usuarioService = inject(UsuarioService);

  livros: Livro[] = [];
  usuarios: Usuario[] = [];

  formEmprestimo: FormGroup = this.fb.group({
    usuario: [null, Validators.required],
    livro: [null, Validators.required]
  });

  ngOnInit() {
    this.carregarDados();
  }

  carregarDados(){
    this.livroService.listar().subscribe({
      next: (dado) => this.livros = dado,
      error: (e) => console.error("Erro ao buscar livros ", e)
    });

    this.usuarioService.listar().subscribe({
      next: (dado) =>  this.usuarios = dado,
      error: (e) => console.error("Erro ao buscar usuários ", e)
    });
  }

  onSubmit(){
    if(this.formEmprestimo.valid){
      const dto: EmprestimoDTO = {
        idUsuario: Number(this.formEmprestimo.value.usuario),
        idLivro: Number(this.formEmprestimo.value.livro)
      };

      this.emprestimoService.cadastrar(dto).subscribe({
        next: () => {
          alert('Emprestimo registrado com sucesso!');
          this.router.navigate(['/app/emprestimos']);
        },
        error: (err) => {
          console.error(err);
          alert("Erro ao registrar o empréstimo. Verifique se o livro já não está emprestado.");
        }
      })
    }
  }
}
