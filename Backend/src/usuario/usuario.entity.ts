import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ActorEntity} from "../actor/actor.entity";

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
    actores: ActorEntity[]
}