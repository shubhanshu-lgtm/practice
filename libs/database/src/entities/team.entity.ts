import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import 'reflect-metadata';
import { Department } from './department.entity';
import { User } from './user.entity';

@Entity('team')
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  description: string;

  @ManyToOne(() => Department, (dept) => dept.teams)
  @JoinColumn({ name: 'departmentId' })
  department: Department;

  @Column()
  departmentId: number;

  @ManyToOne(() => User, (user) => user.teamsLed, { nullable: true })
  @JoinColumn({ name: 'teamLeadId' })
  teamLead: User;

  @Column({ nullable: true })
  teamLeadId: number;

  @ManyToMany(() => User, (user) => user.teams)
  @JoinTable({
    name: 'team_members',
    joinColumn: { name: 'teamId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'userId', referencedColumnName: 'id' }
  })
  members: User[];

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
