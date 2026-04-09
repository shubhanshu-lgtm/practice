import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import "reflect-metadata";
import { Department } from "./department.entity";
import { ServiceDeliverable } from "./service-deliverable.entity";
import { SERVICE_TYPE, SERVICE_ACCESS_LEVEL } from "../../../constants/serviceConstants";

@Entity('service_master')
export class ServiceMaster {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  name: string

  @Column({ unique: true })
  code: string

  @Column({ type: 'text', nullable: true })
  description: string

  @Column({ type: 'text', nullable: true })
  timeline?: string

  @Column({ default: true })
  isActive: boolean

  @ManyToOne(() => Department)
  @JoinColumn({ name: 'departmentId' })
  department: Department;

  @Column({ nullable: true })
  departmentId: number;

  @Column({ type: 'timestamp', default: () => 'now()' })
  createdAt: Date

  @ManyToOne(() => ServiceMaster, (service) => service.children, { nullable: true })
  @JoinColumn({ name: 'parentId' })
  parent: ServiceMaster;

  @Column({ nullable: true })
  parentId: number;

  @OneToMany(() => ServiceMaster, (service) => service.parent)
  children: ServiceMaster[];

  @Column({ type: 'int', default: 0 })
  level: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  category: string;

  @Column({
    type: 'enum',
    enum: SERVICE_TYPE,
    nullable: true
  })
  type: SERVICE_TYPE;

  @Column({
    type: 'enum',
    enum: SERVICE_ACCESS_LEVEL,
    default: SERVICE_ACCESS_LEVEL.PUBLIC
  })
  accessLevel: SERVICE_ACCESS_LEVEL;

  @Column({ type: 'json', nullable: true })
  allowedUserGroups: string[];

  @Column({ type: 'json', nullable: true })
  allowedDepartments: number[];

  @Column({ type: 'int', default: 0 })
  sortOrder: number;

  @Column({ type: 'text', nullable: true })
  assignmentGroupId: string;

  @Column({ type: 'text', nullable: true })
  logo: string;

  @OneToMany(() => ServiceDeliverable, (deliverable) => deliverable.service)
  deliverables: ServiceDeliverable[];
}
