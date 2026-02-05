import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EmprestimoService } from '../../services/emprestimo.service';
import { Emprestimo } from '../../models/emprestimo.interface';
import { CustomAlertService } from '../../services/custom-alert.service';
import { ToastService } from '../../services/toast.service';
import { BtnPrimary } from '../../components/btn-primary/btn-primary';

@Component({
  selector: 'app-emprestimo-list',
  imports: [CommonModule, RouterLink,BtnPrimary],
  templateUrl: './emprestimo-list.html',
  styleUrl: './emprestimo-list.scss',
})
export class EmprestimoList implements OnInit{
  private emprestimoService = inject(EmprestimoService);
  private alertService = inject(CustomAlertService);
  private toastService =  inject(ToastService);

  emprestimos: Emprestimo[] = [];
  page = 0;
  size = 10; 
  totalElements = 0;
  isLoading = false;

  ngOnInit() {
    this.carregarEmprestimos();
  }

  carregarEmprestimos() {
  this.isLoading = true;

  this.emprestimoService.listar(this.page, this.size).subscribe({
    next: (dados) => {
      // 1. OLHE NO CONSOLE DO NAVEGADOR (F12) O QUE APARECE AQUI
      console.log("Dados vindos do Backend:", dados);

      // 2. VERIFICAÇÃO DE SEGURANÇA
      // Se vier paginado (com .content), usa o content.
      // Se vier lista direta (backend antigo), usa os dados direto.
      if (dados.content) {
        this.emprestimos = dados.content;
        this.totalElements = dados.totalElements;
      } else if (Array.isArray(dados)) {
        console.warn('O Backend retornou uma Lista simples, não uma Página!');
        this.emprestimos = dados;
        this.totalElements = dados.length;
      } else {
        this.emprestimos = [];
      }

      this.isLoading = false;
    },
    error: (erro) => {
      console.error("Erro na requisição:", erro);
      this.isLoading = false;
      this.toastService.error('Erro ao carregar lista de empréstimos.');
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
      this.carregarEmprestimos();
    }
  }

  proximaPagina() {
    if (!this.isLastPage) {
      this.page++;
      this.carregarEmprestimos();
    }
  }

  async realizarDevolucao(id:number){
    const confimou = await this.alertService.confirm(
      'Devolução',
      'Confirmar Devolução?',
      'warning'
    )
    if(confimou){
      this.emprestimoService.devolver(id).subscribe({
        next: () =>{
          this.toastService.sucess('Livro Devolvido com sucesso!');
          this.carregarEmprestimos();
        },
        error: () => {
          this.toastService.error('Erro ao registrar devolução.');
        }
      });
    }
  }

  estaAtrasado(emprestimo: Emprestimo){
    if(emprestimo.empTxStatus !== 'ATIVO') return false;

    const dataPrevista = new Date(emprestimo.empDtDevolucaoPrevista);
    const hoje = new Date();

    hoje.setHours(0,0,0,0);

    return dataPrevista < hoje;
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
          console.error(err);
          const mensagemErro = err.error?.message || err.error || 'Erro ao renovar livro.';
          this.toastService.error(mensagemErro)
        }
      });
    }
  }
}
