import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import "reflect-metadata";

@Entity('intercert_partner_user')
export class IntercertPartnerUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  username: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  company: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  mobile: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  city: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  state: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  country: string;

  @Column({ type: 'int', default: 0 })
  active: number; // 0 for Inactive, 1 for Active

  @Column({ type: 'int', default: 0 })
  auditorCount: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  status: string; // e.g., 'Active', 'Inactive'
}
