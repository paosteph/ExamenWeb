import {PeliculaService} from "../pelicula/pelicula.service";
import {UsuarioModule} from "../usuario/usuario.module";
import {ActorModule} from "../actor/actor.module";
import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PeticionEntity} from "./peticion.entity";
import {PeticionService} from "./peticion.service";
import {PeticionController} from "./peticion.controller";
import {PeliculaModule} from "../pelicula/pelicula.module";

@Module({
    imports: [TypeOrmModule.forFeature([PeticionEntity]), ActorModule, UsuarioModule, PeliculaModule],
    providers: [PeticionService],
    controllers: [PeticionController],
})

export class PeticionModule{}