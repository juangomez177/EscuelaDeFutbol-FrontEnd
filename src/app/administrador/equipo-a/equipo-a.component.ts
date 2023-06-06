import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Equipo } from '../../models/equipo';
import { EquipoService } from '../../services/equipo.service';
import { Jugador } from '../../models/jugador';
import { JugadorService } from '../../services/jugador.service';
import { Partido } from '../../models/partido';
import { PartidoService } from '../../services/partido.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-equipo-a',
  templateUrl: './equipo-a.component.html',
  styleUrls: ['./equipo-a.component.css'],
})
export class EquipoAComponent implements OnInit {
  equipos: Equipo[] = [];
  jugadores: Jugador[] = [];
  partidos: Partido[] = [];

  equipoSeleccionado: any = {};
  equipo: any = {};
  partidoSeleccionado: any = {};
  partido: any = {};
  
  lista = true;
  form = false;
  editForm = false;
  formP = false;
  editFormP = false;

  constructor(
    private equipoService: EquipoService,
    private jugadorService: JugadorService,
    private partidoService: PartidoService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getEquipos();

    //Rutas para EQUIPO
    if (this.router.url.startsWith('/administrador/equipo')) {
      const id = this.route.snapshot.paramMap.get('id');

      // Si el ID está vacío, navegar a la ruta principal
      if (!id) {
        this.router.navigate(['/administrador/equipo']);
      }

      // Para crear un nuevo equipo
      else if (this.router.url.startsWith('/administrador/equipo/nuevo')) {
        this.lista = false;
        this.form = true;
      }

      //Para verificar un equipo existente y establecer la ruta 
      else {
        const id2 = parseInt(id);
        this.equipoService.getEquipo(id2).subscribe((equipo) => {
          // Si no hay un equipo correspondiente al ID, navegar a la ruta principal
          if (!equipo) {
            this.router.navigate(['/administrador/equipo']);

            //Abra el formulario del equipo
          } else {
            this.editarEquipo(equipo);

            this.lista = false;
            this.editForm = true;
          }
        });
      }
    }

    /*
    Ruta partidos (No es necesario)
    */
  }

  //Sweet alerts
  mostrarSweetAlert(): void {
    Swal.fire({
      icon: 'success',
      title: 'EXITO',
      text: '¡Exito en la transacción!',
      confirmButtonText: 'Aceptar',
    });
  }

  mostrarSweetAlert2(): void {
    Swal.fire({
      icon: 'success',
      title: 'EXITO',
      text: '¡Datos Limpiados!',
      confirmButtonText: 'Aceptar',
    });
  }

  mostrarSweetAlertError(): void {
    Swal.fire({
      icon: 'error',
      title: 'ERROR',
      text: '¡Campos obligatorios!',
      confirmButtonText: 'Aceptar',
    });
  }

  mostrarSweetAlertConfirm(): Promise<any> {
    return new Promise((resolve) => {
      Swal.fire({
        title: '¿Está seguro que desea eliminar?',
        text: 'No podrá revertir esta acción',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        resolve(result);
      });
    });
  }

  //Métodos GET
  getEquipos(): void {
    this.equipoService
      .getEquipos()
      .subscribe((equipos) => (this.equipos = equipos));
  }

  getPartidos(): void {
    this.partidoService
      .getPartidos()
      .subscribe((partidos) => (this.partidos = partidos));
  }

  getJugadoresEquipo(idEquipo: number): void {
    this.jugadorService
      .getJugadoresEquipo(idEquipo)
      .subscribe((jugadores) => (this.jugadores = jugadores));
  }

  getPartidosEquipo(idEquipo: number): void {
    this.partidoService
      .getPartidosEquipo(idEquipo)
      .subscribe((partidos) => (this.partidos = partidos));
  }

  //Métodos EDIT
  editarEquipo(equipo: Equipo): void {
    //Copia el equipo
    this.equipoSeleccionado = Object.assign({}, equipo);

    //Busca a los jugadores con equipo
    this.getJugadoresEquipo(this.equipoSeleccionado.id);

    //Busca a los partidos con equipo
    this.getPartidosEquipo(this.equipoSeleccionado.id);

    //Actualizar url
    this.router.navigate(['/administrador/equipo', this.equipoSeleccionado.id]);
  }

