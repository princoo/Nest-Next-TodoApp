import { Injectable,NestMiddleware,BadRequestException } from "@nestjs/common";
import {request,response,NextFunction} from "express";

@Injectable()
export class signUpData implements NestMiddleware{
    use(req: any, res: any, next: (error?: any) => void) {
        console.log('first middleware')
        const {username,email,password} = req.body;
        if( !username || !email || !password){
            throw new  BadRequestException('please fill all the fields')
        }
        next();
    }
}