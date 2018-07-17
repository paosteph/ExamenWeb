import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-ruta-usuario',
  templateUrl: './ruta-usuario.component.html',
  styleUrls: ['./ruta-usuario.component.css']
})
export class RutaUsuarioComponent implements OnInit {

  usuarios = [
    {
      nombre: "actor1",
      apellido: "apellido1",
      url_foto: "pao.jpg"
    },
    {
      nombre: "actor2",
      apellido: "apellido2",
      url_foto: "pao.jpg"
    },
    {
      nombre: "actor3",
      apellido: "apellido3",
      url_foto: "pao.jpg"
    },
    {
      nombre: "actor3",
      apellido: "apellido3",
      url_foto: "pao.jpg"
    }
  ];

  actores = [
    {
      nombres: "Cami",
      apellidos: "Campos",
      fechaNacimiento: "2018-05-05",
      numeroPeliculas: 5,
      retirado: true,
      url_foto: "pao.jpg"
    },
    {
      nombres: "Cami",
      apellidos: "Campos",
      fechaNacimiento: "2018-05-05",
      numeroPeliculas: 5,
      retirado: true,
      url_foto: "pao.jpg"
    },
    {
      nombres: "Cami",
      apellidos: "Campos",
      fechaNacimiento: "2018-05-05",
      numeroPeliculas: 5,
      retirado: true,
      url_foto: "pao.jpg"
    },
    {
      nombres: "Cami",
      apellidos: "Campos",
      fechaNacimiento: "2018-05-05",
      numeroPeliculas: 5,
      retirado: true,
      url_foto: "pao.jpg"
    }
  ];

  peliculas = [
    {},{},{},{}
  ];

  constructor(private _httpClient: HttpClient) { }

  ngOnInit() {

  }

}
