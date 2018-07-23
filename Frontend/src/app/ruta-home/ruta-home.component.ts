import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";

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

  usuario = {};
  url: string;
  //idUsuarioLogin: any;
  cookieUsuario = 'UNKNOWN';


  constructor(private _router: Router, private _httpClient: HttpClient, private _activatedRoute: ActivatedRoute, private cookieService: CookieService) { }

  ngOnInit() {
    this.cookieUsuario = this.cookieService.get('usuario');
    console.log('cookie usuario',this.cookieUsuario);

    this.url = 'http://localhost:3000/Usuario/obtener/'+this.cookieUsuario;
    const requestHttp$ = this._httpClient.get(this.url);
    requestHttp$.subscribe(
      (data)=>{
        this.usuario = data;
        console.log("Usuario de Home",data);

        const ruta = ['/home','usuario'];
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

  visitarPerfil(){
    const ruta = ['/home','perfil'];
    this._router.navigate(ruta);
  }

}
