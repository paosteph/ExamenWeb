import {Routes} from "@angular/router";
import {RutaHomeComponent} from "../app/ruta-home/ruta-home.component";
import {RutaPerfilComponent} from "../app/ruta-perfil/ruta-perfil.component";
import {RutaUsuarioComponent} from "../app/ruta-usuario/ruta-usuario.component";
import {RutaNoEncontradoComponent} from "../app/ruta-no-encontrado/ruta-no-encontrado.component";
import {RutaLoginComponent} from "../app/ruta-login/ruta-login.component";
import {RutaPeticionComponent} from "../app/ruta-peticion/ruta-peticion.component";
import {RutaSeleccionComponent} from "../app/ruta-seleccion/ruta-seleccion.component";

export const ARREGLO_RUTAS: Routes = [
  {
    path: 'home/:usuarioHomeId',
    component: RutaHomeComponent,
    children: [
      {
        path: 'perfil/:usuarioPerfilId',
        component: RutaPerfilComponent
      },
      {
        path: 'usuario/:usuarioId',
        component: RutaUsuarioComponent,
      },
      {
        path: 'peticion/:usuarioSesion/:usuarioVisitadoId',
        component: RutaPeticionComponent
      },
      {
        path: 'seleccion/:usuarioSolicitante/:usuarioSolicitado/:peliculaId',
        component: RutaSeleccionComponent
      }
    ]
  },
  {
    path: '',
    redirectTo: 'home/:usuarioHome',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: RutaLoginComponent
  },
  // {
  //   path: '',
  //   redirectTo: 'login',
  //   pathMatch: 'full'
  // },
  {
    path: '**',
    component: RutaNoEncontradoComponent
  }
];
