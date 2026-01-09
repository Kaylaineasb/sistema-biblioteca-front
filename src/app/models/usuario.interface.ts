export interface Usuario {
    usuNrId?: number;
    usuTxNome: string;
    usuTxEmail: string;
    usuTxSenha?: string;
    usuTxPerfil: Perfil;
    usuDtCadastro?: string;
}

export enum Perfil{
    ADMIN,
    CLIENTE
}

export interface LoginPayload {
  usuTxEmail: string;
  usuTxSenha: string;
}

export interface LoginResponse {
  token: string;
}