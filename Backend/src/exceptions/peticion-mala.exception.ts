import {HttpException, HttpStatus, Injectable} from "@nestjs/common";

@Injectable()
export class PeticionMalaException extends HttpException{
    constructor(private _mensaje, private _statusCode) {
        super({
            mensaje: _mensaje,
            status: _statusCode
        },
            HttpStatus.BAD_REQUEST
        );
    }
}