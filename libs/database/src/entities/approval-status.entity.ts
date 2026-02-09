import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import "reflect-metadata";

@Entity('approval_status')
export class ApprovalStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string; // e.g., "Pending", "Approved", "Rejected", "Clarification Needed"

  @Column({ unique: true })
  code: string;

  @Column({ default: true })
  isActive: boolean;
}
