import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-ruta-home',
  templateUrl: './ruta-home.component.html',
  styleUrls: ['./ruta-home.component.css']
})
export class RutaHomeComponent implements OnInit {
  @Input() nombre: string;
  @Input() apellido: string;
  @Input() url_foto: string;
  @Input() idUsuario: number;
  @Output() irAPerfil: EventEmitter<number> = new EventEmitter<number>();

  usuario = [
    {
      nombre: 'pao',
      apellido: 'guamani',
      url_foto: 'pao.jpg',
      usuarioId: 1,
    }];


  constructor(private _router: Router, private _httpClient: HttpClient) { }

  ngOnInit() {
    const url = 'https://192.168.1.6:3000/Usuario/obtener/'+this.idUsuario;

    const requestHttp$ = this._httpClient.get(url);
    /*const requestHttp$ = this._httpClient.post(url, {
      nombre:  'Pao',
      edad: 29,
      casado: false
    });*/

    requestHttp$.subscribe(
      (data)=>{
        console.log(data);
      },
      (data)=>{
        console.log(data);
      },
      ()=>{
        //completa
        console.log('completado');
      }
    );
    console.log('Fin');
  }

}
