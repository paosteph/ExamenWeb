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
      ActorModule,
      UsuarioModule,
      PeliculaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
    constructor(private readonly connection: Connection) {}
}
