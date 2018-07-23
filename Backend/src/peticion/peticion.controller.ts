import {Body, Controller, Get, Param, Post, Res} from "@nestjs/common";
import {PeticionService} from "./peticion.service";
import {PeticionEntity} from "./peticion.entity";

@Controller('Peticion')
export class PeticionController{

    constructor(private _peticionService: PeticionService){}

    @Post('crear')
    async crearUna(
        @Body('idPeliculaSolicitante') idPeliculaSolitante,
        @Body('idPeliculaSolicitada') idPeliculaSolicitada,
        @Res() response
        /*@Body('idUsuarioSolicitante') idUsuarioSolicitante,
        @Body('idUsuarioSolicitado') idUsuarioSolicitado*/
    ){
        const peticion = this._peticionService.registrar(idPeliculaSolitante, idPeliculaSolicitada);/*, idUsuarioSolicitante, idUsuarioSolicitado);*/
        if(peticion){
            return response.send({mensaje: 'peticion creada'});
        }else{
            return response.send({mensaje: 'no creada'});
        }

    }

    @Get('obtener/:id')
    async obtener(@Param() paramParams): Promise<PeticionEntity>{
        return this._peticionService.obtener(paramParams.id);
    }

    @Get('obtenerTodo/:id')
    async obtenerTodo(@Param() paramParams): Promise<PeticionEntity>{
        return this._peticionService.obtenerTodo(paramParams.id);
    }

    @Get('listarEnEspera/:id')
    async listarEnviadas(@Param() paramParams){
        return this._peticionService.listarEnEspera(paramParams.id);
    }

    @Get('listarRecibidas/:id')
    async listarRecibidas(@Param() paramParams){
        return this._peticionService.listarRecibidas(paramParams.id);
    }

    @Post('aceptar')
    async aceptarTransferencia(@Body() paramParams){
        return this._peticionService.aceptarTransferencia(paramParams.idPeticion);
    }

    @Post('rechazar')
    async rechazarTransferencia(@Body() paramParams){
        return this._peticionService.rechazar(paramParams.idPeticion);
    }

}