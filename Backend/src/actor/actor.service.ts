import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {ActorEntity} from "./actor.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {UsuarioService} from "../usuario/usuario.service";
import {PeliculaEntity} from "../pelicula/pelicula.entity";

@Injectable()
export class ActorService{

    constructor(
        @InjectRepository(ActorEntity)
        private readonly _actorRepositorio: Repository<ActorEntity>,
        private _usuarioService: UsuarioService

    ){}

    async listarActores(): Promise<ActorEntity[]>{
        return await this._actorRepositorio.find({
            order: {
                nombres: 'ASC'
            },
            skip: 0,
            take: 4
        });
    }

    async listarActoresUnUsuario(idUsuario){
        return this._actorRepositorio.find({
            relations: ["peliculas"],
            where: {
                id: idUsuario
            },
            order: {
                nombres: "ASC"
            },
            skip: 0,
            take: 4
        });
    }

    async crearUno(nombres, apellidos, fechaNacimiento, numeroPeliculas, retirado, url_foto, idUsuario){
        const actor = new ActorEntity();
        actor.nombres = nombres;
        actor.apellidos = apellidos;
        actor.fechaNacimiento = fechaNacimiento;
        actor.numeroPeliculas = numeroPeliculas;
        actor.retirado = retirado;
        actor.url_foto_actor = url_foto;

        //busco al usuario para agregar relacion FK
        const usuario = await this._usuarioService.obtenerUno(idUsuario);
        actor.usuario = usuario;

        await this._actorRepositorio.save(actor);
    }

    async obtenerUno(id: number): Promise<ActorEntity>{
        return await this._actorRepositorio.findOne(id);
    }

    async obtenerActorPadre(idUsuario: number){
        return await this._actorRepositorio.findOne({
            where: {usuarioId: idUsuario}
        });
    }

    async transferirActorDePelicula(idUsuario: number, pelicula: PeliculaEntity){
        let actor = await this.obtenerActorPadre(idUsuario);
        actor.peliculas = [pelicula];
        return await this._actorRepositorio.save(actor);
    }

}

// export class Actor{
//     constructor(
//         public nombres: string,
//         public apellidos: string,
//         public fechaNacimiento: Date,
//         public numeroPeliculas: number,
//         public retirado: boolean,
//         public url_foto:string
//     ){}
// }