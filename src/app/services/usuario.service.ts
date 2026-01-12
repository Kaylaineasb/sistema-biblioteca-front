import { HttpClient } from "@angular/common/http";
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

    listar(): Observable<Usuario[]>{
        return this.http.get<Usuario[]>(this.apiUrl);
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