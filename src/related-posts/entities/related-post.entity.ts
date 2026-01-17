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
  image: string; // URL completa de la imagen

  @Column()
  author: string;

  @Column()
  readTime: number;

  @CreateDateColumn()
  createdAt: Date;
}
