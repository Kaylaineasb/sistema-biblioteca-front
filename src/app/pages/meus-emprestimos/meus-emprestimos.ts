import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { EmprestimoService } from '../../services/emprestimo.service';
import { Emprestimo } from '../../models/emprestimo.interface';
import { CustomAlertService } from '../../services/custom-alert.service';

@Component({
  selector: 'app-meus-emprestimos',
  imports: [CommonModule],
  templateUrl: './meus-emprestimos.html',
  styleUrl: './meus-emprestimos.scss',
})
export class MeusEmprestimosComponent implements OnInit{
  private emprestimoService = inject(EmprestimoService);
  private alertService = inject(CustomAlertService);

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
        next: async() => {
          await this.alertService.confirm('Sucesso!', 'Renovação realizada com sucesso!','sucess');
          this.ngOnInit();
        },
        error: async (err) => {
          const msg = err || "Não foi possível renovar!";
          await this.alertService.confirm('Erro',msg,'danger');
        }
      });
    }
  }
}
