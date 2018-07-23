import {Body, Controller, Get, Param, Post, UsePipes} from "@nestjs/common";
import {PeliculaService} from "./pelicula.service";
import {PeliculaEntity} from "./pelicula.entity";
import {ActorPipe} from "../actor/actor.pipe";
import {ACTOR_SCHEMA} from "../actor/actor.schema";

@Controller('Pelicula')
export class PeliculaController{

    constructor(private _peliculaService: PeliculaService){}

    @Get('listar')
    async listarTodas(): Promise<PeliculaEntity[]>{
        return this._peliculaService.listarTodas();
    }

    @Get('listarCuatro/:inicio')
    async listarCuatro(@Param() paramParams){
        return this._peliculaService.listarCuatro(paramParams.inicio);
    }

    @Get('listarOcho/:idAutor/:cantidad')
    async listarOcho(@Param() paramParams){
        return this._peliculaService.listarMasOcho(paramParams.idAutor, paramParams.cantidad);
    }

    @Post('crear')
    //@UsePipes(new ActorPipe(ACTOR_SCHEMA))
    async crearUno(
        @Body('nombre') nombre, @Body('anioLanzamiento') anioLanzamiento, @Body('rating') rating,
        @Body('actoresPrincipales') actoresPrincipales, @Body('sinopsis') sinopsis, @Body('idActor') idActor
    ){
        return this._peliculaService.crearUno(
            nombre, anioLanzamiento, rating, actoresPrincipales, sinopsis, idActor);
    }

    @Get('obtener/:id')
    async obtenerUno(@Param() paramParams): Promise<PeliculaEntity> {
        return this._peliculaService.obtenerUno(paramParams.id);
    }

    @Get('buscarUsuario/:id')
    async buscarUsuario(@Param() paramParams){
        return this._peliculaService.buscarUsuario(paramParams.id);
    }

    @Post('transferir')
    async transferir(
        @Body('idPelicula') idPelicula, @Body('idSolicitante') idSolicitante
    ){
        return this._peliculaService.pedirTransferencia(idPelicula, idSolicitante);
    }

    @Post('aceptar')
    async aceptarTransferencia(@Body('idPelicula') idPelicula){
        return this._peliculaService.aceptarTrasnferencia(idPelicula);
    }

    @Post('rechazar')
    async rechazarTransferencia(@Body('idPelicula') idPelicula){
        return this._peliculaService.rechazarTrasnferencia(idPelicula);
    }

    @Post('buscarLike')
    async buscarPeliculaLike(@Body() bodyParams){
        return this._peliculaService.encontrarActoresLike(bodyParams.palabra);
    }
}