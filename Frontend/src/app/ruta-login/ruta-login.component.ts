import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-ruta-login',
  templateUrl: './ruta-login.component.html',
  styleUrls: ['./ruta-login.component.css']
})
export class RutaLoginComponent implements OnInit {

  ngOnInit() {
  }

  email;
  password;
  passwordConfirmation;


  constructor(private _router: Router, private _httpClient: HttpClient){

  }


  ingresar(formulario){
    //console.log(titulo.innerText);
    const controles = formulario.controls;
    const password = controles.password.value;
    const passwordConfirmation = controles.passwordConfirmation.value;
    if(password === passwordConfirmation){
      alert("my buen");
      this.irAPerfilDeUsuario();
    }else{
      this.password = undefined;
      this.passwordConfirmation = undefined;
      alert("muy mal");
    }
  }

  irAPerfilDeUsuario(){
    const ruta = ['/home']; //segemntos
    this._router.navigate(ruta);

    const url = 'https://192.168.1.6:3000/Usuario/obtener/';

    const requestHttp$ = this._httpClient.get(url);
    /*const requestHttp$ = this._httpClient.post(url, {
      nombre:  'Pao',
      edad: 29,
      casado: false
    });*/

    requestHttp$.subscribe(
      (respuestaOK)=>{
        console.log(respuestaOK);
      },
      (respuestError)=>{
        console.log(respuestError);
      },
      ()=>{
        //completa
        console.log('completado');
      }
    );
    console.log('Fin');
  }
}
