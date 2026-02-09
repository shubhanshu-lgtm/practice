import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import 'reflect-metadata';
import { User } from './user.entity';
import { LeadContact } from './lead-contact.entity';
// @ts-ignore - Circular dependency resolution
import { LeadAddress } from './lead-address.entity';

@Entity('lead_enquiry')
export class LeadEnquiry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  enquiryId: string; // IS/26/01/15/01

  @Column({ type: 'varchar', length: 100, nullable: true })
  enquiryReference: string;

  @Column({ type: 'varchar', length: 100 })
  companyName: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  customerId: string; // IS/ABCT/IND

  @Column({ type: 'varchar', length: 50 })
  leadSource: string; // Google Ads, LinkedIn, Website, etc.

  @Column({ type: 'varchar', length: 500, nullable: true })
  sourceDescription: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  businessActivities: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  headcount: string; // 1-10, 11-50, 51-200, etc.

  @Column({ type: 'varchar', length: 50, default: 'New' })
  leadStatus: string; // New, Qualified, In Progress, Converted, Rejected

  @Column({ type: 'text', nullable: true })
  notes: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'createdById' })
  createdBy: User;

  @Column({ nullable: true })
  createdById: number;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'updatedById' })
  updatedBy: User;

  @Column({ nullable: true })
  updatedById: number;

  @OneToMany(() => LeadContact, (contact) => contact.lead, { cascade: true, eager: true })
  contacts: LeadContact[];

  // @ts-ignore - Circular dependency resolution
  @OneToMany(() => LeadAddress, (address) => address.lead, { cascade: true, eager: true })
  addresses: LeadAddress[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
