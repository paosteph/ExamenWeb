import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import { RutaHomeComponent } from './ruta-home/ruta-home.component';
import { RutaPerfilComponent } from './ruta-perfil/ruta-perfil.component';
import { RutaUsuarioComponent } from './ruta-usuario/ruta-usuario.component';
import { RutaNoEncontradoComponent } from './ruta-no-encontrado/ruta-no-encontrado.component';
import {ARREGLO_RUTAS} from "../assets/app.routes";
import { RutaLoginComponent } from './ruta-login/ruta-login.component';
import { UsuarioComponent } from './componentes/usuario/usuario.component';
import { PeliculaComponent } from './componentes/pelicula/pelicula.component';
import { ActorComponent } from './componentes/actor/actor.component';
import { RutaPeticionComponent } from './ruta-peticion/ruta-peticion.component';
import { RutaSeleccionComponent } from './ruta-seleccion/ruta-seleccion.component';

@NgModule({
  declarations: [
    AppComponent,
    RutaHomeComponent,
    RutaPerfilComponent,
    RutaUsuarioComponent,
    RutaNoEncontradoComponent,
    RutaLoginComponent,
    UsuarioComponent,
    PeliculaComponent,
    ActorComponent,
    RutaPeticionComponent,
    RutaSeleccionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(
      ARREGLO_RUTAS,
      {
        useHash: true
      }
    ),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
