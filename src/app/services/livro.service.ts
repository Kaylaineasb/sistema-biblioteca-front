import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Livro } from '../models/livro.interface';
import { environment } from '../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class LivroService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/livros`; 

  listar(page: number, size: number, query: string = ''): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('q', query);

    return this.http.get<any>(this.apiUrl, { params });
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