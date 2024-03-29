import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User,UserSchema } from 'src/models/user.schema';
import { jwtService } from '../services/token.service';

@Module({
  imports:[MongooseModule.forFeature([{name:User.name,schema:UserSchema}])],
  controllers: [AuthenticationController],
  providers: [AuthenticationService,jwtService]
})
export class AuthenticationModule {}
