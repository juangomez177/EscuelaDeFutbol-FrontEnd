import { Component, OnInit } from '@angular/core';

import { Location } from '@angular/common';

import { Equipo } from '../../models/equipo';
import { EquipoService } from '../../services/equipo.service';

import { Jugador } from '../../models/jugador';
import { JugadorService } from '../../services/jugador.service';

import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-jugador-a',
  templateUrl: './jugador-a.component.html',
  styleUrls: ['./jugador-a.component.css']
})
export class JugadorAComponent implements OnInit {

  jugadores: Jugador[] = [];
  equipos: Equipo[] = [];
  jugadorSeleccionado: Jugador | undefined;
  equipoSeleccionado: any= {}; 

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

   /* Necesito poder verificar si la petición viene de gestionar equipos, si es así debo inicializar
  
    equipoSeleccionado con los datos del equpo en cuestión.

    Si la petición viene directamente del menú de opciones de jugador, entonces equipoSeleccionado se deja nulo.*/
  }

  /*

  navigateToEdit(id: number) {
    
    this.router.navigate(['/administrador/jugador/', id]);

  
  }

  navigateToBack() {
    this.router.navigate(['/administrador/jugador/']);
  }

  goBack(): void {
    this.location.back();
  }

*/

  //Sweet alerts
  mostrarSweetAlert(): void {
    Swal.fire({
      icon: 'success',
      title: 'EXITO',
      text: '¡Exito en la transacción!',
      confirmButtonText: 'Aceptar'
    });
  }

  mostrarSweetAlert2(): void {
    Swal.fire({
      icon: 'success',
      title: 'EXITO',
      text: '¡Datos Limpiados!',
      confirmButtonText: 'Aceptar'
    });
  }

  mostrarSweetAlertError(): void {
    Swal.fire({
      icon: 'error',
      title: 'ERROR',
      text: '¡Campos obligatorios!',
      confirmButtonText: 'Aceptar'
    });
  }
  
  mostrarSweetAlertConfirm(): Promise<any> {
    return new Promise((resolve) => {
      Swal.fire({
        title: '¿Está seguro que desea eliminar?',
        text: "No podrá revertir esta acción",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        resolve(result);
      });
    });
  }




  getJugadores(): void {
    this.jugadorService.getJugadores().subscribe(jugadores => this.jugadores = jugadores);
  }

  
  getEquipos(): void {
    this.equipoService.getEquipos().subscribe(equipos => this.equipos = equipos);
  }

  

  editarJugador(jugador: Jugador): void {

    //Copia el jugador
    this.jugadorSeleccionado = Object.assign({}, jugador);

  }

    //Operaciones básicas para jugador
    add(id_equipo: number, nombre: string, edad: string, categoria: string, nombre_equipo: string, posicion: string, n_camiseta: string, telefono: string, correo: string ): void {
  
      if (!id_equipo|| !nombre || !edad || !categoria || !nombre_equipo || !posicion || !n_camiseta || !telefono || !correo) { 
        
        this.mostrarSweetAlertError();
        
        return; }
      this.jugadorService.addJugador({ id_equipo, nombre, edad, categoria, nombre_equipo, posicion, n_camiseta, telefono, correo  } as unknown as Jugador)
        .subscribe(jugador => {
          this.jugadores.push(jugador);
        });

       
        this.getJugadores();
        this.mostrarSweetAlert();

    }


    edit(jugador: Jugador): void {
      this.jugadorService.updateJugador(jugador).subscribe();
      
      this.getJugadores();
      this.mostrarSweetAlert();
      
    }
  
    delete(jugador: Jugador): void {
      this.mostrarSweetAlertConfirm().then((result) => {
        if (result.isConfirmed) {
          

      this.jugadores = this.jugadores.filter(h => h !== jugador);
      this.jugadorService.deleteJugador(jugador.id).subscribe();
      this.mostrarSweetAlert();


    }
  });
}





}
