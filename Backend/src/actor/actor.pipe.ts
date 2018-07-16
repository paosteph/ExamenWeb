import {ArgumentMetadata, BadRequestException, Injectable, PipeTransform} from "@nestjs/common";
import {NoEncontradoException} from "../exceptions/no-encontrado.exception";
import * as Joi from 'joi';

@Injectable()
export class ActorPipe implements PipeTransform{
    constructor(private readonly schema){}
    transform(valorRequest: any, metadatos: ArgumentMetadata){
        const {error} = Joi.validate(valorRequest, this.schema);
        if(error){
            throw new NoEncontradoException(
                'No encontrado',
                error,
                4
            )
        }
        return valorRequest;
    }
}