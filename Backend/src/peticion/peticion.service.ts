import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {ActorService} from "../actor/actor.service";
import {UsuarioService} from "../usuario/usuario.service";
import {PeliculaEntity} from "../pelicula/pelicula.entity";
import {ActorEntity} from "../actor/actor.entity";
import {UsuarioEntity} from "../usuario/usuario.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {PeticionEntity} from "./peticion.entity";
import {PeliculaService} from "../pelicula/pelicula.service";

@Injectable()
export class PeticionService{

    constructor(
        @InjectRepository(PeticionEntity)
        private readonly _peticionRepositorio: Repository<PeticionEntity>,
        private _actorService: ActorService,
        private _usuarioService: UsuarioService,
        private _peliculaService: PeliculaService
    ){}

    async registrar(idPeliculaSolicitante, idPeliculaSolicitada){
        const peticion = new PeticionEntity();

        const peliculaSolicitante = await this._peliculaService.obtenerUno(idPeliculaSolicitante);
        const usuarioSolicitante = await this._peliculaService.buscarUsuario(peliculaSolicitante.id);

        const peliculaSolicitada = await this._peliculaService.obtenerUno(idPeliculaSolicitada);
        const usuarioSolicitado = await this._peliculaService.buscarUsuario(peliculaSolicitada.id);

        peticion.peliculaSolicitante = peliculaSolicitante;
        peticion.peliculaSolicitada = peliculaSolicitada;
        peticion.usuarioSolicitante = usuarioSolicitante.actor.usuario.id;
        peticion.usuarioSolicitado = usuarioSolicitado.actor.usuario.id;
        peticion.realizada = false;

        await this._peticionRepositorio.save(peticion);
    }

    async obtener(idPeticion){
        return await this._peticionRepositorio.findOne({
            relations: ["peliculaSolicitante","peliculaSolicitada"],
            where: {
                id: idPeticion
            }
        });
    }

    async listarEnviadas(idUsuarioSolicitante){
        /// usuario que hizo peticion y espera respuesta
        return this._peticionRepositorio.find({
            relations: ["peliculaSolicitante"],
            where: {
                realizada: false,
                usuarioSolicitante: idUsuarioSolicitante
            }
        });

    }


    async listarRecibidas(idUsuarioSolicitado){
        /// usuario que recibe peticion y aceptara o rechazara
        return this._peticionRepositorio.find({
            relations: ["peliculaSolicitada"],
            where: {
                realizada: false,
                usuarioSolicitado: idUsuarioSolicitado
            }
        });

    }

    async aceptarTransferencia(idPeticion){
        const peticion = await this.obtener(idPeticion);

        const peliculaSolicitante = peticion.peliculaSolicitante;
        const peliculaSolicitada = peticion.peliculaSolicitada;
        const actorSolicitante = await this._actorService.buscarPorUsuario(peticion.usuarioSolicitante);
        const actorSolicitado = await this._actorService.buscarPorUsuario(peticion.usuarioSolicitado);

        peliculaSolicitante.actor = actorSolicitado;
        peliculaSolicitada.actor = actorSolicitante;
        //intercambio padres
        await this._peliculaService.guardar(peliculaSolicitante);
        await this._peliculaService.guardar(peliculaSolicitada);
        //actualizo peticion
        peticion.realizada = true;
        return await this._peticionRepositorio.save(peticion);
    }

    async rechazar(idPeticion){
        const peticion = await this.obtener(idPeticion);
        peticion.realizada = true;
        return await this._peticionRepositorio.save(peticion);
    }

}