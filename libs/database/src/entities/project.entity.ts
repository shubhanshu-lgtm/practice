import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import "reflect-metadata";
import { Department } from "./department.entity";
import { Lead } from "./lead.entity";
import { Proposal } from "./proposal.entity";
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

  @ManyToOne(() => Lead)
  @JoinColumn({ name: 'leadId' })
  lead: Lead;

  @Column()
  leadId: number;

  @ManyToOne(() => Proposal)
  @JoinColumn({ name: 'proposalId' })
  proposal: Proposal;

  @Column({ nullable: true })
  proposalId: number; // Numeric ID

  @Column({ type: 'timestamp', default: () => 'now()' })
  createdAt: Date;
}
