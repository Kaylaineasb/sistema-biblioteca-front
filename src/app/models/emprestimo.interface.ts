import { Livro } from "./livro.interface";
import { Usuario } from "./usuario.interface";

export interface Emprestimo{
    empNrId?: number;
    usuNr: Usuario;
    livNr: Livro;
    empDtEmprestimo: string;
    empDtDevolucaoPrevista: string;
    empDtDevolucaoReal?: string;
    empTxStatus: 'ATIVO' | 'DEVOLVIDO' | 'ATRASADO '
}

export interface EmprestimoDTO {
    idUsuario: number;
    idLivro: number;
}