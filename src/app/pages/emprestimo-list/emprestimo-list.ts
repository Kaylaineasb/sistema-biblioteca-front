import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EmprestimoService } from '../../services/emprestimo.service';
import { Emprestimo } from '../../models/emprestimo.interface';
import { CustomAlertService } from '../../services/custom-alert.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-emprestimo-list',
  imports: [CommonModule, RouterLink],
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
}
