import { Module,NestModule,MiddlewareConsumer,RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { MongooseModule } from '@nestjs/mongoose';
import { signUpData } from './authentication/middlewares/validate.middleware';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    AuthenticationModule,
    MongooseModule.forRoot(
      process.env.MONGO_URL,
    ),
  ],
  controllers: [AppController,],
  providers: [AppService],
})
export class AppModule  implements NestModule{
configure(consumer:MiddlewareConsumer){
  consumer.apply(signUpData)
  .forRoutes({path:'user',method:RequestMethod.POST})
}
}
