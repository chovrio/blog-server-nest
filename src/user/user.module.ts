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
import { JwtModule } from '@nestjs/jwt';
import { getConfig } from 'src/utils';
import { JwtStrategy } from 'src/common/jwt.strategy';
const { JWT_SECRET } = getConfig();
@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: JWT_SECRET.value,
      signOptions: {
        expiresIn: '30d',
      },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(InfoMiddleWare, RegistoryMiddleWare)
      .forRoutes('user/registory');
    consumer.apply(InfoMiddleWare, LoginMiddleWare).forRoutes('user/login');
  }
}
