import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {ActorService} from "../actor/actor.service";
import {UsuarioService} from "../usuario/usuario.service";
import {PeliculaEntity} from "../pelicula/pelicula.entity";
import {ActorEntity} from "../actor/actor.entity";
import {UsuarioEntity} from "../usuario/usuario.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {PeticionEntity} from "./peticion.entity";

@Injectable()
export class PeticionService{

    constructor(
        @InjectRepository(PeticionEntity)
        private readonly _peticionRepositorio: Repository<PeticionEntity>,
        private _actorService: ActorService,
        private _usuarioService: UsuarioService,
    ){}
}