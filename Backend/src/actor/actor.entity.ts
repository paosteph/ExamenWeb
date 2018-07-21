import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {PeliculaEntity} from "../pelicula/pelicula.entity";
import {UsuarioEntity} from "../usuario/usuario.entity";

@Entity('actor')
export class ActorEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar",{length: 100})
    nombres: string;

    @Column("varchar",{length: 100})
    apellidos: string;

    @Column({type: "date"})
    fechaNacimiento: Date;

    @Column({type: "int"})
    numeroPeliculas: number;

    @Column()
    retirado: boolean;

    @Column('varchar',{length: 50})
    url_foto_actor: string;

    @OneToMany(type => PeliculaEntity, pelicula => pelicula.actor)
    peliculas: PeliculaEntity[];

    @OneToOne(type => UsuarioEntity, usuario => usuario.actor)
    @JoinColumn()
    usuario: UsuarioEntity;
}