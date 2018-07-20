import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {UsuarioEntity} from "./usuario.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {ActorService} from "../actor/actor.service";
import {ActorEntity} from "../actor/actor.entity";

@Injectable()
export class UsuarioService{

    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly _usuarioRepositorio: Repository<UsuarioEntity>,
        //private _actorService: ActorService,
    ){}

    async listarTodos(): Promise<UsuarioEntity[]>{
        return await this._usuarioRepositorio.find({
            order: {
                nombre: 'ASC'
            }
        });
    }

    async listarActoresPorUsuario(idUsuario){
        return this._usuarioRepositorio.find({
            relations: ["actores"],
            where: {id: idUsuario}
        });
    }

    // async listarUsuarioTodo(idUsuario){
    //     const actoresUsuario = await this.listarPorUsuario(idUsuario);
    //     return this._actorService.listarPeliculasUnActor(actoresUsuario.id);
    // }

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

    async verificarExiste(correo, password){
        return await this._usuarioRepositorio.findOne({
            where: {correo: correo, password: password}
        });

    }

    async encontrarActoresLike(palabra: string){
        return await this._usuarioRepositorio
            .createQueryBuilder("usuario")
            .where("upper(usuario.nombre) like :palabra", {palabra: '%'+palabra+'%'})
            .orWhere("upper(usuario.apellido) like :palabra", {palabra: '%'+palabra+'%'})
            .getMany();

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