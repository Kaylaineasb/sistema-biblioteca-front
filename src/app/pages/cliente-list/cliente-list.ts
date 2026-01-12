import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Perfil, Usuario } from '../../models/usuario.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cliente-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './cliente-list.html',
  styleUrl: './cliente-list.scss',
})
export class ClienteList implements OnInit{
  private usuarioService = inject(UsuarioService);
  protected readonly Perfil = Perfil;

  clientes: Usuario[] = [];

  ngOnInit(): void {
    this.carregarClientes();
  }

  carregarClientes(){
    this.usuarioService.listar().subscribe({
      next: (dados) => {
        this.clientes = dados;
      },
      error: (erro) => {
        console.error('Erro ao listar clientes ', erro);
      }
    })
  }

  deletarCliente(id: number){
    if(confirm('Tem certeza que deseja remover esse usuário?')){
      this.usuarioService.deletar(id).subscribe({
        next: () => {
          this.clientes = this.clientes.filter(c=> c.usuNrId !==id);
          alert('Usuário removido!');
        },
        error: () => alert('Erro ao remover o usuário.')
      });
    }
  }
}
