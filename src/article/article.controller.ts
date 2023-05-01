import { Controller, Get, Post } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/article.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
  @Get('test')
  test() {
    return this.articleService.test();
  }
  @Post('create')
  create(article: CreateArticleDto) {
    return this.articleService.create(article);
  }
}
