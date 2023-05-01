// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { SALT_WORK_FACTOR } from 'src/common/constants';
import { ArticleEntity } from 'src/article/entities/article.entity';
@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string; // 标记为主链，值自动生成
  @Column({ length: 20 })
  @OneToOne(() => ArticleEntity, (article) => article.author)
  @Unique([])
  name: string; // 用户名 唯一
  @Column({ length: 100 })
  password: string; // 密码
  @Column({ default: '这个用户很懒，什么也没留下' })
  info: string; // 个人信息
  @Column('simple-enum', {
    default: 'visitor',
    enum: ['root', 'author', 'visitor'],
  })
  role: string; // 用户等级
  @Column({ default: 'default.png' })
  avactor: string; // 头像

  @OneToMany(() => ArticleEntity, (article) => article.author)
  articles: ArticleEntity[];
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_time: Date; // 创建时间
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  update_time: Date; // 更新时间
  /** 在插入数据前通过bcryptjs对密码进行加密 */
  @BeforeInsert()
  async encryptPwd() {
    const salt = await bcrypt.genSaltSync(SALT_WORK_FACTOR);
    this.password = bcrypt.hashSync(this.password, salt);
  }
}
