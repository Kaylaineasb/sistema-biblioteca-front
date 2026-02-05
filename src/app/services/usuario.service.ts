import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { Observable } from "rxjs";
import { Usuario } from "../models/usuario.interface";

@Injectable({
    providedIn: 'root'
})

export class UsuarioService{
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/usuarios`;

    listar(page: number, size: number, query: string = ''): Observable<any> {
    const params = new HttpParams()
        .set('page', page.toString())
        .set('size', size.toString())
        .set('q', query);

    return this.http.get<any>(this.apiUrl, { params });
    }

    buscarPorId(id: number): Observable<Usuario>{
        return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
    }

    editar(id:number, usuario:Usuario):Observable<Usuario>{
        return this.http.put<Usuario>(`${this.apiUrl}/${id}`,usuario);
    }

    deletar(id: number): Observable<void>{
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}