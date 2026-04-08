import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import "reflect-metadata";
import { Lead } from "./lead.entity";
import { ServiceMaster } from "./service-master.entity";
import { User } from "./user.entity";
import { Department } from "./department.entity";

import { SERVICE_STATUS } from "../../../constants/serviceConstants";

@Entity('lead_service')
export class LeadService {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Lead, (lead) => lead.leadServices)
  @JoinColumn({ name: 'leadId' })
  lead: Lead;

  @Column()
  leadId: number;

  @Column({ nullable: true })
  assignmentGroupId: string;

  @ManyToOne(() => ServiceMaster)
  @JoinColumn({ name: 'serviceId' })
  service: ServiceMaster;

  @Column({ nullable: true })
  serviceId: number;

  @ManyToOne(() => Department)
  @JoinColumn({ name: 'departmentId' })
  department: Department;

  @Column({ nullable: true })
  departmentId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'ownerId' })
  owner: User;

  @Column({ nullable: true })
  ownerId: number;

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
