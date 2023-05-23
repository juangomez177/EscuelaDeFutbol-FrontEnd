import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

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
      { id: 1, id_equipo: 1, nombre: 'Juan', edad: 25, categoria: 2000, nombre_equipo:'CaliFC', posicion: 'Delantero', n_camiseta:10, telefono: 555-555, correo:'juan@gmail.com'},
      { id: 2, id_equipo: 1, nombre: 'David', edad: 20,  categoria: 2000, nombre_equipo:'CaliFC', posicion: 'Centrocampista', n_camiseta:7, telefono: 555-222, correo:'david@gmail.com'},
      { id: 3, id_equipo: 2, nombre: 'Uber', edad: 26,  categoria: 2017, nombre_equipo:'FCMed', posicion: 'Portero', n_camiseta:1, telefono: 222-555, correo:'uber@gmail.com'}

    ];

    const partidos = [
      { id: 1, id_equipo: 1, estado:'Ganado', goles_favor: 2, goles_contra: 1, faltas_cometidas:2, faltas_recibidas:3,
      fecha:'23/04/23', lugar:'Estadio 1', equipo_rival:"TunjFC"},
      { id: 2, id_equipo: 1, estado:'Perdido', goles_favor: 0, goles_contra: 1, faltas_cometidas:1, faltas_recibidas:0,
      fecha:'12/04/23', lugar:'Estadio 2', equipo_rival:"BucFC"},
      { id: 3, id_equipo: 2, estado:'Empate', goles_favor: 2, goles_contra: 2, faltas_cometidas:4, faltas_recibidas:5,
      fecha:'05/04/23', lugar:'Estadio 3', equipo_rival:"BarrFC"}
    
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

