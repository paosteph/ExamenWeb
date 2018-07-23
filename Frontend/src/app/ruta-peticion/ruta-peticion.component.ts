import {Component, DoCheck, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-ruta-peticion',
  templateUrl: './ruta-peticion.component.html',
  styleUrls: ['./ruta-peticion.component.css']
})
export class RutaPeticionComponent implements OnInit, DoCheck {

  idUsuarioVisitado = 0;
  idActorVisitado = 0;
  //idUsuarioLogin = 0;
  cookieUsuario = 'NINGUNA';
  url = "";
  usuarioVisitado: any;
  //peliculas
  peliculasActor: any; //mostradas
  peliculasActorNuevas: any;
  peliculasActorTodos: any;
  cantidadPeliculasMostrar = 8;
  actualizo= false;

  constructor(private _activatedRoute: ActivatedRoute,
              private _router: Router,
              private _httpClient: HttpClient,
              private cookieService: CookieService,) { }

  ngOnInit() {
    //obtengo id del usuario en cookie
    this.cookieUsuario = this.cookieService.get('usuario');
    //recupero parametros, el usuario visitado
    const observableParametrosRutas$ = this._activatedRoute.params;
    observableParametrosRutas$.subscribe(
      (parametros)=>{
        console.log("Params ruta peticion",parametros);
        //this.idUsuarioLogin = parametros['usuarioSesion'];
        this.idUsuarioVisitado = parametros['usuarioVisitadoId'];
      },
      (respuestError)=>{
        console.log("mal !",respuestError);
      },
      ()=>{
        //completa
      }
    );

    this.obtenerUsuarioVisitado();

  }

  ngDoCheck(){
    // if(this.peliculasActor !== this.peliculasActorNuevas){
    //   this.peliculasActor = this.peliculasActorNuevas;
    // }
    // if(this.actualizo){
    //   this.obtenerMasOchoPeliculasUnActor(this.idActorVisitado);
    // }
  }

  masPeliculas(){
    if(this.cantidadPeliculasMostrar < this.peliculasActorTodos.length){
      this.cantidadPeliculasMostrar += 8;
      this.actualizo = true;

    }
  }

  obtenerUsuarioVisitado(){
    this.url = 'http://localhost:3000/Usuario/listarPorActor/'+this.idUsuarioVisitado;
    const requestHttp$ = this._httpClient.get(this.url);
    requestHttp$.subscribe(
      (data)=>{
        this.usuarioVisitado = data;
        console.log("Usuario Visitado",data);
        this.idActorVisitado = this.usuarioVisitado[0]['id'];
        this.obtenerTodasPeliculasUnActor(this.idActorVisitado);
        //this.obtenerMasOchoPeliculasUnActor(this.idActorVisitado);
      },
      (error)=>{
        console.log('Error !',error);
      },
      ()=>{
        //completa
      }
    );
  }

  obtenerTodasPeliculasUnActor(id){
    console.log('id actor', id);
    this.url = 'http://localhost:3000/Actor/listarPeliculas/'+id;
    const requestHttp$ = this._httpClient.get(this.url);
    requestHttp$.subscribe(
      (data)=>{
        this.peliculasActor = data;
        console.log("Peliculas Todas",data);
        //this.obtenerMasOchoPeliculasUnActor(this.idActorVisitado);
      },
      (error)=>{
        console.log('Error !',error);
      },
      ()=>{
        //completa
      }
    );
  }

  obtenerMasOchoPeliculasUnActor(id){
    this.url = 'http://localhost:3000/Pelicula/listarOcho/'+id+'/'+this.cantidadPeliculasMostrar;
    const requestHttp$ = this._httpClient.get(this.url);
    requestHttp$.subscribe(
      (data)=>{
        this.peliculasActor = data;
        //this.peliculasActorNuevas = this.peliculasActor;
        console.log("Peliculas 8",this.peliculasActor);
      },
      (error)=>{
        console.log('Error !',error);
      },
      ()=>{
        //completa
      }
    );
  }

  peticionTransferencia(idPelicula: number){
    const ruta = ['/home','seleccion',idPelicula];
    this._router.navigate(ruta);
  }

}
