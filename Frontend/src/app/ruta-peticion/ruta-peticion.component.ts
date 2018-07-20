import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-ruta-peticion',
  templateUrl: './ruta-peticion.component.html',
  styleUrls: ['./ruta-peticion.component.css']
})
export class RutaPeticionComponent implements OnInit {

  idUsuarioVisitado = 0;
  idUsuarioLogin = 0;
  url = "";
  usuarioVisitado: any;
  peliculasActor: any;

  constructor(private _activatedRoute: ActivatedRoute, private _router: Router,private _httpClient: HttpClient) { }

  ngOnInit() {
    //recupero parametros
    const observableParametrosRutas$ = this._activatedRoute.params;
    observableParametrosRutas$.subscribe(
      (parametros)=>{
        console.log("Params ruta peticion",parametros);
        this.idUsuarioLogin = parametros['usuarioSesion'];
        this.idUsuarioVisitado = parametros['usuarioVisitadoId'];
      },
      (respuestError)=>{
        console.log("mal !",respuestError);
      },
      ()=>{
        //completa
      }
    );

    this.obtenerUsuarioVisitado();

  }

  obtenerUsuarioVisitado(){
    this.url = 'http://localhost:3000/Usuario/listarPorActor/'+this.idUsuarioVisitado;
    const requestHttp$ = this._httpClient.get(this.url);
    requestHttp$.subscribe(
      (data)=>{
        this.usuarioVisitado = data;
        console.log("Usuario Visitado",data);
        this.obtenerPeliculasUnActor(this.usuarioVisitado[0]['id']);
      },
      (error)=>{
        console.log('Error !',error);
      },
      ()=>{
        //completa
      }
    );
  }

  obtenerPeliculasUnActor(id){
    console.log('id actor', id);
    this.url = 'http://localhost:3000/Actor/listarPeliculas/'+id;
    const requestHttp$ = this._httpClient.get(this.url);
    requestHttp$.subscribe(
      (data)=>{
        this.peliculasActor = data;
        console.log("Peliculas Actor",data);
      },
      (error)=>{
        console.log('Error !',error);
      },
      ()=>{
        //completa
      }
    );
  }

  peticionTransferencia(id: number){
    const ruta = ['/home',this.idUsuarioLogin,'seleccion',this.idUsuarioLogin, this.idUsuarioVisitado, id];
    this._router.navigate(ruta);
  }

}
