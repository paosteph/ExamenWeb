import {Component, DoCheck, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent implements OnInit {

  @Input() idSolicitud;
  //@Output() seleccionoPeticion: EventEmitter<number> = new EventEmitter();

  url = "";
  solicitud;
  usuario = {};
  peliculasSolicitantes;
  peliculasSolicitadas;

  constructor(private _httpClient: HttpClient) { }

  ngOnInit() {
    this.consultarPeticionCompleta();
  }


  aceptarSolicitud(){
    this.url = 'http://localhost:3000/Peticion/aceptar';
    const requestHttp$ = this._httpClient.post(
      this.url,
      {
        idPeticion: this.idSolicitud
      }
    );
    requestHttp$.subscribe(
      (data:any)=>{
        console.log('Aceptado',data);
      },
      (error)=>{
        console.log('Error !',error);
      },
      ()=>{
        //completa
      }
    );
  }

  rechazarSolicitud(){
    this.url = 'http://localhost:3000/Peticion/rechazar';
    const requestHttp$ = this._httpClient.post(
      this.url,
      {
        id: this.idSolicitud
      }
    );
    requestHttp$.subscribe(
      (data:any)=>{
        console.log('Rechazado',data);
      },
      (error)=>{
        console.log('Error !',error);
      },
      ()=>{
        //completa
      }
    );
  }

  consultarPeticionCompleta(){
    this.url = 'http://localhost:3000/Peticion/obtenerTodo/'+this.idSolicitud;
    const requestHttp$ = this._httpClient.get(this.url);
    requestHttp$.subscribe(
      (data:any)=>{
        this.solicitud = data;
        this.usuario = this.solicitud.usuarioSolicitado;
        this.peliculasSolicitantes = this.solicitud.peliculaSolicitante;
        this.peliculasSolicitadas = this.solicitud.peliculaSolicitada;
        //console.log("Peticion en Espera",data);
        console.log('Usuario solicitado',this.usuario);
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
