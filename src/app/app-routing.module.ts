import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/*
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
*/

import { LoginAComponent } from './administrador/login-a/login-a.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { EquipoAComponent } from './administrador/equipo-a/equipo-a.component';
import { JugadorAComponent } from './administrador/jugador-a/jugador-a.component';
import { GaleriaAComponent } from './administrador/galeria-a/galeria-a.component';

import { UsuarioComponent } from './usuario/usuario.component';
import { InicioUComponent } from './usuario/inicio-u/inicio-u.component';
import { EquipoUComponent } from './usuario/equipo-u/equipo-u.component';
import { JugadorUComponent } from './usuario/jugador-u/jugador-u.component';
import { GaleriaUComponent } from './usuario/galeria-u/galeria-u.component';

import { AuthGuard } from './auth.guard';

const routes: Routes = [
  /*
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'heroes', component: HeroesComponent },
  */

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginAComponent },

  { path: 'administrador', component: AdministradorComponent, canActivate: [AuthGuard],
    children: [
      { path: 'equipo', component: EquipoAComponent, canActivate: [AuthGuard]  },
      { path: 'jugador', component: JugadorAComponent, canActivate: [AuthGuard]  },
      { path: 'galeria', component: GaleriaAComponent, canActivate: [AuthGuard]  }
    ]
  },

  { path: 'usuario', component: UsuarioComponent ,
    children: [
      { path: 'inicio', component: InicioUComponent },
      { path: 'equipo', component: EquipoUComponent },
      { path: 'jugador', component: JugadorUComponent },
      { path: 'galeria', component: GaleriaUComponent }

    ]
  }

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}