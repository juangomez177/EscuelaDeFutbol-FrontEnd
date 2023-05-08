import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
//import { Hero } from './hero';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const equipos = [
      { id: 1, nombre_equipo: 'CaliFC', categoria: '2000', capitan: 'Diego', entrenador: "Tomas" },
      { id: 2, nombre_equipo: 'FCMed', categoria: '2017', capitan: 'Andres' }

    ];

    const jugadores = [
      { id: 1, id_equipo: 1, nombre: 'Juan', edad: 25, nombre_equipo:'CaliFC', posicion: 'Delantero'},
      { id: 2, id_equipo: 1, nombre: 'David', edad: 20, nombre_equipo:'CaliFC', posicion: 'Centrocampista'},
      { id: 3, id_equipo: 2, nombre: 'Uber', edad: 26, nombre_equipo:'FCMed', posicion: 'Portero' }

    ];

    const partidos = [
      { id: 1, id_equipo: 1, goles_favor: 2, goles_contra: 1, estado:'Ganado'},
      { id: 2, id_equipo: 1, goles_favor: 0, goles_contra: 3, estado:'Perdido'},
      { id: 3, id_equipo: 2, goles_favor: 2, goles_contra: 2, estado:'Empate'}
    
    ];

    const galerias = [
      { id: 1, imagen: 'imagen1'},
      { id: 2, imagen: 'imagen2'}

    ];

    const login = [
      { id: 1, usuario: 'andres', correo: 'andres@gmail.com', contraseña: '1234'}
   
    ];

    return {equipos, jugadores, partidos, galerias, login};
  }

  genId<T extends { id: number }>(collection: T[]): number {
    return collection.length > 0 ? Math.max(...collection.map(item => item.id)) + 1 : 1;
  }
}

