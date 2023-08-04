import { Module,NestModule,MiddlewareConsumer,RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthenticationController } from './authentication/authentication.controller';
import { signUpData } from './authentication/middlewares/validate.middleware';

@Module({
  imports: [
    AuthenticationModule,
    MongooseModule.forRoot(
      'mongodb+srv://princo:OU6nx8E4lZcogCuJ@cluster0.i0nhr.mongodb.net/store?retryWrites=true&w=majority',
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
