import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
  HttpStatus,
  UsePipes
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateAuthenticationDto } from '../dto/create-authentication.dto';
import { UpdateAuthenticationDto } from '../dto/update-authentication.dto';
import {Request,Response} from 'express'
import { signUpPipe } from 'src/pipes/authentication.pipe';
import { signUpSchema } from 'src/schemas/user.schema';

@Controller('user')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post()
  @UsePipes(new signUpPipe(signUpSchema))
  async create(@Body() createAuthenticationDto: CreateAuthenticationDto,@Res() res:Response) {
      const data =await this.authenticationService.create(createAuthenticationDto);
      console.log('first')
      res.setHeader('Authorization',`Bearer ${data.token}`)
      return res.status(HttpStatus.OK).json({success: 'signed up' , user: data.result, token: data.token });
  }

  @Post('/login')
  async login(@Body() loginBody:CreateAuthenticationDto,@Res() res:Response){
    const data = await this.authenticationService.login(loginBody)
    if (data){
      res.setHeader('Authorization',`Bearer ${data.token}`)
      return res.status(HttpStatus.OK).json({success: 'loged in' , user:data.userData, token: data.token});
    }
   }

  @Get()
  findAll() {
    // return this.authenticationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authenticationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAuthenticationDto: UpdateAuthenticationDto,
  ) {
    return this.authenticationService.update(+id, updateAuthenticationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authenticationService.remove(+id);
  }
}
