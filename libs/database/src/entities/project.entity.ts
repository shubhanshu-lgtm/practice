import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import "reflect-metadata";
import { Department } from "./department.entity";
import { Lead } from "./lead.entity";
import { Proposal } from "./proposal.entity";
import { Team } from "./team.entity";
import { User } from "./user.entity";
import { PROJECT_STATUS } from "../../../constants/salesConstants";

@Entity('project')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  projectCode: string;

  @Column()
  name: string;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date', nullable: true })
  endDate: Date;

  @Column({
    type: 'enum',
    enum: PROJECT_STATUS,
    default: PROJECT_STATUS.PENDING
  })
  status: PROJECT_STATUS;

  @ManyToOne(() => Department)
  @JoinColumn({ name: 'departmentId' })
  department: Department;

  @Column()
  departmentId: number;

  @ManyToOne(() => Team, { nullable: true })
  @JoinColumn({ name: 'teamId' })
  team: Team;

  @Column({ nullable: true })
  teamId: number;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'assignedToUserId' })
  assignedToUser: User;

  @Column({ nullable: true })
  assignedToUserId: number;

  @ManyToOne(() => Lead)
  @JoinColumn({ name: 'leadId' })
  lead: Lead;

  @Column()
  leadId: number;

  @ManyToOne(() => Proposal)
  @JoinColumn({ name: 'proposalId' })
  proposal: Proposal;

  @Column({ nullable: true })
  proposalId: number;

  @Column({ nullable: true })
  closureId: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
