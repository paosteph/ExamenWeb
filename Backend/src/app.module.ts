import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {PeliculaService} from "./pelicula/pelicula.service";
import {Connection} from "typeorm";
import {UsuarioService} from "./usuario/usuario.service";
import {ActorModule} from "./actor/actor.module";
import {UsuarioModule} from "./usuario/usuario.module";
import {PeliculaModule} from "./pelicula/pelicula.module";
import {AutorizacionController} from "./autorizacion.controller";
import {UsuarioEntity} from "./usuario/usuario.entity";
import {ActorEntity} from "./actor/actor.entity";
import {PeliculaEntity} from "./pelicula/pelicula.entity";
import {ActorService} from "./actor/actor.service";
import {UsuarioController} from "./usuario/usuario.controller";
import {PeticionModule} from "./peticion/peticion.module";

@Module({
  imports: [
      TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: 'root',
          database: 'examenweb',
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          synchronize: true,
      }),
      //TypeOrmModule.forFeature([UsuarioEntity, ActorEntity, PeliculaEntity]),
      ActorModule,
      UsuarioModule,
      PeliculaModule,
      PeticionModule,
  ],
  controllers: [AppController, AutorizacionController],
  providers: [AppService],
})
export class AppModule {
    constructor(private readonly connection: Connection) {}
}
