import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import 'reflect-metadata';

@Entity('priority_master')
export class PriorityMaster {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  name: string; // Critical, High, Medium, Low

  @Column({ type: 'int' })
  level: number; // 1-Critical, 2-High, 3-Medium, 4-Low (for sorting)

  @Column({ type: 'varchar', length: 50, nullable: true })
  color: string; // For UI: red, orange, yellow, green

  @Column({ type: 'int', default: 0 })
  displayOrder: number;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
