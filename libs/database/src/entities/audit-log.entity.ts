import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import "reflect-metadata";
import { User } from "./user.entity";

@Entity('audit_log')
export class AuditLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  action: string; // e.g., "CREATE", "UPDATE", "DELETE", "LOGIN"

  @Column()
  module: string; // e.g., "Sales", "Auth", "WorkRequest"

  @Column()
  entityId: string; // ID of the entity being affected

  @Column({ type: 'text', nullable: true })
  details: string; // JSON or text description of change

  @Column({ nullable: true })
  ipAddress: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'performedBy' })
  performedBy: User;

  @Column({ type: 'timestamp', default: () => 'now()' })
  performedAt: Date;
}
