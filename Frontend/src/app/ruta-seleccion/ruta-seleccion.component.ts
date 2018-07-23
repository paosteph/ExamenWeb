import { Component, OnInit } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-ruta-seleccion',
  templateUrl: './ruta-seleccion.component.html',
  styleUrls: ['./ruta-seleccion.component.css']
})
export class RutaSeleccionComponent implements OnInit {

  cookieUsuario = 'Ninguna';
  idPeliculaSolicitada:any;
  url: string;

  usuarios: any;
  peliculaSolicitada = [];

  constructor(private _activatedRoute: ActivatedRoute, private _router: Router,private _httpClient: HttpClient, private cookieService: CookieService) { }

  ngOnInit() {
    //id del usuario de sesion, o solicitante
    this.cookieUsuario = this.cookieService.get('usuario');
    this.buscoUsuarioSesion(this.cookieUsuario);

    //obtengo pelicula del usuario solicitado
    const observableParametrosRutas$ = this._activatedRoute.params;
    observableParametrosRutas$.subscribe(
      (parametros)=>{
        console.log("Params ruta peticion",parametros);
        this.idPeliculaSolicitada = parametros['peliculaSolicitadaId'];
        this.buscarPeliculaSolicitada(this.idPeliculaSolicitada)
      },
      (respuestError)=>{
        console.log("mal !",respuestError);
      },
      ()=>{
        //completa
      }
    );



  }

  //cargo datos de usuario sesion
  buscoUsuarioSesion(idUsuario){
    this.url = 'http://localhost:3000/Usuario/listarTodo/'+idUsuario;
    const requestHttp$ = this._httpClient.get(this.url);
    requestHttp$.subscribe(
      (data)=>{
        this.usuarios = data;
        console.log("Usuario Sesion",data);
      },
      (error)=>{
        console.log('Error !',error);
      },
      ()=>{
        //completa
      }
    );
  }

  buscarPeliculaSolicitada(idPelicula){
    this.url = 'http://localhost:3000/Pelicula/obtener/'+idPelicula;
    const requestHttp$ = this._httpClient.get(this.url);
    requestHttp$.subscribe(
      (data)=>{
        this.peliculaSolicitada.push(data);
        console.log("Pelicula Solicitada",this.peliculaSolicitada);
      },
      (error)=>{
        console.log('Error !',error);
      },
      ()=>{
        //completa
      }
    );
  }

  registrarPeticion(idPeliculaSolicitante, idPeliculaSolicitada){
    this.url = 'http://localhost:3000/Peticion/crear';
    console.log('solcitante'+idPeliculaSolicitante+'solicitado'+idPeliculaSolicitada);
    const requestHttp$ = this._httpClient.post(this.url,{
      idPeliculaSolitante: idPeliculaSolicitante,
      idPeliculaSolicitada: idPeliculaSolicitada
    });
    requestHttp$.subscribe(
      (data)=>{
        const respuesta = data['mensaje'];
        console.log(respuesta);
      },
      (error)=>{
        console.log('Error !',error);
      },
      ()=>{
        //completa
      }
    );
  }

}
