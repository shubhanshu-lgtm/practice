import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import "reflect-metadata";
import { WorkRequestType } from "./work-request-type.entity";
import { Customer } from "./customer.entity";
import { User } from "./user.entity";
import { Department } from "./department.entity";

export enum WORK_REQUEST_STATUS {
    NEW = 'New',
    ACCEPTED = 'Accepted',
    REJECTED = 'Rejected',
    CLARIFICATION = 'Clarification',
    IN_PROGRESS = 'In Progress',
    COMPLETED = 'Completed'
}

export enum WORK_REQUEST_PRIORITY {
    LOW = 'Low',
    MEDIUM = 'Medium',
    HIGH = 'High',
    CRITICAL = 'Critical'
}

@Entity('work_request')
export class WorkRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  requestId: string;

  @ManyToOne(() => WorkRequestType)
  @JoinColumn({ name: 'requestTypeId' })
  requestType: WorkRequestType;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customerId' })
  customer: Customer;

  @Column({
    type: 'enum',
    enum: WORK_REQUEST_PRIORITY,
    default: WORK_REQUEST_PRIORITY.MEDIUM
  })
  priority: WORK_REQUEST_PRIORITY;

  @Column({ type: 'date', nullable: true })
  targetDeliveryDate: Date;

  @Column({
    type: 'enum',
    enum: WORK_REQUEST_STATUS,
    default: WORK_REQUEST_STATUS.NEW
  })
  status: WORK_REQUEST_STATUS;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'requestedBy' })
  requestedBy: User;

  @ManyToOne(() => Department)
  @JoinColumn({ name: 'departmentId' })
  targetDepartment: Department;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'assignedTo' })
  assignedTo: User;

  @Column({ type: 'timestamp', default: () => 'now()' })
  createdAt: Date;

  @Column({ type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP', nullable: true })
  updatedAt: Date;
}
