import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  @Input() idPelicula: number;
  @Input() nombre: string;
  @Input() anioLanzamiento: number;
  @Input() rating: number;
  @Input() actoresPrincipales: string;
  @Input() sinopsis: string;


  constructor() { }

  ngOnInit() {
  }

}
