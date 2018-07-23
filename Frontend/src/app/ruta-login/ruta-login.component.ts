import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-ruta-login',
  templateUrl: './ruta-login.component.html',
  styleUrls: ['./ruta-login.component.css']
})
export class RutaLoginComponent implements OnInit {
  email;
  password;
  passwordConfirmation;
  cookieValue = 'UNKNOWN';
  usuario:any;

  ngOnInit() {

  }

  constructor(private _router: Router, private _httpClient: HttpClient, private cookieService: CookieService){

  }

  ingresar(formulario){
    const controles = formulario.controls;
    const correo = controles.email;
    const password = controles.password.value;
    this.validarUsuario();
  }

  validarUsuario(){
    const url = 'http://localhost:3000/Autorizacion/iniciarSesion';

    const requestHttp$ = this._httpClient.post(url, {
      correo: this.email,
      password: this.password
    });

    requestHttp$.subscribe(
      (respuestaData)=>{
        this.usuario = respuestaData['mensaje'];
        if(this.usuario !== 'No existe usuario' ){
          console.log(this.usuario);

          //guardo coookie
          this.cookieService.set( 'usuario', this.usuario );

          const ruta = ['/home'];
          this._router.navigate(ruta);
        }
        console.log(respuestaData);
      },
      (respuestError)=>{
        console.log("Error !",respuestError);
      },
      ()=>{
        //completa
        console.log('completado');
      }
    );
    console.log('Fin');

  }

  irAPerfilDeUsuario(idUsuario: number){
    const ruta = ['/home','usuario',idUsuario]; //segemntos
    this._router.navigate(ruta);
  }

}
