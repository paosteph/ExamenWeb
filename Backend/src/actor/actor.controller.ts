import {Body, Controller, Get, Param, Post, Put, UsePipes} from "@nestjs/common";
import {ActorService} from "./actor.service";
import {ActorEntity} from "./actor.entity";
import {ActorPipe} from "./actor.pipe";
import {ACTOR_SCHEMA} from "./actor.schema";

@Controller('Actor')
export class ActorController{
    constructor(private _actorService: ActorService) {
    }

    @Get('listar')
    async listarTodos(){
        return this._actorService.listarActores();
    }

    @Get('listarPeliculas/:id')
    async listarActoresUnUsuario(@Param() paramParams){
        return this._actorService.listarActorPeliculas(paramParams.id);
    }

    @Post('crear')
    //@UsePipes(new ActorPipe(ACTOR_SCHEMA))
    async crearUno(
        @Body('nombres') nombres, @Body('apellidos') apellidos, @Body('fechaNacimiento') fechaNacimiento,
        @Body('numeroPeliculas') numeroPeliculas, @Body('retirado') retirado, @Body('url_foto') url_foto,
        @Body('idUsuario') idUsuario
    ){
        return this._actorService.crearUno(
            nombres, apellidos, fechaNacimiento, numeroPeliculas, retirado, url_foto, idUsuario);
    }

    @Get('obtener/:id')
    async obtenerUno(@Param() paramParams): Promise<ActorEntity> {
        return this._actorService.obtenerUno(paramParams.id);
    }

    @Get('buscarPorUsuario/:id')
    async buscarPorUsuario(@Param() paramParams): Promise<ActorEntity> {
        return this._actorService.buscarPorUsuario(paramParams.id);
    }


    @Post('buscarLike')
    async encontrarActoresLike(@Body('palabra') palabra){
        return this._actorService.encontrarActoresLike(palabra);
    }

}