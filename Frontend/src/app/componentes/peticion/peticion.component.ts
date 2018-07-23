import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-peticion',
  templateUrl: './peticion.component.html',
  styleUrls: ['./peticion.component.css']
})
export class PeticionComponent implements OnInit {

  @Input() idPeticion;

  url = "";
  peticion;
  usuario = {};
  peliculasSolicitantes;
  peliculasSolicitadas;

  constructor(private _httpClient: HttpClient) { }

  ngOnInit() {
    this.consultarPeticionCompleta();
  }

  consultarPeticionCompleta(){
    this.url = 'http://localhost:3000/Peticion/obtenerTodo/'+this.idPeticion;
    const requestHttp$ = this._httpClient.get(this.url);
    requestHttp$.subscribe(
      (data:any)=>{
        this.peticion = data;
        this.usuario = this.peticion.usuarioSolicitante;
        this.peliculasSolicitantes = this.peticion.peliculaSolicitante;
        this.peliculasSolicitadas = this.peticion.peliculaSolicitada;
        //console.log("Peticion en Espera",data);
        //console.log('Usuario Solicitante',this.usuario);
        console.log('Pelis A', this.peliculasSolicitantes);
        console.log('Pelis B', this.peliculasSolicitadas);
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
