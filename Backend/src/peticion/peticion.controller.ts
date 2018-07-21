import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {PeticionService} from "./peticion.service";
import {PeticionEntity} from "./peticion.entity";

@Controller('Peticion')
export class PeticionController{

    constructor(private _peticionService: PeticionService){}

    @Post('crear')
    async crearUna(
        @Body('idPeliculaSolicitante') idPeliculaSolitante,
        @Body('idPeliculaSolicitada') idPeliculaSolicitada,
        /*@Body('idUsuarioSolicitante') idUsuarioSolicitante,
        @Body('idUsuarioSolicitado') idUsuarioSolicitado*/
    ){
        return this._peticionService.registrar(idPeliculaSolitante, idPeliculaSolicitada);/*, idUsuarioSolicitante, idUsuarioSolicitado);*/
    }

    @Get('obtener/:id')
    async obtener(@Param() paramParams): Promise<PeticionEntity>{
        return this._peticionService.obtener(paramParams.id);
    }

    @Get('listarEnviadas/:id')
    async listarEnviadas(@Param() paramParams){
        return this._peticionService.listarEnviadas(paramParams.id);
    }

    @Get('listarRecibidas/:id')
    async listarRecibidas(@Param() paramParams){
        return this._peticionService.listarRecibidas(paramParams.id);
    }

    @Get('aceptar/:id')
    async aceptarTransferencia(@Param() paramParams){
        return this._peticionService.aceptarTransferencia(paramParams.id);
    }

    @Get('rechazar/:id')
    async rechazarTransferencia(@Param() paramParams){
        return this._peticionService.rechazar(paramParams.id);
    }

}