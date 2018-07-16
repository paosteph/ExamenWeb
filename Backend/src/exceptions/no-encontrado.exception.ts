import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {createHttpExceptionBody} from "@nestjs/common/utils/http-exception-body.util";

@Injectable()
export class NoEncontradoException extends HttpException{
    constructor(private _mensaje, private _error, private _nivelError){
        super(
            createHttpExceptionBody(_mensaje, _error, HttpStatus.NOT_FOUND),
            HttpStatus.NOT_FOUND,
        );
    }
}