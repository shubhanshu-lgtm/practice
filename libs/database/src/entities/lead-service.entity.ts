import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import "reflect-metadata";
import { Lead } from "./lead.entity";
import { ServiceMaster } from "./service-master.entity";
import { User } from "./user.entity";
import { Department } from "./department.entity";

export enum SERVICE_STATUS {
    REQUIREMENT_CONFIRMED = 'Requirement Confirmed',
    IN_PROGRESS = 'In Progress',
    ON_HOLD = 'On Hold',
    DROPPED = 'Dropped'
}

@Entity('lead_service')
export class LeadService {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Lead, (lead) => lead.leadServices)
  @JoinColumn({ name: 'leadId' })
  lead: Lead;

  @ManyToOne(() => ServiceMaster)
  @JoinColumn({ name: 'serviceId' })
  service: ServiceMaster;

  @ManyToOne(() => Department)
  @JoinColumn({ name: 'departmentId' })
  department: Department;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'ownerId' })
  owner: User;

  @Column({
    type: 'enum',
    enum: SERVICE_STATUS,
    default: SERVICE_STATUS.REQUIREMENT_CONFIRMED
  })
  status: SERVICE_STATUS;

  @Column({ type: 'date', nullable: true })
  startDate: Date;

  @Column({ type: 'date', nullable: true })
  endDate: Date;

  @Column({ type: 'json', nullable: true })
  deliverables: string[]; // Array of strings e.g., ["Report", "Certificate"]

  @Column({ type: 'text', nullable: true })
  remarks: string;
}
