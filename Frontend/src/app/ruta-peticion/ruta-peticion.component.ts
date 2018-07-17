import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ruta-peticion',
  templateUrl: './ruta-peticion.component.html',
  styleUrls: ['./ruta-peticion.component.css']
})
export class RutaPeticionComponent implements OnInit {

  usuarios = [
    {
      nombre: "actor1",
      apellido: "apellido1",
      url_foto: "pao.jpg"
    }];
  actores = [
    {
    nombres: "Cami",
    apellidos: "Campos",
    fechaNacimiento: "2018-05-05",
    numeroPeliculas: 5,
    retirado: true,
    url_foto: "pao.jpg"
  }];

  peliculas = [
    {},{},{},{},{},{},{},{}
  ];

  constructor() { }

  ngOnInit() {
  }

}
