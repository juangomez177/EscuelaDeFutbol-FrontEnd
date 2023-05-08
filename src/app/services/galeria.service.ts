//Importaciones necesarias para aplicar el servicio

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Galeria } from '../models/galeria';
//import { MessageService } from './message.service';

//Métodos para interactuar con el servicio, como conexión al servidor, consulta, eliminación, etc
@Injectable({ providedIn: 'root' })
export class GaleriaService {

  private galeriasUrl = 'api/galerias';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient) { }

  /** GET Galerias from the server */
  getGalerias(): Observable<Galeria[]> {
    return this.http.get<Galeria[]>(this.galeriasUrl)
      .pipe(
        tap(_ => this.log('fetched Galerias')),
        catchError(this.handleError<Galeria[]>('getGalerias', []))
      );
  }

  /** GET Galeria by id. Return `undefined` when id not found */
  getGaleriaNo404<Data>(id: number): Observable<Galeria> {
    const url = `${this.galeriasUrl}/?id=${id}`;
    return this.http.get<Galeria[]>(url)
      .pipe(
        map(Galerias => Galerias[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? 'fetched' : 'did not find';
          this.log(`${outcome} Galeria id=${id}`);
        }),
        catchError(this.handleError<Galeria>(`getGaleria id=${id}`))
      );
  }

  /** GET Galeria by id. Will 404 if id not found */
  getGaleria(id: number): Observable<Galeria> {
    const url = `${this.galeriasUrl}/${id}`;
    return this.http.get<Galeria>(url).pipe(
      tap(_ => this.log(`fetched Galeria id=${id}`)),
      catchError(this.handleError<Galeria>(`getGaleria id=${id}`))
    );
  }

  /* GET Galerias whose name contains search term */
  searchGalerias(term: string): Observable<Galeria[]> {
    if (!term.trim()) {
      // if not search term, return empty Galeria array.
      return of([]);
    }
    return this.http.get<Galeria[]>(`${this.galeriasUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found Galerias matching "${term}"`) :
         this.log(`no Galerias matching "${term}"`)),
      catchError(this.handleError<Galeria[]>('searchGalerias', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new Galeria to the server */
  addGaleria(Galeria: Galeria): Observable<Galeria> {
    return this.http.post<Galeria>(this.galeriasUrl, Galeria, this.httpOptions).pipe(
      tap((newEquipo: Galeria) => this.log(`added Galeria w/ id=${newEquipo.id}`)),
      catchError(this.handleError<Galeria>('addGaleria'))
    );
  }

  /** DELETE: delete the Galeria from the server */
  deleteGaleria(id: number): Observable<Galeria> {
    const url = `${this.galeriasUrl}/${id}`;

    return this.http.delete<Galeria>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted Galeria id=${id}`)),
      catchError(this.handleError<Galeria>('deleteGaleria'))
    );
  }

  /** PUT: update the Galeria on the server */
  updateGaleria(Galeria: Galeria): Observable<any> {
    return this.http.put(this.galeriasUrl, Galeria, this.httpOptions).pipe(
      tap(_ => this.log(`updated Galeria id=${Galeria.id}`)),
      catchError(this.handleError<any>('updateGaleria'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

    /** Log a EquipoService message with the MessageService */
    private log(message: string) {
      console.log(message);
    }


  
}