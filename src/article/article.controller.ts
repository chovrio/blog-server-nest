import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Request,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto, UpdateArticleDto } from './dto/article.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
  @Get('test')
  test() {
    return this.articleService.test();
  }
  /** 创建文章接口 */
  @Post('create')
  create(@Body() article: CreateArticleDto) {
    return this.articleService.create(article);
  }
  @Patch('')
  patch(@Body() body: UpdateArticleDto) {
    return this.articleService.patch(body.id, body.article);
  }
  /** 删除文章接口 */
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.articleService.delete(id);
  }
}
