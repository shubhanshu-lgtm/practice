import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import "reflect-metadata";
import { WorkRequestType } from "./work-request-type.entity";
import { Department } from "./department.entity";

@Entity('routing_rule')
export class RoutingRule {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => WorkRequestType)
  @JoinColumn({ name: 'requestTypeId' })
  requestType: WorkRequestType;

  @ManyToOne(() => Department)
  @JoinColumn({ name: 'departmentId' })
  targetDepartment: Department;

  @Column({ default: true })
  isActive: boolean;
}
