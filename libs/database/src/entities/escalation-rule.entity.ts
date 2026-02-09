import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import "reflect-metadata";

@Entity('escalation_rule')
export class EscalationRule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  slaRuleId: number;

  @Column()
  level: number; // 1, 2, 3

  @Column()
  escalateToRole: string; // 'Manager', 'Admin'

  @Column()
  triggerAfterHours: number;

  @Column({ default: true })
  isActive: boolean;
}
