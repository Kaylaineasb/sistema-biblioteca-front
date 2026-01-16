import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Perfil, Usuario } from '../../models/usuario.interface';
import { RouterLink } from '@angular/router';
import { CustomAlertService } from '../../services/custom-alert.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-cliente-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './cliente-list.html',
  styleUrl: './cliente-list.scss',
})
export class ClienteList implements OnInit{
  private usuarioService = inject(UsuarioService);
  private alertService = inject(CustomAlertService);
  private toastService = inject(ToastService);
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

  async deletarCliente(id: number){
    const confirmou = await this.alertService.confirm(
      "Excluir usuário",
      "Tem certeza que deseja remover este usuário permanentemente?",
      "danger"
    )
    if(confirmou){
      this.usuarioService.deletar(id).subscribe({
        next: () => {
          this.clientes = this.clientes.filter(c=> c.usuNrId !==id);
          this.toastService.sucess("Usuário removido com sucesso!");
        },
        error: () => {
          this.toastService.sucess("Erro ao remover o usuário.");
        }
      });
    }
  }
}
