import { BadRequestException, Injectable,HttpException,HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateAuthenticationDto } from '../dto/create-authentication.dto';
import { UpdateAuthenticationDto } from '../dto/update-authentication.dto';
import {InjectModel} from '@nestjs/mongoose'
import { User } from 'src/models/user.schema';
import { getUserByEmail } from '../utils/existing';
import { jwtService } from '../services/token.service';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectModel(User.name) private userModel : Model<User>,
    private readonly jwtService:jwtService
    ){}

  async create(createAuthenticationDto: CreateAuthenticationDto) {
    try {
      const data = await getUserByEmail(createAuthenticationDto.email,this.userModel)
      if(data) throw new BadRequestException('This user already exists !!!')
      const result = await this.userModel.create(createAuthenticationDto)
      const token = this.jwtService.generateToken(data.email.toString())
      return {result,token};
    } catch (error) {
      throw error 
    }

  }

  async login(loginBody: CreateAuthenticationDto): Promise<any> {
      const userData = await getUserByEmail(loginBody.email,this.userModel)
      if(!userData) throw new HttpException('user does not exist',HttpStatus.FOUND)
      if (userData.password == loginBody.password) {
        const token = this.jwtService.generateToken(userData.email.toString())
        return {userData,token};      
      }
      else{
        throw new HttpException('Wrong password',HttpStatus.NOT_ACCEPTABLE)
      }
}

  findOne(id: number) {
    return `This action returns a #${id} authentication`;
  }

  update(id: number, updateAuthenticationDto: UpdateAuthenticationDto) {
    return `This action updates a #${id} authentication`;
  }

  remove(id: number) {
    return `This action removes a #${id} authentication`;
  }
}
