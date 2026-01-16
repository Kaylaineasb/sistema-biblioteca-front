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

  ngOnInit() {
    this.emprestimoService.listarMeusEmprestimos().subscribe({
      next: (dados) => this.meusEmprestimos = dados,
      error: (erro) => console.error("Erro ao buscar meus empréstimos ", erro)
    });
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
