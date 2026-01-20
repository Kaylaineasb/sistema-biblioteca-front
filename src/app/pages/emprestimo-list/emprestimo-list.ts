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

  ngOnInit() {
    this.carregarEmprestimos();
  }

  carregarEmprestimos(){
    this.emprestimoService.listar().subscribe({
      next: (dados) =>{
        this.emprestimos = dados;
        console.log(dados);
      },
      error: (erro) => console.error(erro)
    });
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
          const msg = err || "Não foi possível renovar!";
          this.toastService.error(msg)
        }
      });
    }
  }
}
