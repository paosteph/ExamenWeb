import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ActorEntity} from "../actor/actor.entity";
import {PeticionEntity} from "../peticion/peticion.entity";

@Entity('pelicula')
export class PeliculaEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', {length:50})
    nombre: string;

    @Column({type: 'int'})
    anioLanzamiento: number;

    @Column('int')
    rating: number;

    @Column('varchar', {length: 200})
    actoresPrincipales: string;

    @Column('varchar', {length: 500})
    sinopsis: string;

    @Column()
    solicitudTransferencia: boolean;

    @Column('int')
    solicitanteId: number;

    @ManyToOne(type => ActorEntity, actor => actor.peliculas)
    actor: ActorEntity

    @OneToMany(type => PeticionEntity, peticion => peticion.pelicula)
    peticiones: PeticionEntity[];
}