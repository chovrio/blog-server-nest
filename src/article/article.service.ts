import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
    // this.articleRepository.save(article);
    return '111';
  }
  test() {
    return 'test';
  }
}
