import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { EmprestimoService } from '../../services/emprestimo.service';
import { Emprestimo } from '../../models/emprestimo.interface';

@Component({
  selector: 'app-meus-emprestimos',
  imports: [CommonModule],
  templateUrl: './meus-emprestimos.html',
  styleUrl: './meus-emprestimos.scss',
})
export class MeusEmprestimosComponent implements OnInit{
  private emprestimoService = inject(EmprestimoService);

  meusEmprestimos: Emprestimo[] = [];

  ngOnInit() {
    this.emprestimoService.listarMeusEmprestimos().subscribe({
      next: (dados) => this.meusEmprestimos = dados,
      error: (erro) => console.error("Erro ao buscar meus empréstimos ", erro)
    });
  }

  renovarLivro(id: number){
    if(confirm("Deseja renovar este livro por mais 7 dias?")){
      this.emprestimoService.renovar(id).subscribe({
        next: () => {
          alert('Renovação realizada com sucesso!');
          this.ngOnInit();
        },
        error: (err) => {
          alert("Erro: " + (err || "Não foi possível renovar!"));
        }
      });
    }
  }
}
