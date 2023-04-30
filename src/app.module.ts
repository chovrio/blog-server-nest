import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { getConfig } from './utils';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MYSQL_DATABASE_CONFIG } from './common/database/database.providers';
import { GradeModule } from './grade/grade.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './common/jwt.strategy';
import { AuthMiddleWare } from './app.middleware';
import { DemoModule } from './demo/demo.module';
import { ArticleModule } from './article/article.module';

const { JWT_SECRET } = getConfig();
@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      load: [getConfig],
    }),
    TypeOrmModule.forRoot({
      ...MYSQL_DATABASE_CONFIG,
    }),
    JwtModule.register({
      secret: JWT_SECRET.value,
      signOptions: {
        expiresIn: '30d',
      },
    }),
    UserModule,
    GradeModule,
    DemoModule,
    ArticleModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleWare)
      .exclude({ path: 'user/login', method: RequestMethod.POST })
      .exclude({ path: 'user/register', method: RequestMethod.POST })
      .forRoutes('*');
  }
}
