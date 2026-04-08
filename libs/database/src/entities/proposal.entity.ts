import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { Lead } from './lead.entity';
import { ProposalItem } from './proposal-item.entity';
import { ProposalPaymentTerm } from './proposal-payment-term.entity';
import { ProposalFile } from './proposal-file.entity';

export enum PROPOSAL_STATUS {
  DRAFT = 'Draft',
  SUBMITTED = 'Submitted',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
  REVISED = 'Revised',
  EXPIRED = 'Expired',
  DROPPED = 'Dropped'
}

export enum PROPOSAL_DIVISION {
  GRC_DIVISION = 'GRC DIVISION',
  VAPT_DIVISION = 'VAPT DIVISION',
  CERTIFICATION_DIVISION = 'CERTIFICATION DIVISION'
}

export enum SUBMITTED_BY {
  CLIENT = 'Client',
  ADMIN = 'Admin',
  INTERCERT_NOIDA = 'Intercert Noida',
  INTERCERT_BANGALORE = 'Intercert Bangalore',
  INTERCERT = 'Intercert'

}


@Entity('proposal')
export class Proposal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  proposalReference: string;

  @Column({ default: 1 })
  version: number;

  @Column({ type: 'date' })
  proposalDate: Date;

  @Column({ type: 'date', nullable: true })
  validUntil?: Date;

  @Column({
    type: 'enum',
    enum: PROPOSAL_STATUS,
    default: PROPOSAL_STATUS.DRAFT
  })
  status: PROPOSAL_STATUS;

  @Column({
    type: 'enum',
    enum: PROPOSAL_DIVISION,
    default: PROPOSAL_DIVISION.CERTIFICATION_DIVISION
  })
  division: PROPOSAL_DIVISION;

  @Column({
    type: 'enum',
    enum: SUBMITTED_BY,
    default: SUBMITTED_BY.INTERCERT_NOIDA
  })
  submittedBy: SUBMITTED_BY;

  @Column({ nullable: true })
  subject?: string;

  @Column({ type: 'text', nullable: true })
  introduction?: string;

  @Column({ type: 'text', nullable: true })
  termsAndConditions?: string;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  subTotal: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  totalDiscount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  totalTaxAmount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  grandTotal: number;

  @Column({ length: 3, default: 'INR' })
  currency: string;

  @ManyToOne(() => Lead, (lead) => lead.proposals)
  @JoinColumn({ name: 'leadId' })
  lead: Lead;

  @Column({ nullable: true })
  leadId?: number;

  @Column({ nullable: true })
  assignmentGroupId?: string;

  @OneToMany(() => ProposalItem, (item) => item.proposal, { cascade: true })
  items: ProposalItem[];

  @OneToMany(() => ProposalPaymentTerm, (term) => term.proposal, { cascade: true })
  paymentTerms: ProposalPaymentTerm[];

  @OneToMany(() => ProposalFile, (file) => file.proposal, { cascade: true })
  files: ProposalFile[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
