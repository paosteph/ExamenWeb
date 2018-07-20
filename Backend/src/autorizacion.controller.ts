import {Body, Controller, HttpException, HttpStatus, Post, Res} from "@nestjs/common";
import {PeticionMalaException} from "./exceptions/peticion-mala.exception";
import {UsuarioService} from "./usuario/usuario.service";
import {UsuarioEntity} from "./usuario/usuario.entity";

@Controller('Autorizacion')
export class AutorizacionController{

    constructor(private _usuarioService: UsuarioService){}

    @Post('iniciarSesion')
    async iniciarSesion(@Body() bodyParams, @Res() response){

        const correo = bodyParams.correo;
        const password = bodyParams.password;

        console.log(correo);
        console.log(password);

        const usuario:UsuarioEntity = await this._usuarioService.verificarExiste(correo, password);

        //if(correo == 'adrianeguez' && password == 12345678910){
        if(usuario){
            const cokie = {
                nombre: 'web',
                valor: usuario.nombre + usuario.apellido
            };
            return response.cookie(cokie.nombre, cokie.valor)
                .send({mensaje: usuario.id});
        }else{
            return response.send({mensaje:"No existe usuario"});
        }
    }

    @Post('cerrarSesion')
    cerrarSesion(@Res() response){
        const cokie = {
            nombre: 'web',
            valor: 'undefined'
        };

        return response.cookie(cokie.nombre, cokie.valor).send({mensaje:'Usted salio del sistema'});

    }
}