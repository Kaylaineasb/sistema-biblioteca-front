import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth';
import { RouterLink } from '@angular/router';
import { LivroService } from '../../services/livro.service';
import { Livro } from '../../models/livro.interface';
import { DashboardDTO } from '../../models/dashboardDTO';
import { DashboardService } from '../../services/dashboard.service';
import { CustomAlertService } from '../../services/custom-alert.service';
import { ToastService } from '../../services/toast.service';
import { SearchInput } from '../../components/search-input/search-input';
import { BtnPrimary } from '../../components/btn-primary/btn-primary';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, SearchInput, BtnPrimary],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent implements OnInit {
  protected authService = inject(AuthService);
  private livroService = inject(LivroService);
  private dashboardService = inject(DashboardService);
  private alertService = inject(CustomAlertService);
  private toastService = inject(ToastService);

  isAdmin = false;
  dashboardData: DashboardDTO | null = null;

  livros: Livro[] = [];
  page = 0;
  size = 8;
  searchQuery = '';
  totalElements = 0;
  isLoading = false;
  
  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
    this.carregarLivros();

    if (this.authService.isAdmin()) {
      this.dashboardService.getDashboard().subscribe({
        next: (dados) => this.dashboardData = dados,
        error: (e) => console.error('Erro dashboard', e)
      });
    }
  }

  carregarLivros() {
    this.isLoading = true;

    this.livroService.listar(this.page, this.size, this.searchQuery).subscribe({
      next: (dados) => {
        this.livros = dados.content;
        this.totalElements = dados.totalElements;
        this.isLoading = false;
        window.scrollTo({ top: 0, behavior: 'smooth' }); 
      },
      error: (err) => {
        console.error("Erro ao carregar livros: ", err);
        this.isLoading = false;
      }
    });
  }

  filtrarLivros(texto: string) {
    this.searchQuery = texto;
    this.page = 0;
    this.carregarLivros();
  }

  get totalPages(): number {
    return Math.ceil(this.totalElements / this.size);
  }

  get isFirstPage(): boolean {
    return this.page === 0;
  }

  get isLastPage(): boolean {
    return (this.page + 1) >= this.totalPages;
  }

  paginaAnterior() {
    if (!this.isFirstPage) {
      this.page--;
      this.carregarLivros();
    }
  }

  proximaPagina() {
    if (!this.isLastPage) {
      this.page++;
      this.carregarLivros();
    }
  }

  async deletarLivro(id: number) {
    const confirmou = await this.alertService.confirm(
      'Excluir Livro', 
      'Tem certeza que deseja remover este livro permanentemente?',
      'danger' 
    );

    if (confirmou) {
      this.livroService.deletar(id).subscribe({
        next: () => {
          this.toastService.sucess("Livro removido!");
          this.carregarLivros(); 
        },
        error: () => this.toastService.error("Erro ao remover livro.") 
      });
    }
  }
}