import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Livro } from '../models/livro.interface';
import { environment } from '../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class LivroService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/livros`; 

  listar(): Observable<Livro[]> {
    return this.http.get<Livro[]>(this.apiUrl);
  }

  cadastrar(livro: Livro): Observable<Livro> {
    return this.http.post<Livro>(this.apiUrl, livro);
  }

  buscarPorId(id:number): Observable<Livro>{
    return this.http.get<Livro>(`${this.apiUrl}/${id}`);
  }

  deletar(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  editar(id: number, livro: Livro): Observable<Livro>{
    return this.http.put<Livro>(`${this.apiUrl}/${id}`,livro);
  }
}