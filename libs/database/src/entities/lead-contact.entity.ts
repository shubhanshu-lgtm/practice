import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import 'reflect-metadata';
import { LeadEnquiry } from './lead-enquiry.entity';

@Entity('lead_contact')
export class LeadContact {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => LeadEnquiry, (lead) => lead.contacts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'leadId' })
  lead: LeadEnquiry;

  @Column()
  leadId: number;

  @Column({ type: 'varchar', length: 100 })
  contactName: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  designation: string;

  @Column({ type: 'varchar', length: 100 })
  email: string;

  @Column({ type: 'varchar', length: 20 })
  phone: string; // Includes country code

  @Column({ default: false })
  isPrimary: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
