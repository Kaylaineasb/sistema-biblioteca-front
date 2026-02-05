import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EmprestimoService } from '../../services/emprestimo.service';
import { LivroService } from '../../services/livro.service';
import { UsuarioService } from '../../services/usuario.service';

import { Livro } from '../../models/livro.interface';
import { Usuario } from '../../models/usuario.interface';
import { EmprestimoDTO } from '../../models/emprestimo.interface';
import { ToastService } from '../../services/toast.service';
import { BtnPrimary } from '../../components/btn-primary/btn-primary';
import { SearchableSelectComponent } from '../../components/searchable-select/searchable-select';

@Component({
  selector: 'app-emprestimo-cadastro',
  imports: [ CommonModule, ReactiveFormsModule, RouterLink, BtnPrimary, SearchableSelectComponent ],
  templateUrl: './emprestimo-cadastro.html',
  styleUrl: './emprestimo-cadastro.scss',
})
export class EmprestimoCadastroComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  private emprestimoService = inject(EmprestimoService);
  private livroService = inject(LivroService);
  private usuarioService = inject(UsuarioService);
  private toastService = inject(ToastService);

  livros: Livro[] = [];
  livroPage = 0;
  livroSize = 5;
  livroTotal = 0;
  livroTermo = '';
  loadingLivros = false;
  usuarios: Usuario[] = [];

  formEmprestimo: FormGroup = this.fb.group({
    usuario: [null, Validators.required],
    livro: [null, Validators.required]
  });

  ngOnInit() {
    this.carregarLivros();
  }

  getControl(name: string): FormControl {
    return this.formEmprestimo.get(name) as FormControl;
  }

  carregarLivros(page: number = 0) {
    this.livroPage = page;
    this.loadingLivros = true;

    this.livroService.listar(this.livroPage, this.livroSize, this.livroTermo)
      .subscribe({
        next: (response) => {
          this.livros = response.content; 
          this.livroTotal = response.totalElements;
          
          this.loadingLivros = false;
        },
        error: () => this.loadingLivros = false
      });
  }

  onSearchLivros(termo: string) {
    this.livroTermo = termo;
    this.carregarLivros(0);
  }

  onScrollLivros() {
    if (this.livros.length < this.livroTotal) {
      this.livroPage++;
      this.carregarLivros(0);
    }
  }

  onSubmit(){
    if(this.formEmprestimo.valid){
      const dto: EmprestimoDTO = {
        idUsuario: Number(this.formEmprestimo.value.usuario),
        idLivro: Number(this.formEmprestimo.value.livro)
      };

      this.emprestimoService.cadastrar(dto).subscribe({
        next: () => {
          this.toastService.sucess('Emprestimo registrado com sucesso!');
          this.router.navigate(['/app/emprestimos']);
        },
        error: (err) => {
          console.error(err);
          this.toastService.error("Erro ao registrar o empréstimo. Verifique se o livro já não está emprestado.");
        }
      })
    }
  }
}
