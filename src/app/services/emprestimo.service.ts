import { HttpClient } from '@angular/common/http';
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

    listar(): Observable<Emprestimo[]>{
      return this.http.get<Emprestimo[]>(this.apiUrl);
    }

    cadastrar(dto: EmprestimoDTO): Observable<Emprestimo>{
      return this.http.post<Emprestimo>(this.apiUrl, dto);
    }

    devolver(id: number): Observable<void>{
      return this.http.put<void>(`${this.apiUrl}/${id}/devolucao`,{});
    }

    listarMeusEmprestimos(): Observable<Emprestimo[]>{
      return this.http.get<Emprestimo[]>(`${this.apiUrl}/meus-emprestimos`);
    }
}
