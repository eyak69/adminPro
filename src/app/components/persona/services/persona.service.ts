import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Persona, PersonaResponse } from '../interfaces/persona.interface';
import { environment } from 'src/environments/environment';
import { LazyLoadEvent } from 'primeng/api';
import { TipoPersona } from '../interfaces/tipopersona.interface';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private _persona: Persona[] = [];
  private _baseUrl: string = environment.baseUrl;
  private _tipoPersona: TipoPersona[] = [{ id: 1, nombre: 'BANCO' }, { id: 2, nombre: 'CORRESPONSAL' }, { id: 3, nombre: 'EMPRESA' }];

  constructor(private http: HttpClient) { }

  public get persona(): Persona[] {
    return this._persona;
  }
  public set persona(value: Persona[]) {
    this._persona = value;
  }

  borrar(id: number): Observable<Persona> {
    const url: string = `${this._baseUrl}/persona/${id}`;
    return this.http.delete<Persona>(url);
  }

  agregar(persona: Persona): Observable<Persona> {
      console.log(persona);
      return this.http.post<Persona>(`${this._baseUrl}/persona`, persona);
  }

  editar(persona: Persona): Observable<Persona> {
    return this.http.put<Persona>(`${this._baseUrl}/persona/${persona.id}`, persona);
  }
    
  getPersonas(page?: number, pageSize?: number): Observable<Persona[]> {
    const url: string = `${this._baseUrl}/persona?page=${page}&pageSize=${pageSize}`;
    return this.http.get<Persona[]>(url).pipe(
      catchError((error: any) => {
        console.error('Error al buscar personas:', error);
        return of([]);
      })
    );
  }
  
  getPersona(id: number): Observable<Persona | null> {
    const url: string = `${this._baseUrl}/persona/${id}`;
    return this.http.get<Persona>(url).pipe(
      catchError((error: any) => {
        console.error('Error al buscar persona:', error);
        return of(null);
      }
      )
    );
  }

  public get tipoPersona(): TipoPersona[] {
    return this._tipoPersona;
  }

  getPersonasLazy(event?: LazyLoadEvent): Observable<PersonaResponse> {
    const first = event?.first ?? 0;
    const rows = event?.rows ?? 10;
    const page = Math.floor(first / rows) + 1;
    const pageSize = rows;
    const url = `${this._baseUrl}/persona?page=${page}&pageSize=${pageSize}`;

    return this.http.get<PersonaResponse>(url).pipe(
      catchError((error: any) => {
        console.error('Error al buscar persona:', error);
        return of({
          data: [],
          perPage: 0,
          totalRecords: 0,
          next: 0,
          previous: 0
        });
      })
    );
  }
}