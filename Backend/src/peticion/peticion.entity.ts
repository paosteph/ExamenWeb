import {Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {UsuarioEntity} from "../usuario/usuario.entity";
import {PeliculaEntity} from "../pelicula/pelicula.entity";

@Entity('peticion')
export class PeticionEntity{
    @PrimaryGeneratedColumn()
    id: number;

    // @Column('int')
    // usuarioSolicitadoId: number;

    // @Column('int')
    // peliculaId: number;

    @Column()
    realizada: boolean;

    @ManyToOne(type => UsuarioEntity, usuario => usuario.peticionesEnviadas)
    usuarioSolicitante: UsuarioEntity;

    @ManyToOne(type => UsuarioEntity, usuario => usuario.peticionesRecibidas)
    usuarioSolicitado: UsuarioEntity;

    @ManyToOne(type => PeliculaEntity, pelicula => pelicula.peticiones)
    pelicula: PeliculaEntity;
}
