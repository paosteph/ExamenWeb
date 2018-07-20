import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {UsuarioEntity} from "./usuario.entity";
import {UsuarioService} from "./usuario.service";

@Controller('Usuario')
export class UsuarioController{

    constructor(private _usuarioService: UsuarioService){}

    @Get('listar')
    async listarTodos(){
        return this._usuarioService.listarTodos();
    }

    @Get('listarPorActor/:id')
    async listarElementosUsuario(@Param() paramParams){
        return this._usuarioService.listarActoresPorUsuario(paramParams.id);
    }

    // @Get('listarUsuarioTodo/:id')
    // async listarUsuarioTodo(@Param() paramParams){
    //     return this._usuarioService.listarUsuarioTodo(paramParams.id);
    // }

    @Get('obtener/:id')
    async obtenerUno(@Param() paramParams): Promise<UsuarioEntity> {
        return this._usuarioService.obtenerUno(paramParams.id);
    }

    @Post('crear')
    async crearUno(
        @Body('nombre') nombre, @Body('apellido') apellido, @Body('correo') correo,
        @Body('password') password, @Body('url_foto') url_foto
    ){
        return this._usuarioService.crearUno(nombre, apellido, correo, password, url_foto);
    }

    @Post('buscarLike')
    async encontrarUsuariosLike(@Body('palabra') palabra){
        return this._usuarioService.encontrarActoresLike(palabra);
    }
}