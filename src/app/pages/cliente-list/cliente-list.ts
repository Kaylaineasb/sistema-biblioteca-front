import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Perfil, Usuario } from '../../models/usuario.interface';
import { RouterLink } from '@angular/router';
import { CustomAlertService } from '../../services/custom-alert.service';
import { ToastService } from '../../services/toast.service';
import { SearchInput } from '../../components/search-input/search-input';
import { BtnPrimary } from '../../components/btn-primary/btn-primary';

@Component({
  selector: 'app-cliente-list',
  imports: [CommonModule, RouterLink, SearchInput, BtnPrimary],
  templateUrl: './cliente-list.html',
  styleUrl: './cliente-list.scss',
})
export class ClienteList implements OnInit{
  private usuarioService = inject(UsuarioService);
  private alertService = inject(CustomAlertService);
  private toastService = inject(ToastService);
  protected readonly Perfil = Perfil;

  clientes: Usuario[] = [];
  page = 0;
  size = 10;
  totalElements = 0;
  searchQuery = '';
  isLoading = false;

  ngOnInit(): void {
    this.carregarClientes();
  }

  carregarClientes() {
    this.isLoading = true;

    this.usuarioService.listar(this.page, this.size, this.searchQuery).subscribe({
      next: (dados) => {
        if (dados.content) {
          this.clientes = dados.content;
          this.totalElements = dados.totalElements;
        } else {
          this.clientes = dados;
          this.totalElements = dados.length;
        }
        this.isLoading = false;
      },
      error: (erro) => {
        console.error('Erro ao listar clientes ', erro);
        this.toastService.error('Erro ao carregar clientes.');
        this.isLoading = false;
      }
    });
  }

  filtrarClientes(texto: string) {
    this.searchQuery = texto;
    this.page = 0;
    this.carregarClientes();
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
      this.carregarClientes();
    }
  }

  proximaPagina() {
    if (!this.isLastPage) {
      this.page++;
      this.carregarClientes();
    }
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
          this.toastService.error("Erro ao remover o usuário.");
        }
      });
    }
  }
}
