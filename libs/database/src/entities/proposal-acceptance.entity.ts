import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Proposal } from './proposal.entity';
import { Lead } from './lead.entity';
import { Department } from './department.entity';

@Entity('proposal_acceptance')
export class ProposalAcceptance {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Proposal)
  @JoinColumn({ name: 'proposalId' })
  proposal: Proposal;

  @Column()
  proposalId: number;

  @OneToOne(() => Lead)
  @JoinColumn({ name: 'leadId' })
  lead: Lead;

  @Column()
  leadId: number;

  @Column({ type: 'date' })
  awardDate: Date;

  @Column({ nullable: true })
  poNumber: string;

  @Column({ nullable: true })
  poFileUrl: string;

  @Column({ default: true })
  billingNameSameAsCustomer: boolean;

  @Column({ nullable: true })
  billToCompanyName: string;

  @Column({ type: 'json', nullable: true })
  billToAddress: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state?: string;
    country: string;
    postalCode?: string;
  };

  @Column({ nullable: true })
  gstNumber: string;

  @Column({ nullable: true })
  gstType: string;

  @Column({ type: 'simple-array', nullable: true })
  billingEmailIds: string[];

  @Column({ type: 'json', nullable: true })
  billingContactPerson: {
    name: string;
    email: string;
    phone?: string;
  };

  @Column({ nullable: true })
  raisedFromEntity: string;

  @ManyToOne(() => Department, { nullable: true })
  @JoinColumn({ name: 'accountDepartmentId' })
  accountDepartment: Department;

  @Column({ nullable: true })
  accountDepartmentId: number;

  @Column({ type: 'simple-array', nullable: true })
  invoiceServices: string[];

  @Column({ nullable: true })
  department: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
