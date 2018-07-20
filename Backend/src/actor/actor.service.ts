import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {ActorEntity} from "./actor.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {UsuarioService} from "../usuario/usuario.service";
import {PeliculaEntity} from "../pelicula/pelicula.entity";
import {UsuarioEntity} from "../usuario/usuario.entity";
import {PeliculaService} from "../pelicula/pelicula.service";

@Injectable()
export class ActorService{

    constructor(
        @InjectRepository(ActorEntity)
        private readonly _actorRepositorio: Repository<ActorEntity>,
        private _usuarioService: UsuarioService,
    ){}

    async listarActores(): Promise<ActorEntity[]>{
        return await this._actorRepositorio.find({
            order: {
                nombres: 'ASC'
            }
        });
    }

    async listarActorPeliculas(idActor){
        return this._actorRepositorio.find({
            relations: ["peliculas"],
            where: {
                id: idActor
            },
            order: {
                nombres: "ASC"
            }
        });
    }

    async obtenerPeliculasPorActor(id){
        return await this._actorRepositorio.findOne(id, {relations: ['peliculas']})
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

    async encontrarActoresLike(palabra: string){
        return await this._actorRepositorio
            .createQueryBuilder("actor")
            .where("upper(actor.nombres) like :palabra", {palabra: '%'+palabra+'%'})
            .orWhere("upper(actor.apellidos) like :palabra", {palabra: '%'+palabra+'%'})
            .getMany();

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