import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {UsuarioEntity} from "./usuario.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class UsuarioService{

    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly _usuarioRepositorio: Repository<UsuarioEntity>,
    ){}

    async listarTodos(): Promise<UsuarioEntity[]>{
        return await this._usuarioRepositorio.find();
    }

    async listarUnUsuario(idUsuario){
        return this._usuarioRepositorio.find({
            relations: ["actores"],
            where: {
                id: idUsuario
            },
            order: {
                nombre: "ASC"
            },
            skip: 0,
            take: 4
        });
    }

    async crearUno(nombre, apellido, correo, password, url_foto){
        const usuario = new UsuarioEntity();
        usuario.nombre = nombre;
        usuario.apellido = apellido;
        usuario.correo = correo;
        usuario.password = password;
        usuario.url_foto = url_foto;

        return await this._usuarioRepositorio.save(usuario);
    }

    async obtenerUno(id: number): Promise<UsuarioEntity>{
        return await this._usuarioRepositorio.findOne(id);
    }

}

// export class Usuario{
//     constructor(
//         public nombre: string,
//         public apellido: string,
//         public correo: string,
//         public password: string,
//         public url_foto_user: string,
//     ){
//
//     }
//}