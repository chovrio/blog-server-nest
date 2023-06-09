import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasicValidateMiddleware } from 'src/middleware/basic.middleware';
import { ArticleController } from './article.controller';
import {
  ValidateArticleMiddleware,
  ValidateAuthorMiddleware,
} from './article.middleware';
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
        ValidateAuthorMiddleware,
      )
      .forRoutes('article/create');
    consumer
      .apply(ValidateArticleMiddleware)
      .forRoutes({ path: 'article/:id', method: RequestMethod.DELETE });
    consumer
      .apply(ValidateArticleMiddleware)
      .forRoutes({ path: 'article', method: RequestMethod.PATCH });
  }
}
