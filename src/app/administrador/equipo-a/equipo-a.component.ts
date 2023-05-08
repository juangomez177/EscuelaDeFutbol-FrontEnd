import { Component, OnInit } from '@angular/core';

import { Equipo } from '../../models/equipo';
import { EquipoService } from '../../services/equipo.service';

import { Jugador } from '../../models/jugador';
import { JugadorService } from '../../services/jugador.service';

import { Partido } from '../../models/partido';
import { PartidoService } from '../../services/partido.service';

@Component({
  selector: 'app-equipo-a',
  templateUrl: './equipo-a.component.html',
  styleUrls: ['./equipo-a.component.css']
})
export class EquipoAComponent implements OnInit {
  equipos: Equipo[] = [];

  equipoSeleccionado: Equipo | undefined;

  partidoSeleccionado: Partido | undefined;

  jugadores: Jugador[] = [];
  partidos: Partido[] = [];

  lista = true;
  form = false;
  editForm = false;

  formP = false;
  editFormP = false;

  constructor(private equipoService: EquipoService, private jugadorService: JugadorService,
    private partidoService: PartidoService) { }

  ngOnInit(): void {
    this.getEquipos();



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
   

    if (!nombre_equipo || !capitan ) { return; }
    this.equipoService.addEquipo({ nombre_equipo, categoria, capitan, entrenador } as unknown as Equipo)
      .subscribe(equipo => {
        this.equipos.push(equipo);
      });
  }

  edit(equipo: Equipo): void {
    this.equipoService.updateEquipo(equipo).subscribe();
    this.getEquipos();
  }

  delete(equipo: Equipo): void {
    this.equipos = this.equipos.filter(h => h !== equipo);
    this.equipoService.deleteEquipo(equipo.id).subscribe();
  }

  //Operaciones básicas para partido:
  addP(id_equipo: number, golesFavor: string, estado: string) {

    const goles_favor = parseInt(golesFavor);

    if (!id_equipo || !goles_favor || !estado) { return; }
    this.partidoService.addPartido({ id_equipo, goles_favor, estado } as unknown as Partido)
      .subscribe(partido => {
        this.partidos.push(partido);
      });
  }

  editP(partido: Partido): void {
    this.partidoService.updatePartido(partido).subscribe();
    //this.getpartidosEquipo(this.equipoSeleccionado.id);
  }

  deleteP(partido: Partido): void {
    this.partidos = this.partidos.filter(h => h !== partido);
    this.partidoService.deletePartido(partido.id).subscribe();
  }


}
