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

    async registrar(idPeliculaSolicitante, idPeliculaSolicitada) {
        const peticion = new PeticionEntity();

        const peliculaSolicitante = await this._peliculaService.obtenerUno(idPeliculaSolicitante);
        const usuarioSolicitante = await this._peliculaService.buscarUsuario(peliculaSolicitante.id);

        const peliculaSolicitada = await this._peliculaService.obtenerUno(idPeliculaSolicitada);
        const usuarioSolicitado = await this._peliculaService.buscarUsuario(peliculaSolicitada.id);

        peticion.peliculaSolicitante = peliculaSolicitante;
        peticion.peliculaSolicitada = peliculaSolicitada;
        peticion.usuarioSolicitante = usuarioSolicitante.actor.usuario;
        peticion.usuarioSolicitado = usuarioSolicitado.actor.usuario;
        peticion.realizada = false;

        //console.log(peticion);
        return await this._peticionRepositorio.save(peticion);

    }


    async obtener(idPeticion){
        return await this._peticionRepositorio.findOne({
            relations: ["peliculaSolicitante","peliculaSolicitada"],
            where: {
                id: idPeticion
            }
        });
    }

    async obtenerTodo(idPeticion){
        return await this._peticionRepositorio.findOne({
            relations: ["usuarioSolicitante","peliculaSolicitante","usuarioSolicitado","peliculaSolicitada"],
            where: {
                id: idPeticion
            }
        });
    }

    async listarEnEspera(idUsuario){
        /// usuario que hizo peticion y espera respuesta
        return await this._peticionRepositorio.find({
            //relations: ["usuarioSolicitante","peliculaSolicitante","usuarioSolicitado","peliculaSolicitada"],
            where: {
                realizada: false,
                usuarioSolicitanteId: idUsuario
            }
        });

    }


    async listarRecibidas(idUsuario){
        /// usuario que recibe peticion y aceptara o rechazara
        return await this._peticionRepositorio.find({
            //relations: ["usuarioSolicitante","peliculaSolicitante","usuarioSolicitado","peliculaSolicitada"],
            where: {
                realizada: false,
                usuarioSolicitadoId: idUsuario
            }
        });

    }

    async aceptarTransferencia(idPeticion){
        const peticion = await this.obtener(idPeticion);
        console.log('Peticion a aceptarse', peticion);
        const peliculaSolicitante = peticion.peliculaSolicitante;
        const peliculaSolicitada = peticion.peliculaSolicitada;
        const actorSolicitante = await this._actorService.buscarPorUsuarioId(peticion.usuarioSolicitanteId);
        const actorSolicitado = await this._actorService.buscarPorUsuarioId(peticion.usuarioSolicitadoId);

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