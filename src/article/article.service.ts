import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { objFilter } from 'src/utils';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/article.dto';
import { ArticleEntity } from './entities/article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
  ) {}

  async create(article: CreateArticleDto) {
    const result = await this.articleRepository.save(article);
    return objFilter<ArticleEntity>(result, ['create_time', 'update_time']);
  }
  async delete(id: string) {
    await this.articleRepository.delete({ id });
    return '文章删除成功';
  }
  test() {
    return 'test';
  }
}
