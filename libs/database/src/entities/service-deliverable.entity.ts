import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import "reflect-metadata";
import { ServiceMaster } from "./service-master.entity";

@Entity('service_deliverable')
export class ServiceDeliverable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'date', nullable: true })
  dueDate: Date;

  @Column({ type: 'boolean', default: false })
  isCompleted: boolean;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @ManyToOne(() => ServiceMaster, (service) => service.deliverables, { nullable: false })
  @JoinColumn({ name: 'serviceId' })
  service: ServiceMaster;

  @Column()
  serviceId: number;

  @Column({ type: 'int', default: 0 })
  sortOrder: number;

  @Column({ type: 'timestamp', default: () => 'now()' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'now()', onUpdate: 'now()' })
  updatedAt: Date;
}
