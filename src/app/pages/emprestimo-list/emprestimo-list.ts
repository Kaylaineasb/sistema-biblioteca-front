import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EmprestimoService } from '../../services/emprestimo.service';
import { Emprestimo } from '../../models/emprestimo.interface';

@Component({
  selector: 'app-emprestimo-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './emprestimo-list.html',
  styleUrl: './emprestimo-list.scss',
})
export class EmprestimoList implements OnInit{
  private emprestimoService = inject(EmprestimoService);

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

  realizarDevolucao(id:number){
    if(confirm('Confirmar devolução deste livro?')){
      this.emprestimoService.devolver(id).subscribe({
        next: () =>{
          alert('Livro devolvido com sucesso!');
          this.carregarEmprestimos();
        },
        error: () => alert("Erro ao registrar devolução.")
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
