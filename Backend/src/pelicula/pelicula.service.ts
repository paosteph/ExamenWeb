import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {PeliculaEntity} from "./pelicula.entity";
import {Repository} from "typeorm";
import {ActorService} from "../actor/actor.service";
import {UsuarioService} from "../usuario/usuario.service";
import {ActorEntity} from "../actor/actor.entity";

@Injectable()
export class PeliculaService{

    constructor(
        @InjectRepository(PeliculaEntity)
        private readonly _peliculaRepositorio: Repository<PeliculaEntity>,
        private _actorService: ActorService,
        private _usuarioService: UsuarioService,
    ){}

    async listarTodas(): Promise<PeliculaEntity[]> {
        return await this._peliculaRepositorio.find()
    }

    async crearUno(
        nombre, anioLanzamiento, rating, actoresPrincipales, sinopsis, idActor): Promise<PeliculaEntity>{
        const pelicula = new PeliculaEntity();
        pelicula.nombre = nombre;
        pelicula.anioLanzamiento = anioLanzamiento;
        pelicula.rating = rating;
        pelicula.actoresPrincipales = actoresPrincipales;
        pelicula.sinopsis = sinopsis;
        pelicula.solicitudTransferencia = false;
        pelicula.solicitanteId = 0;

        const actor = await this._actorService.obtenerUno(idActor);
        pelicula.actor = actor;
        return await this._peliculaRepositorio.save(pelicula);
    }

    async obtenerUno(id: number): Promise<PeliculaEntity>{
        return await this._peliculaRepositorio.findOne(id);
    }

    async eliminar(pelicula){
        await this._peliculaRepositorio.remove(pelicula);
    }

    async pedirTransferencia(idPelicula: number, idSolicitante: number){
        //const usuario = await this._usuarioService.obtenerUno(idUsuario);
        const pelicula = await this._peliculaRepositorio.findOne(
            {where: {id: idPelicula, solicitudTransferencia: false}}
            );
        pelicula.solicitudTransferencia = true;
        pelicula.solicitanteId = idSolicitante;

        return await this._peliculaRepositorio.save(pelicula);
    }

    async aceptarTrasnferencia(idPelicula: number){
        const pelicula = await this._peliculaRepositorio.findOne(
                {where: {id: idPelicula, solicitudTransferencia: true}}
            );
        const idUsuarioSolicitante = pelicula.solicitanteId;
        const actor = await this._actorService.obtenerUno(idUsuarioSolicitante);
        //console.log(actor);
        pelicula.solicitudTransferencia = false;
        pelicula.solicitanteId = 0;
        pelicula.actor = actor;
        return await this._peliculaRepositorio.save(pelicula);

    }

    async rechazarTrasnferencia(idPelicula: number){
        const pelicula = await this._peliculaRepositorio.findOne(
            {where: {id: idPelicula, solicitudTransferencia: true}}
        );
        pelicula.solicitudTransferencia = false;
        pelicula.solicitanteId = 0;
        return await this._peliculaRepositorio.save(pelicula);

    }

}

// export class Pelicula{
//     constructor(
//         public idPelicula: number,
//         public nombre: string,
//         public anioLanzamiento: number,
//         public rating: number,
//         public actoresPrincipales: string,
//         public sinopsis: string,
//         public actorId: number
//     ){}
// }