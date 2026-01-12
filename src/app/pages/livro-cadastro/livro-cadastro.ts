import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LivroService } from '../../services/livro.service';
import { Livro } from '../../models/livro.interface';

@Component({
  selector: 'app-livro-cadastro',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './livro-cadastro.html',
  styleUrl: './livro-cadastro.scss',
})
export class LivroCadastroComponent implements OnInit{
  private fb = inject(NonNullableFormBuilder);
  private livroService = inject(LivroService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  idEdicao: number | null = null;

  formLivro = this.fb.group({
    livTxTitulo: ['', [Validators.required]],
    livTxAutor: ['',[Validators.required]],
    livTxIsbn: ['', [Validators.required]],
    livDtPublicacao: ['']
  });

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.idEdicao = Number(id);
      this.carregarDadosLivro(this.idEdicao);
    }
  }

  carregarDadosLivro(id: number) {
    this.livroService.buscarPorId(id).subscribe(livro => {
      this.formLivro.patchValue({
        livTxTitulo: livro.livTxTitulo,
        livTxAutor: livro.livTxAutor,
        livTxIsbn: livro.livTxIsbn,
        livDtPublicacao: livro.livDtPublicacao
      });
    });
  }

  onSubmit(){
    if(this.formLivro.valid){
      const novoLivro = this.formLivro.getRawValue() as Livro;
      if (this.idEdicao) {
        this.livroService.editar(this.idEdicao, novoLivro).subscribe({
          next: () => {
            alert('Livro atualizado!');
            this.router.navigate(['/app/home']);
          },
          error: () => alert('Erro ao atualizar.')
        });
      } else {
        this.livroService.cadastrar(novoLivro).subscribe({
          next: () => {
            alert('Livro cadastrado com sucesso!');
            this.router.navigate(['/app/home']);
          },
          error: (err) => {
            console.log(err);
            alert("Erro ao cadastrar. Verifique se o ISBN já existe.");
          }
        });
      }
    }
  }
}
