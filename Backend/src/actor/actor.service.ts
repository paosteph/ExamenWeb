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

    async listarCuatro(inicio){
        return await this._actorRepositorio.find({
            order: {
                nombres: 'ASC'
            },
            skip: inicio,
            take: 4
        });

    }

    async listarActorPeliculas(idUsuario){
        const usuario: UsuarioEntity[] = await this._usuarioService.listarActoresPorUsuario(idUsuario);
        const idActor = usuario[0].actor.id;
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

    async listarActorPeliculasOcho(idUsuario, cantidad){
        const actor = await this.buscarPorUsuarioId(idUsuario);

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

    async buscarPorUsuarioId(idUsuario: number): Promise<ActorEntity>{
        return await this._actorRepositorio.createQueryBuilder("actor")
            .where("actor.usuarioId = :id", {id: idUsuario})
            .getOne();
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