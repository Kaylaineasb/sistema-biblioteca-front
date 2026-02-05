import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { EmprestimoService } from '../../services/emprestimo.service';
import { Emprestimo } from '../../models/emprestimo.interface';
import { CustomAlertService } from '../../services/custom-alert.service';
import { ToastService } from '../../services/toast.service';
import { BtnPrimary } from '../../components/btn-primary/btn-primary';

@Component({
  selector: 'app-meus-emprestimos',
  imports: [CommonModule, BtnPrimary],
  templateUrl: './meus-emprestimos.html',
  styleUrl: './meus-emprestimos.scss',
})
export class MeusEmprestimosComponent implements OnInit{
  private emprestimoService = inject(EmprestimoService);
  private alertService = inject(CustomAlertService);
  private toastService = inject(ToastService);

  meusEmprestimos: Emprestimo[] = [];

  page = 0;
  size = 6;
  totalElements = 0;
  isLoading = false;

  ngOnInit() {
    this.carregarDados();
  }

  carregarDados() {
    this.isLoading = true;
    
    this.emprestimoService.listarMeusEmprestimos(this.page, this.size).subscribe({
      next: (dados) => {
        if (dados.content) {
          this.meusEmprestimos = dados.content;
          this.totalElements = dados.totalElements;
        } else if (Array.isArray(dados)) {
          this.meusEmprestimos = dados;
          this.totalElements = dados.length;
        }
        this.isLoading = false;
      },
      error: (erro) => {
        console.error("Erro ao buscar meus empréstimos ", erro);
        this.isLoading = false;
      }
    });
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
      this.carregarDados();
    }
  }

  proximaPagina() {
    if (!this.isLastPage) {
      this.page++;
      this.carregarDados();
    }
  }

  async renovarLivro(id: number){
    const confirmou = await this.alertService.confirm(
      'Renovação',
      'Deseja renovar este livro por mais 7 dias?',
      'warning'
    )
    if(confirmou){
      this.emprestimoService.renovar(id).subscribe({
        next: () => {
          this.toastService.sucess("Renovação realizada com sucesso!");
          this.ngOnInit();
        },
        error: (err) => {
          const msg = err || "Não foi possível renovar!";
          this.toastService.error(msg)
        }
      });
    }
  }
}
