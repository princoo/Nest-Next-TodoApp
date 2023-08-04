import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateAuthenticationDto } from '../dto/create-authentication.dto';
import { UpdateAuthenticationDto } from '../dto/update-authentication.dto';
import {InjectModel} from '@nestjs/mongoose'
import { User } from 'src/shcemas/user.schema';
import { getUserByEmail } from '../utils/existing';
import { jwtService } from './token.service';

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
      const token = this.jwtService.generateToken(result._id.toString())
      return {result,token};
    } catch (error) {
      throw error 
    }

  }

  findAll() {
    return `This action returns all authentication`;
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
