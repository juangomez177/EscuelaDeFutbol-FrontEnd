//Importaciones necesarias para aplicar el servicio

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Login } from '../models/login';
//import { MessageService } from './message.service';

//Métodos para interactuar con el servicio, como conexión al servidor, consulta, eliminación, etc
@Injectable({ providedIn: 'root' })
export class LoginService {

  private loginUrl = 'api/login';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient) { }

  /** GET login from the server */
  getlogin(): Observable<Login[]> {
    return this.http.get<Login[]>(this.loginUrl)
      .pipe(
        tap(_ => this.log('fetched login')),
        catchError(this.handleError<Login[]>('getlogin', []))
      );
  }


  //Necesito un medoto para retornar los login por el id_equipo

  /** GET Login by id. Return `undefined` when id not found */
  getLoginNo404<Data>(id: number): Observable<Login> {
    const url = `${this.loginUrl}/?id=${id}`;
    return this.http.get<Login[]>(url)
      .pipe(
        map(login => login[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? 'fetched' : 'did not find';
          this.log(`${outcome} Login id=${id}`);
        }),
        catchError(this.handleError<Login>(`getLogin id=${id}`))
      );
  }

  /** GET Login by id. Will 404 if id not found */
  getLogin(id: number): Observable<Login> {
    const url = `${this.loginUrl}/${id}`;
    return this.http.get<Login>(url).pipe(
      tap(_ => this.log(`fetched Login id=${id}`)),
      catchError(this.handleError<Login>(`getLogin id=${id}`))
    );
  }

  /* GET login whose name contains search term */
  searchlogin(term: string): Observable<Login[]> {
    if (!term.trim()) {
      // if not search term, return empty Login array.
      return of([]);
    }
    return this.http.get<Login[]>(`${this.loginUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found login matching "${term}"`) :
         this.log(`no login matching "${term}"`)),
      catchError(this.handleError<Login[]>('searchlogin', []))
    );
  }

  //////// Save methods //////////
  
  // /** POST: add a new Login to the server */
  // addLogin(Login: Login): Observable<Login> {
  //   return this.http.post<Login>(this.loginUrl, Login, this.httpOptions).pipe(
  //     tap((newLogin: Login) => this.log(`added Login w/ id=${newLogin.id}`)),
  //     catchError(this.handleError<Login>('addLogin'))
  //   );
  // }

  // /** DELETE: delete the Login from the server */
  // deleteLogin(id: number): Observable<Login> {
  //   const url = `${this.loginUrl}/${id}`;

  //   return this.http.delete<Login>(url, this.httpOptions).pipe(
  //     tap(_ => this.log(`deleted Login id=${id}`)),
  //     catchError(this.handleError<Login>('deleteLogin'))
  //   );
  // }

  // /** PUT: update the Login on the server */
  // updateLogin(Login: Login): Observable<any> {
  //   return this.http.put(this.loginUrl, Login, this.httpOptions).pipe(
  //     tap(_ => this.log(`updated Login id=${Login.id}`)),
  //     catchError(this.handleError<any>('updateLogin'))
  //   );
  // }

  


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

    /** Log a loginervice message with the MessageService */
    private log(message: string) {
      console.log(message);
    }


  
}