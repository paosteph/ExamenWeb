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

    @Column('int')
    usuarioSolicitante: number;

    @Column('int')
    usuarioSolicitado: number;

    @Column({nullable: true})
    peliculaSolicitanteId: number;

    @Column({nullable: true})
    peliculaSolicitadaId: number;

    @ManyToOne(type => PeliculaEntity, pelicula => pelicula.peticionesEnviadas)
    peliculaSolicitante: PeliculaEntity;

    @ManyToOne(type => PeliculaEntity, pelicula => pelicula.peticionesRecibidas)
    peliculaSolicitada: PeliculaEntity;
}
