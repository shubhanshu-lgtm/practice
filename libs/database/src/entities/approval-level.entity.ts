import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import "reflect-metadata";

@Entity('approval_level')
export class ApprovalLevel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string; // e.g., "Level 1", "Manager Approval", "Finance Approval"

  @Column({ default: 1 })
  sequence: number;

  @Column({ nullable: true })
  description: string;

  @Column({ default: true })
  isActive: boolean;
}
