import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasicValidateMiddleware } from 'src/middleware/basic.middleware';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { ArticleEntity } from './entities/article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity])],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        BasicValidateMiddleware({
          name: '请传入文章标题',
          author: '请传入文章作者',
          content: '请输入文章内容',
        }),
      )
      .forRoutes('article/create');
  }
}
