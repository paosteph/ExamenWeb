import {TypeOrmModule} from "@nestjs/typeorm";
import {Module} from "@nestjs/common";
import {PeliculaEntity} from "./pelicula.entity";
import {PeliculaService} from "./pelicula.service";
import {PeliculaController} from "./pelicula.controller";
import {ActorModule} from "../actor/actor.module";
import {UsuarioModule} from "../usuario/usuario.module";

@Module({
    imports: [TypeOrmModule.forFeature([PeliculaEntity]), ActorModule, UsuarioModule],
    providers: [PeliculaService],
    controllers: [PeliculaController],
})

export class PeliculaModule{}