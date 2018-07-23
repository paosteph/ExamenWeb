import {Component, DoCheck, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-ruta-usuario',
  templateUrl: './ruta-usuario.component.html',
  styleUrls: ['./ruta-usuario.component.css']
})
export class RutaUsuarioComponent implements OnInit, DoCheck {

  usuariosBuscados: any;
  usuariosActuales: any;
  usuariosTotales: any;
  //actores
  actoresBuscados: any;
  actoresActuales: any;
  actoresTodos: any;
  //peliculas
  peliculasBuscados: any;
  peliculasActuales: any;
  peliculasTodas: any;

  cookieUsuario = 'UNKNOWN';
  url: string;
  palabraBuscada;
  contadorUsuario=0;
  contadorActores=0;
  contadorPeliculas=0;

  constructor(private _router: Router, private _httpClient: HttpClient, private _activatedRoute: ActivatedRoute, private cookieService: CookieService) { }

  ngDoCheck(){
    if(this.usuariosActuales !== this.usuariosBuscados){
      this.usuariosActuales = this.usuariosBuscados;
    }
    if(this.actoresActuales !== this.actoresBuscados){
      this.actoresActuales = this.actoresBuscados;
    }
    if(this.peliculasActuales !== this.peliculasBuscados){
      this.peliculasActuales = this.peliculasBuscados;
    }
  }


  ngOnInit() {
      this.cookieUsuario = this.cookieService.get('usuario');

    //listo todos
    this.listarTodosUsuarios();
    this.listarCuatroUsuarios();

    this.listarTodosActores();
    this.listarCuatroActores();

    this.listarTodosPeliculas();
    this.listarCuatroPeliculas();

  }

  siguientesUsuario(){
    if(this.contadorUsuario < this.usuariosTotales.length){
      this.contadorUsuario += 4;
      this.listarCuatroUsuarios();
    }
  }

  anterioresUsuarios(){
    if(this.contadorUsuario >= 4){
      this.contadorUsuario -= 4;
      this.listarCuatroUsuarios();
    }
  }

  siguientesActores(){
    if(this.contadorActores < this.actoresTodos.length){
      this.contadorActores += 4;
      this.listarCuatroActores();
    }
  }

  anterioresActores(){
    if(this.contadorActores >= 4){
      this.contadorActores -= 4;
      this.listarCuatroActores();
    }
  }

  siguientesPeliculas(){
    if(this.contadorPeliculas < this.actoresTodos.length){
      this.contadorPeliculas += 4;
      this.listarCuatroPeliculas();
    }
  }

  anterioresPeliculas(){
    if(this.contadorPeliculas >= 4){
      this.contadorPeliculas -= 4;
      this.listarCuatroPeliculas();
    }
  }


  visitarUsuario(idVisitado: number){
    const ruta = ['/home','peticion',idVisitado];
    this._router.navigate(ruta);
  }

  peticionTransferencia(idPelicula: number){
    const ruta = ['/home','seleccion',idPelicula];
    this._router.navigate(ruta);
  }

  buscar(formulario){
    const controles = formulario.controls;
    const palabra = controles.palabraBuscada;
    this.buscarTodasSimilitudes(this.palabraBuscada);
  }

  buscarTodasSimilitudes(buscado){
    this.buscarUsuariosLike(buscado);
    this.buscarActoresLike(buscado);
    this.buscarPeliculasLike(buscado);
  }

  listarTodosUsuarios(){
    this.url = 'http://localhost:3000/Usuario/listar';
    const requestHttp$ = this._httpClient.get(this.url);
    requestHttp$.subscribe(
      (data)=>{
        this.usuariosTotales = data;
        console.log("Usuarios todos",data);

      },
      (error)=>{
        console.log('Error !',error);
      },
      ()=>{
        //completa
      }
    );
  }

  listarCuatroUsuarios(){
    this.url = 'http://localhost:3000/Usuario/listarCuatro/'+this.contadorUsuario;
    const requestHttp$ = this._httpClient.get(this.url);
    requestHttp$.subscribe(
      (data)=>{
        this.usuariosActuales = data;
        this.usuariosBuscados = this.usuariosActuales;
        console.log("Usuarios 4",data);

      },
      (error)=>{
        console.log('Error !',error);
      },
      ()=>{
        //completa
      }
    );
  }

  listarTodosActores(){
    this.url = 'http://localhost:3000/Actor/listar';
    const requestHttpActores$ = this._httpClient.get(this.url);
    requestHttpActores$.subscribe(
      (data)=>{
        this.actoresTodos = data;
        console.log("Actores todos",data);

      },
      (error)=>{
        console.log('Error !',error);
      },
      ()=>{
        //completa
      }
    );
  }

  listarCuatroActores(){
    this.url = 'http://localhost:3000/Actor/listarCuatro/'+this.contadorActores;
    const requestHttpActores$ = this._httpClient.get(this.url);
    requestHttpActores$.subscribe(
      (data)=>{
        this.actoresActuales = data;
        this.actoresBuscados = this.actoresActuales;
        console.log("Actores 4",data);
      },
      (error)=>{
        console.log('Error !',error);
      },
      ()=>{
        //completa
      }
    );
  }


  listarTodosPeliculas(){
    this.url = 'http://localhost:3000/Pelicula/listar';
    const requestHttpPeliculas$ = this._httpClient.get(this.url);
    requestHttpPeliculas$.subscribe(
      (data)=>{
        this.peliculasTodas = data;
        console.log("Peliculas todos",data);

      },
      (error)=>{
        console.log('Error !',error);
      },
      ()=>{
        //completa
      }
    );
  }

  listarCuatroPeliculas(){
    this.url = 'http://localhost:3000/Pelicula/listarCuatro/'+this.contadorPeliculas;
    const requestHttpPeliculas$ = this._httpClient.get(this.url);
    requestHttpPeliculas$.subscribe(
      (data)=>{
        this.peliculasActuales = data;
        this.peliculasBuscados = this.peliculasActuales;
        console.log("Peliculas 4",data);

      },
      (error)=>{
        console.log('Error !',error);
      },
      ()=>{
        //completa
      }
    );
  }

  buscarPeliculasLike(palabra){
    const url = 'http://localhost:3000/Pelicula/buscarLike';

    const requestHttp$ = this._httpClient.post(url, {
      palabra: palabra
    });

    requestHttp$.subscribe(
      (respuestaData)=>{
        this.peliculasBuscados = respuestaData;
        console.log('Peliculas like',respuestaData);
      },
      (respuestError)=>{
        console.log("Error !",respuestError);
      },
      ()=>{
        //completa
      }
    );
  }

  buscarActoresLike(palabra){
    const url = 'http://localhost:3000/Actor/buscarLike';

    const requestHttp$ = this._httpClient.post(url, {
      palabra: palabra
    });

    requestHttp$.subscribe(
      (respuestaData)=>{
        this.actoresBuscados = respuestaData;
        console.log('Actores like',respuestaData);
      },
      (respuestError)=>{
        console.log("Error !",respuestError);
      },
      ()=>{
        //completa
      }
    );
  }

  buscarUsuariosLike(palabra){
    const url = 'http://localhost:3000/Usuario/buscarLike';

    const requestHttp$ = this._httpClient.post(url, {
      palabra: palabra
    });

    requestHttp$.subscribe(
      (respuestaData)=>{
        this.usuariosBuscados = respuestaData;
        console.log('Usuarios like', respuestaData);
      },
      (respuestError)=>{
        console.log("Error !",respuestError);
      },
      ()=>{
        //completa
      }
    );
  }


}
