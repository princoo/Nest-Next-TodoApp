import { Injectable,PipeTransform,ArgumentMetadata,BadRequestException } from "@nestjs/common";
import {ObjectSchema} from 'joi'

export class signUpPipe implements PipeTransform {
    constructor (private readonly schema:ObjectSchema){}

    transform(value:any,metadata:ArgumentMetadata){
        const {error} = this.schema.validate(value)
        if(error){
            throw new BadRequestException('validation failed !!!')
        }
        return value
    }
}