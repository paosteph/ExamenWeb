import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ruta-seleccion',
  templateUrl: './ruta-seleccion.component.html',
  styleUrls: ['./ruta-seleccion.component.css']
})
export class RutaSeleccionComponent implements OnInit {

  usuarios = [
    {
      nombre: "actor1",
      apellido: "apellido1",
      url_foto: "pao.jpg"
    }];

  peliculaSeleccionada = {

  };
  peliculas = [
    {},{},{},{}
  ];

  constructor() { }

  ngOnInit() {
  }

}
