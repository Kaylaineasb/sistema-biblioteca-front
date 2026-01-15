export interface Livro {
  livNrId?: number;
  livTxTitulo: string;
  livTxAutor: string;
  livTxIsbn: string;
  livDtPublicacao?: string;
  disponivel?: boolean;
}