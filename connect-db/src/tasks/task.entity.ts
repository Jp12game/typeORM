import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Category } from '../categories/category.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  titulo!: string;

  @Column({ nullable: true })
  descripcion!: string;

  @Column({ default: false })
  completada!: boolean;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  fechaCreacion!: Date;

  @ManyToOne(() => User, (user) => user.tareas, { eager: true })
  user!: User;

  @ManyToOne(() => Category, (category) => category.tareas, { eager: true })
  categoria!: Category;
}
