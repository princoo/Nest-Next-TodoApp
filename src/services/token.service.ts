import { Injectable } from "@nestjs/common";
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'

@Injectable()
export class jwtService{
private readonly secretKey:string = process.env.JWT_SECRET;

generateToken(payload:any):string{
    return jwt.sign(payload, this.secretKey); 
}

verifyToken(token:string):any{
    try {
        return jwt.verify(token, this.secretKey);
      } catch (error) {
        return null;
      }}
}