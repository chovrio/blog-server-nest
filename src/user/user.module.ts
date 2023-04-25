import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import {
  InfoMiddleWare,
  LoginMiddleWare,
  RegistoryMiddleWare,
} from './user.middleware';
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(InfoMiddleWare, RegistoryMiddleWare)
      .forRoutes('user/registory');
    consumer.apply(InfoMiddleWare, LoginMiddleWare).forRoutes('user/login');
  }
}
