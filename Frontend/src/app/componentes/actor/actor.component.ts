import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css']
})
export class ActorComponent implements OnInit {

  @Input() nombres: string;
  @Input() apellidos: string;
  @Input() fechaNacimiento: string;
  @Input() numeroPeliculas: number;
  @Input() retirado: boolean;
  @Input() url_foto: string;

  constructor() { }

  ngOnInit() {
  }

}
