import {Component, DoCheck, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-ruta-usuario',
  templateUrl: './ruta-usuario.component.html',
  styleUrls: ['./ruta-usuario.component.css']
})
export class RutaUsuarioComponent implements OnInit, DoCheck {

  usuariosBuscados: any;
  usuariosActuales: any;
  actoresBuscados: any;
  actoresActuales: any;
  peliculasBuscados: any;
  peliculasActuales: any;
  idUsuarioLogin : any;
  url: string;
  palabraBuscada;

  constructor(private _router: Router, private _httpClient: HttpClient, private _activatedRoute: ActivatedRoute) { }

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

    const observableParametrosRutas$ = this._activatedRoute.params;
    observableParametrosRutas$.subscribe(
      (parametros)=>{
        console.log("R",parametros);
        this.idUsuarioLogin = parametros['usuarioId'];
        console.log('id logeo',this.idUsuarioLogin);
      },
      (respuestError)=>{
        console.log("mal",respuestError);
      },
      ()=>{
        //completa
      }
    );

    //listo todos
    this.listarTodosUsuarios();
    this.listarTodosActores();
    this.listarTodosPeliculas();

  }

  visitarUsuario(idVisitado: number){
    const ruta = ['/home',this.idUsuarioLogin,'peticion',this.idUsuarioLogin,idVisitado];
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
        this.usuariosActuales = data;
        this.usuariosBuscados = this.usuariosActuales;
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

  listarTodosActores(){
    this.url = 'http://localhost:3000/Actor/listar';
    const requestHttpActores$ = this._httpClient.get(this.url);
    requestHttpActores$.subscribe(
      (data)=>{
        this.actoresActuales = data;
        this.actoresBuscados = this.actoresActuales;
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

  listarTodosPeliculas(){
    this.url = 'http://localhost:3000/Pelicula/listar';
    const requestHttpPeliculas$ = this._httpClient.get(this.url);
    requestHttpPeliculas$.subscribe(
      (data)=>{
        this.peliculasActuales = data;
        this.peliculasBuscados = this.peliculasActuales;
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
