import * as Joi from 'joi';

export const ACTOR_SCHEMA = {
    nombres: Joi.string().min(5).max(100).regex(/^[a-zA-Z´\s]+$/).required(),
    apellidos: Joi.string().min(5).max(100).regex(/^[a-zA-Z´\s]+$/).required(),
    fechaNacimiento: Joi.date().required(),
    numeroPeliculas: Joi.number().integer(),
    retirado: Joi.boolean().required(),
    url_foto: Joi.string(),
    idUsuario: Joi.number().required(),
}

export const ACTOR_ID_UPDATE = {
    id: Joi.number().integer().required()
}