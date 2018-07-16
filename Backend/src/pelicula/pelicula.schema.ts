import * as Joi from 'joi';

export const PELICULA_SCHEMA = Joi.object().keys({
    idPelicula: Joi.number().integer().required(),
    nombre: Joi.string().min(5).max(50).regex(/^[a-zA-Z0-9´\s]*$/).required(),
    anioLanzamiento: Joi.number().integer(),
    rating: Joi.number().integer(),
    actoresPrincipales: Joi.string().regex(/^[a-zA-Z,´\s]+$/),
    sinopsis: Joi.string().regex(/^[a-zA-Z0-9,;:.´\s]+$/),
    actorId: Joi.number().integer()
});