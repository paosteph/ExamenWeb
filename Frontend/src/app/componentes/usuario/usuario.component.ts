import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  @Input() nombre: string;
  @Input() apellido: string;
  @Input() url_foto: string;
  @Input() idUsuario: number;
  constructor() { }

  ngOnInit() {
  }

}