  editarPartido(partido: Partido): void {
    //Copia el partido
    this.partidoSeleccionado = Object.assign({}, partido);

    //Busca a los partidos con equipo
    this.getPartidosEquipo(this.partidoSeleccionado.id);
  }

  //Operaciones básicas para equipo
  add(
    nombre_equipo: string,
    categoria: string,
    capitan: string,
    entrenador: string
  ): void {
    nombre_equipo = nombre_equipo.trim();
    categoria = categoria.trim();
    capitan = capitan.trim();
    entrenador = entrenador.trim();

    if (!nombre_equipo || !categoria || !capitan || !entrenador) {
      this.mostrarSweetAlertError();

      return;
    }
    this.equipoService
      .addEquipo({
        nombre_equipo,
        categoria,
        capitan,
        entrenador,
      } as unknown as Equipo)
      .subscribe((equipo) => {
        this.equipos.push(equipo);
      });
    

    this.getEquipos();
    this.mostrarSweetAlert();

    this.lista = true;
    this.form = false

    //Actualizar url
    this.volver();
  }

  edit(equipo: Equipo): void {
    this.equipoService.updateEquipo(equipo).subscribe();
    this.getEquipos();
    this.mostrarSweetAlert();

    //Actualizar url
    this.volver();
  }

  delete(equipo: Equipo): void {
    this.mostrarSweetAlertConfirm().then((result) => {
      if (result.isConfirmed) {
        //Cuando se elimina un equipo, debemos de asegurarnos de elimiar los partidos y jugadores asociados
        this.getJugadoresEquipo(equipo.id); // Obtener jugadores del equipo
        this.getPartidosEquipo(equipo.id); // Obtener partidos del equipo

        //Eliminar jugadores
        this.jugadores.forEach((jugador) => {
          this.jugadorService.deleteJugador(jugador.id).subscribe();
        });

        //Eliminar partidos
        this.partidos.forEach((partido) => {
          this.partidoService.deletePartido(partido.id).subscribe();
        });

        //Finalmente Eliminar equipo
        this.equipos = this.equipos.filter((h) => h !== equipo);
        this.equipoService.deleteEquipo(equipo.id).subscribe();
        this.mostrarSweetAlert();
      }
    });
  }

  //Operaciones básicas para partido
  addP(
    id_equipo: number,
    estado: string,
    goles_favor: string,
    goles_contra: string,
    faltas_cometidas: string,
    faltas_recibidas: string,
    fecha: string,
    lugar: string,
    equipo_rival: string
  ) {
    if (
      !id_equipo ||
      !estado ||
      !goles_favor ||
      !goles_contra ||
      !faltas_cometidas ||
      !faltas_recibidas ||
      !fecha ||
      !lugar ||
      !equipo_rival
    ) {
      this.mostrarSweetAlertError();

      return;
    }
    this.partidoService
      .addPartido({
        id_equipo,
        estado,
        goles_favor,
        goles_contra,
        faltas_cometidas,
        faltas_recibidas,
        fecha,
        lugar,
        equipo_rival,
      } as unknown as Partido)
      .subscribe((partido) => {
        this.partidos.push(partido);
      });

    this.getPartidosEquipo(id_equipo);
    this.mostrarSweetAlert();

    this.editForm = true;
    this.formP = false
  }

  editP(partido: Partido): void {
    this.partidoService.updatePartido(partido).subscribe();
    //this.getPartidosEquipo(this.equipoSeleccionado.id);
    this.mostrarSweetAlert();
  }

  deleteP(partido: Partido): void {
    this.mostrarSweetAlertConfirm().then((result) => {
      if (result.isConfirmed) {
        this.partidos = this.partidos.filter((h) => h !== partido);
        this.partidoService.deletePartido(partido.id).subscribe();
        this.mostrarSweetAlert();
      }
    });
  }

  volver() {
    this.location.back();
  }
}
