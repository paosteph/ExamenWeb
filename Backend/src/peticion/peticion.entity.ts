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

    @Column({nullable: true})
    usuarioSolicitanteId: number;

    @ManyToOne(type => UsuarioEntity, usuario => usuario.peticionesEnviadas)
    usuarioSolicitante: UsuarioEntity;

    @Column({nullable: true})
    peliculaSolicitanteId: number;

    @ManyToOne(type => PeliculaEntity, pelicula => pelicula.peticionesEnviadas)
    peliculaSolicitante: PeliculaEntity;

    @Column({nullable: true})
    usuarioSolicitadoId: number;

    @ManyToOne(type => UsuarioEntity, usuario => usuario.peticionesRecibidas)
    usuarioSolicitado: UsuarioEntity;

    @Column({nullable: true})
    peliculaSolicitadaId: number;

    @ManyToOne(type => PeliculaEntity, pelicula => pelicula.peticionesRecibidas)
    peliculaSolicitada: PeliculaEntity;


}
