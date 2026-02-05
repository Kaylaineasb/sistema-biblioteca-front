import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Emprestimo, EmprestimoDTO } from '../models/emprestimo.interface';

@Injectable({
  providedIn: 'root',
})
export class EmprestimoService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/emprestimos`;

    listar(page: number, size: number): Observable<any> {
      const params = new HttpParams()
        .set('page', page.toString())
        .set('size', size.toString());

      return this.http.get<any>(this.apiUrl, { params });
    }

    cadastrar(dto: EmprestimoDTO): Observable<Emprestimo>{
      return this.http.post<Emprestimo>(this.apiUrl, dto);
    }

    devolver(id: number): Observable<void>{
      return this.http.put<void>(`${this.apiUrl}/${id}/devolucao`,{});
    }

    listarMeusEmprestimos(page: number, size: number): Observable<any> {
      const params = new HttpParams()
        .set('page', page.toString())
        .set('size', size.toString());

      return this.http.get<any>(`${this.apiUrl}/meus-emprestimos`, { params });
    }

    renovar(id: number):Observable<void>{
      return this.http.put<void>(`${this.apiUrl}/${id}/renovacao`,{});
    }
}
