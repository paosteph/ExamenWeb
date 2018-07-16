import {Body, Controller, HttpException, HttpStatus, Post, Res} from "@nestjs/common";
import {PeticionMalaException} from "./exceptions/peticion-mala.exception";

@Controller('Autorizacion')
export class AutorizacionController{

    @Post('iniciarSesion')
    iniciarSesion(@Body() bodyParams, @Res() response){

        const usuario = bodyParams.usuario;
        const password = bodyParams.password;

        const cokie = {
            nombre: 'token',
            valor: 'adrianeguez'
        };
        console.log(cokie.nombre);
        console.log(cokie.valor);
        if(usuario == 'adrianeguez' && password == 12345678910){
            return response.cookie(cokie.nombre, cokie.valor).send({mensaje: "Ok"});
        }else{
            return response.send({mensaje:"No crea cookie"});
        }
    }

    @Post('cerrarSesion')
    cerrarSesion(@Res() response){
        const cokie = {
            nombre: 'token',
            valor: 'undefined'
        };

        return response.cookie(cokie.nombre, cokie.valor).send({mensaje:'Usted salio del sistema'});

    }
}