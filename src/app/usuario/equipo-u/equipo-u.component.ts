import { Component, OnInit  } from '@angular/core';

import { Equipo } from '../../models/equipo';
import { EquipoService } from '../../services/equipo.service';

import { Jugador } from '../../models/jugador';
import { JugadorService } from '../../services/jugador.service';

import { Partido } from '../../models/partido';
import { PartidoService } from '../../services/partido.service';

import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-equipo-u',
  templateUrl: './equipo-u.component.html',
  styleUrls: ['./equipo-u.component.css']
})
export class EquipoUComponent implements OnInit {
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
    private partidoService: PartidoService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit(): void {
      this.getEquipos();




      /*
      const id = this.route.snapshot.paramMap.get('id');
      
      if (!id) {
        this.lista = true;
        
        this.editForm = false;
      } else {
        const equipo = this.equipos.find(e => e.id === +id);
        if (equipo) {
          this.equipoSeleccionado = equipo;
          this.editForm = true;
          this.lista = false;
        } else {
          this.router.navigate(['/administrador/equipo']);
          this.editForm = false;
          this.lista = true;
        }
      }

      */
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

    detallesEquipo(equipo: Equipo): void {
      //Copia el equipo
      this.equipoSeleccionado = Object.assign({}, equipo);
  
      //Busca a los jugadores con equipo
      this.getJugadoresEquipo(this.equipoSeleccionado.id);
  
      //Busca a los partidos con equipo
      this.getpartidosEquipo(this.equipoSeleccionado.id);
  
    }
  
    detallesPartido(partido: Partido): void {
  
      //Copia el partido
      this.partidoSeleccionado = Object.assign({}, partido);
  
      //Busca a los partidos con equipo
      this.getpartidosEquipo(this.partidoSeleccionado.id);
    }



}
