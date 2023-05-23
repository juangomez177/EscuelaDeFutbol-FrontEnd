import { Component, OnInit  } from '@angular/core';

import { Equipo } from '../../models/equipo';
import { EquipoService } from '../../services/equipo.service';

import { Jugador } from '../../models/jugador';
import { JugadorService } from '../../services/jugador.service';

import { Router } from '@angular/router';
@Component({
  selector: 'app-jugador-u',
  templateUrl: './jugador-u.component.html',
  styleUrls: ['./jugador-u.component.css']
})
export class JugadorUComponent implements OnInit  {

  jugadores: Jugador[] = [];
  equipos: Equipo[] = [];
  jugadorSeleccionado: Jugador | undefined;
  equipoSeleccionado: any= {}; 

  lista = true;
  form = false;
  editForm = false;

  constructor(

    /* private location: Location,*/
    private jugadorService: JugadorService,
    private equipoService: EquipoService,
     /*private router: Router*/
   

  ) {}
  ngOnInit(): void {
    this.getJugadores();
    this.getEquipos();

   /* Necesito poder verificar si la petición viene de gestionar equipos, si es así debo inicializar
  
    equipoSeleccionado con los datos del equpo en cuestión.

    Si la petición viene directamente del menú de opciones de jugador, entonces equipoSeleccionado se deja nulo.*/
  }

  getJugadores(): void {
    this.jugadorService.getJugadores().subscribe(jugadores => this.jugadores = jugadores);
  }

  getEquipos(): void {
    this.equipoService.getEquipos().subscribe(equipos => this.equipos = equipos);
  }

  visualizarJugador(jugador: Jugador): void {

    //Copia el jugador
    this.jugadorSeleccionado = Object.assign({}, jugador);

  }
}
