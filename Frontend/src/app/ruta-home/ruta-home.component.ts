import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
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

  // user =
  //   {
  //     nombre: 'pao',
  //     apellido: 'guamani',
  //     url_foto: 'pao.jpg',
  //     usuarioId: 1,
  //   };
  user = {};
  url: string;
  idUsuarioLogin: any;

  constructor(private _router: Router, private _httpClient: HttpClient, private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    const observableParametrosRutas$ = this._activatedRoute.params;
    observableParametrosRutas$.subscribe(
      (parametros)=>{
        console.log("R",parametros);
        this.idUsuarioLogin = parametros['usuarioHomeId'];
        console.log('id logeo',this.idUsuarioLogin);

        this.url = 'http://localhost:3000/Usuario/obtener/'+this.idUsuarioLogin;

      },
      (error)=>{
        console.log('Error !',error);
      },
      ()=>{
        //completa
      }
    );

    const requestHttp$ = this._httpClient.get(this.url);
    requestHttp$.subscribe(
      (data)=>{
        this.user = data;
        console.log("Usuario de Home",data);
        const ruta = ['/home',this.idUsuarioLogin,'usuario',this.idUsuarioLogin];
        this._router.navigate(ruta);
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
