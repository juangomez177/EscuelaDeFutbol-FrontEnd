import { Component, OnInit } from '@angular/core';

import { Location } from '@angular/common';

import { Equipo } from '../../models/equipo';
import { EquipoService } from '../../services/equipo.service';

import { Jugador } from '../../models/jugador';
import { JugadorService } from '../../services/jugador.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-jugador-a',
  templateUrl: './jugador-a.component.html',
  styleUrls: ['./jugador-a.component.css']
})
export class JugadorAComponent implements OnInit {

  

  jugadores: Jugador[] = [];
  equipos: Equipo[] = [];
  jugadorSeleccionado: Jugador | undefined;
  equipoSeleccionado: any;

  lista = true;
  form = false;
  editForm = false;

  constructor(

    private location: Location,
    private jugadorService: JugadorService,
    private equipoService: EquipoService,
    private router: Router
   

  ) {}

  ngOnInit(): void {
    this.getJugadores();
    this.getEquipos();
  
    
  }
  navigateToEdit(id: number) {
    
    this.router.navigate(['/administrador/jugador/', id]);

  
  }

  navigateToBack() {
    this.router.navigate(['/administrador/jugador/']);
  }



  getJugadores(): void {
    this.jugadorService.getJugadores().subscribe(jugadores => this.jugadores = jugadores);
  }

  
  getEquipos(): void {
    this.equipoService.getEquipos().subscribe(equipos => this.equipos = equipos);
  }

  goBack(): void {
    this.location.back();
  }

  editarJugador(jugador: Jugador): void {

    //Copia el jugador
    this.jugadorSeleccionado = Object.assign({}, jugador);

  }

    //Operaciones básicas para jugador
    add(id_equipo: number, nombre: string, edad: string, nombre_equipo: string, posicion: string): void {
   
      if (!id_equipo|| !nombre || !edad || !nombre_equipo || !posicion) { return; }
      this.jugadorService.addJugador({ id_equipo, nombre, edad, nombre_equipo, posicion } as unknown as Jugador)
        .subscribe(jugador => {
          this.jugadores.push(jugador);
        });
        this.getJugadores();

    }


    edit(jugador: Jugador): void {
      this.jugadorService.updateJugador(jugador).subscribe();
      this.getJugadores();
    }
  
    delete(jugador: Jugador): void {
      this.jugadores = this.jugadores.filter(h => h !== jugador);
      this.jugadorService.deleteJugador(jugador.id).subscribe();
    }





}
