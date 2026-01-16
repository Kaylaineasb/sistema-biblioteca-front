import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { LivroService } from '../../services/livro.service';
import { Livro } from '../../models/livro.interface';
import { DashboardDTO } from '../../models/dashboardDTO';
import { DashboardService } from '../../services/dashboard.service';
import { CustomAlertService } from '../../services/custom-alert.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent implements OnInit{
  protected authService = inject(AuthService);
  private livroService = inject(LivroService);
  private dashboardService = inject(DashboardService);
  private alertService = inject(CustomAlertService);
  private toastService = inject(ToastService);

  isAdmin = false;

  livros: Livro[] = [];
  livrosFiltrados: Livro[] = [];

  dashboardData: DashboardDTO | null = null;
  
  ngOnInit(){
      this.isAdmin = this.authService.isAdmin();
      this.carregarLivros();
      if (this.authService.isAdmin()) {
      this.dashboardService.getDashboard().subscribe({
        next: (dados) => this.dashboardData = dados,
        error: (e) => console.error('Erro dashboard', e)
      });
    }
  }

  carregarLivros(){
    this.livroService.listar().subscribe({
      next: (dados) => {
        this.livros = dados;
        this.livrosFiltrados = dados;
        console.log('Livros carregados com sucesso: ', dados);
      },
      error : (err) => {
        console.log("Erro ao carregar livros: ",err);
      }
    })
  }

  async deletarLivro(id:number){
    const confirmou = await this.alertService.confirm(
      'Excluir Livro', 
      'Tem certeza que deseja remover este livro permanentemente?',
      'danger' 
    );
    if(confirmou){
      this.livroService.deletar(id).subscribe({
        next: () => {
          this.livros = this.livros.filter(l => l.livNrId !== id);
          this.toastService.sucess("Livro removido!");
        },
        error: () => this.toastService.error("Erro ao remover livro.") 
      });
    }
  }

  filtrarLivros(event: Event){
    const texto = (event.target as HTMLInputElement).value.toLocaleLowerCase();

    if(!texto){
      this.livrosFiltrados = this.livros;
      return;
    }

    this.livrosFiltrados = this.livros.filter(livro => 
      livro.livTxTitulo.toLocaleLowerCase().includes(texto) ||
      livro.livTxAutor.toLocaleLowerCase().includes(texto) ||
      livro.livTxIsbn.includes(texto)
    )
  }
}
