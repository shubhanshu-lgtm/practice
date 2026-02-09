import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import "reflect-metadata";

@Entity('work_request_type')
export class WorkRequestType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string; // VAPT, Audit, GRC, Invoice, etc.

  @Column({ unique: true })
  code: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: true })
  isActive: boolean;
}
