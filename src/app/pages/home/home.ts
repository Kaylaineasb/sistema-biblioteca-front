import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { LivroService } from '../../services/livro.service';
import { Livro } from '../../models/livro.interface';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent implements OnInit{
  protected authService = inject(AuthService);
  private http = inject(HttpClient);
  private router = inject(Router);
  private livroService = inject(LivroService);
  isAdmin = false;

  livros: Livro[] = [];
  
  ngOnInit(){
      this.isAdmin = this.authService.isAdmin();
      this.carregarLivros();
  }

  carregarLivros(){
    this.livroService.listar().subscribe({
      next: (dados) => {
        this.livros = dados;
        console.log('Livros carregados com sucesso: ', dados);
      },
      error : (err) => {
        console.log("Erro ao carregar livros: ",err);
      }
    })
  }

  deletarLivro(id:number){
    if(confirm('Tem certeza que deseja remover esse livro?')){
      this.livroService.deletar(id).subscribe({
        next: () => {
          this.livros = this.livros.filter(l => l.livNrId !== id);
          alert("Livro removido!");
        },
        error: () => alert("Erro ao remover livro.") 
      });
    }
  }
}
