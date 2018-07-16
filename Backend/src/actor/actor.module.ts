import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ActorEntity} from "./actor.entity";
import {ActorService} from "./actor.service";
import {ActorController} from "./actor.controller";
import {UsuarioModule} from "../usuario/usuario.module";
import {UsuarioService} from "../usuario/usuario.service";

@Module({
    imports: [TypeOrmModule.forFeature([ActorEntity]), UsuarioModule],
    providers: [ActorService],
    controllers: [ActorController],
    exports: [ActorService],
})

export class ActorModule{}