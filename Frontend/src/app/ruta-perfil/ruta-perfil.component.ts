import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-ruta-perfil',
  templateUrl: './ruta-perfil.component.html',
  styleUrls: ['./ruta-perfil.component.css']
})
export class RutaPerfilComponent implements OnInit {

  url = "";
  cookieUsuario = 'vacia';
  private usuario:any = {};
  //peticiones
  enviadas = {};
  recibidas = {};

  constructor(private _router: Router,private _httpClient: HttpClient, private cookieService: CookieService) { }

  ngOnInit() {
    this.cookieUsuario = this.cookieService.get('usuario');
    this.consultarUsuarioSesion();
    this.consultarPeticionesEnEspera();
    this.consultarPeticionesRecibidas();
  }

  consultarPeticionesEnEspera(){
    this.url = 'http://localhost:3000/Peticion/listarEnEspera/'+this.cookieUsuario;
    const requestHttp$ = this._httpClient.get(this.url);
    requestHttp$.subscribe(
      (data)=>{
        this.enviadas = data; //usuario//enviadas//recibidas
        //this.unUsuarioB = this.enviadas[0];
        console.log("Enviadas",data);
      },
      (error)=>{
        console.log('Error !',error);
      },
      ()=>{
        //completa
      }
    );
  }

  consultarPeticionesRecibidas(){
    this.url = 'http://localhost:3000/Peticion/listarRecibidas/'+this.cookieUsuario;
    const requestHttp$ = this._httpClient.get(this.url);
    requestHttp$.subscribe(
      (data)=>{
        this.recibidas = data; //usuario//peliculaA  - B
        //this.unUsuario = this.recibidas[0];
        console.log("Recibidas",data);
      },
      (error)=>{
        console.log('Error !',error);
      },
      ()=>{
        //completa
      }
    );
  }

  consultarUsuarioSesion(){
    this.url = 'http://localhost:3000/Usuario/obtener/'+this.cookieUsuario;
    const requestHttp$ = this._httpClient.get(this.url);
    requestHttp$.subscribe(
      (data:any)=>{
        this.usuario = data;
        console.log("Usuario Perfil",this.usuario);
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
