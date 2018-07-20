import {Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {ActorEntity} from "../actor/actor.entity";
import {PeticionEntity} from "../peticion/peticion.entity";

@Entity('usuario')
export class UsuarioEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 50})
    nombre: string;

    @Column({length: 50})
    apellido: string;

    @Column({length: 50})
    correo: string;

    @Column({length: 25})
    password: string;

    @Column({length: 50})
    url_foto: string;

    @OneToMany(type => ActorEntity, actor => actor.usuario)
    actores: ActorEntity[];

    @OneToMany(type => PeticionEntity, peticion => peticion.usuarioSolicitado)
    peticionesRecibidas: PeticionEntity[];

    @OneToMany(type => PeticionEntity, peticion => peticion.usuarioSolicitante)
    peticionesEnviadas: PeticionEntity[];

}