import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('grade')
export class GradeEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  state: number;
  @Column()
  info: string;
}
