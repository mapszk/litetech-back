import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('related_posts')
export class RelatedPost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  image: string;

  @Column()
  author: string;

  @Column()
  readTime: number;

  @CreateDateColumn()
  createdAt: Date;
}
