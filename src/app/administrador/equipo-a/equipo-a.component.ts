import { Component, OnInit } from '@angular/core';

import { Equipo } from '../../models/equipo';
import { EquipoService } from '../../services/equipo.service';

import { Jugador } from '../../models/jugador';
import { JugadorService } from '../../services/jugador.service';

import { Partido } from '../../models/partido';
import { PartidoService } from '../../services/partido.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-equipo-a',
  templateUrl: './equipo-a.component.html',
  styleUrls: ['./equipo-a.component.css']
})
export class EquipoAComponent implements OnInit {
  equipos: Equipo[] = [];

  equipoSeleccionado: Equipo | undefined;

  equipo: any

  partidoSeleccionado: Partido | undefined;

  jugadores: Jugador[] = [];
  partidos: Partido[] = [];

  lista = true;
  form = false;
  editForm = false;

  formP = false;
  editFormP = false;

  constructor(private equipoService: EquipoService, private jugadorService: JugadorService,
    private partidoService: PartidoService, private router: Router) { }


  ngOnInit(): void {
    this.getEquipos();
  }

  /* 
 ngOnInit(): void {
   this.getEquipos();
   if (this.router.is(['/administrador/equipo/'){
     this.lista = true;
     this.form = false;
     this.editForm = false;

     this.formP = false;
     this.editFormP = false;
     this.getEquipos();

   }

   //    /administrador/equipo/id'
   else if (this.router.is(['/administrador/equipo/'){

     this.equipoService.getEquipo(this.number).subscribe(equipo => this.equipo = equipo);
     if (this.equipo != null) {
       this.router.navigate(['/administrador/equipo/', equipo.id]);
       this.editForm = true;
       this.lista = false;

     } else {

       this.router.navigate(['/administrador/equipo/');
       this.editForm = false;
       this.lista = true;
     }
   }
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


  getEquipos(): void {
    this.equipoService.getEquipos().subscribe(equipos => this.equipos = equipos);
  }

  getPartidos(): void {
    this.partidoService.getPartidos().subscribe(partidos => this.partidos = partidos);
  }

  getJugadoresEquipo(idEquipo: number): void {

    this.jugadorService.getJugadoresEquipo(idEquipo)
      .subscribe(jugadores => this.jugadores = jugadores);

  }

  getpartidosEquipo(idEquipo: number): void {

    this.partidoService.getPartidosEquipo(idEquipo)
      .subscribe(partidos => this.partidos = partidos);

  }

  editarEquipo(equipo: Equipo): void {
    //Copia el equipo
    this.equipoSeleccionado = Object.assign({}, equipo);

    //Busca a los jugadores con equipo
    this.getJugadoresEquipo(this.equipoSeleccionado.id);

    //Busca a los partidos con equipo
    this.getpartidosEquipo(this.equipoSeleccionado.id);

  }

  editarPartido(partido: Partido): void {

    //Copia el partido
    this.partidoSeleccionado = Object.assign({}, partido);

    //Busca a los partidos con equipo
    this.getpartidosEquipo(this.partidoSeleccionado.id);
  }

  /*

  imagenUrl: string;
  onFileSelected(event) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imagenUrl = reader.result as string;
      };
    }
  }
  */


  //Operaciones básicas para equipo
  add(nombre_equipo: string, categoria: string, capitan: string, entrenador: string,): void {
    nombre_equipo = nombre_equipo.trim();
    categoria = categoria.trim();
    capitan = capitan.trim();
    entrenador = entrenador.trim();

    if (!nombre_equipo || !categoria || !capitan || !entrenador) {

      this.mostrarSweetAlertError();

      return;
    }
    this.equipoService.addEquipo({ nombre_equipo, categoria, capitan, entrenador } as unknown as Equipo)
      .subscribe(equipo => {
        this.equipos.push(equipo);
      });
    this.mostrarSweetAlert();
  }

  edit(equipo: Equipo): void {

    this.equipoService.updateEquipo(equipo).subscribe();
    this.getEquipos();
    this.mostrarSweetAlert();
  }

  delete(equipo: Equipo): void {
    this.mostrarSweetAlertConfirm().then((result) => {
      if (result.isConfirmed) {
        this.equipos = this.equipos.filter(h => h !== equipo);
        this.equipoService.deleteEquipo(equipo.id).subscribe();
        this.mostrarSweetAlert();

      }
    });
  }

  //Operaciones básicas para partido:
  addP(id_equipo: number, estado: string, goles_favor: string, goles_contra: string, faltas_cometidas: string, faltas_recibidas: string,
    fecha: string, lugar: string, equipo_rival: string) {

    if (!id_equipo || !estado || !goles_favor || !goles_contra || !faltas_cometidas || !faltas_recibidas
      || !fecha || !lugar || !equipo_rival) {
      this.mostrarSweetAlertError();
      return;
    }
    this.partidoService.addPartido({
      id_equipo, estado, goles_favor, goles_contra, faltas_cometidas, faltas_recibidas,
      fecha, lugar, equipo_rival
    } as unknown as Partido)
      .subscribe(partido => {
        this.partidos.push(partido);
      });
    this.mostrarSweetAlert();
  }

  editP(partido: Partido): void {
    this.partidoService.updatePartido(partido).subscribe();
    //this.getpartidosEquipo(this.equipoSeleccionado.id);
    this.mostrarSweetAlert();
  }

  deleteP(partido: Partido): void {
    this.mostrarSweetAlertConfirm().then((result) => {
      if (result.isConfirmed) {

        this.partidos = this.partidos.filter(h => h !== partido);
        this.partidoService.deletePartido(partido.id).subscribe();
        this.mostrarSweetAlert();

      }
    });
  }
}
