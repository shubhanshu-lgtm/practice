import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import "reflect-metadata";

@Entity('sla_rule')
export class SlaRule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  entityType: string; // e.g., 'WorkRequest', 'Task'

  @Column()
  priority: string; // e.g., 'High', 'Critical'

  @Column()
  resolutionTimeHours: number;

  @Column()
  responseTimeHours: number;

  @Column({ default: true })
  isActive: boolean;
}
