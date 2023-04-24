//Importaciones de los modulos necesarios

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
/*
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { MessagesComponent } from './messages/messages.component';
*/

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AdministradorComponent } from './administrador/administrador.component';
import { HeaderAComponent } from './administrador/header-a/header-a.component';
import { FooterAComponent } from './administrador/footer-a/footer-a.component';
import { MenuAComponent } from './administrador/menu-a/menu-a.component';
import { EquipoAComponent } from './administrador/equipo-a/equipo-a.component';
import { JugadorAComponent } from './administrador/jugador-a/jugador-a.component';
import { GaleriaAComponent } from './administrador/galeria-a/galeria-a.component';
import { LoginAComponent } from './administrador/login-a/login-a.component';

import { UsuarioComponent } from './usuario/usuario.component';
import { HeaderUComponent } from './usuario/header-u/header-u.component';
import { FooterUComponent } from './usuario/footer-u/footer-u.component';
import { MenuUComponent } from './usuario/menu-u/menu-u.component';
import { InicioUComponent } from './usuario/inicio-u/inicio-u.component';
import { EquipoUComponent } from './usuario/equipo-u/equipo-u.component';
import { JugadorUComponent } from './usuario/jugador-u/jugador-u.component';
import { GaleriaUComponent } from './usuario/galeria-u/galeria-u.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  declarations: [
    AppComponent,
	
	/*
    DashboardComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    HeroSearchComponent,
   */
   
	AdministradorComponent,
    MenuAComponent,
    MenuUComponent,
	HeaderAComponent,
    FooterAComponent,
    EquipoAComponent,
    JugadorAComponent,
    GaleriaAComponent,
    LoginAComponent,
	
	UsuarioComponent,
    HeaderUComponent,
    FooterUComponent,
    EquipoUComponent,
    JugadorUComponent,
    GaleriaUComponent,
	InicioUComponent,

   
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }