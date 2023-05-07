export class CreateArticleDto {
  name: string;
  author: string;
  info: string;
  content: string;
}
export class UpdateArticleDto {
  id: string;
  article: {
    name?: string;
    info?: string;
    content?: string;
    tag?: string;
  };
}
