import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ruta-perfil',
  templateUrl: './ruta-perfil.component.html',
  styleUrls: ['./ruta-perfil.component.css']
})
export class RutaPerfilComponent implements OnInit {

  usuarios = [
    {
      nombre: "actor1",
      apellido: "apellido1",
      url_foto: "pao.jpg"
    }];

  unUsuario = {
    nombre: "actor1",
    apellido: "apellido1",
    url_foto: "pao.jpg"
  };

  usuariosPeticiones = [
    {
      nombre: "actor1",
      apellido: "apellido1",
      url_foto: "pao.jpg"
    },
    {
      nombre: "actor1",
      apellido: "apellido1",
      url_foto: "pao.jpg"
    }
    ];

  peliculas = [
    {},{}
  ];

  constructor() { }

  ngOnInit() {
  }

}
