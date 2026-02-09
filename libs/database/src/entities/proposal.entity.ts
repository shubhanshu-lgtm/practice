import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { Lead } from './lead.entity';
import { ProposalItem } from './proposal-item.entity';

export enum PROPOSAL_STATUS {
  DRAFT = 'Draft',
  SUBMITTED = 'Submitted',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
  REVISED = 'Revised'
}

@Entity('proposal')
export class Proposal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  proposalReference: string;

  @Column({ type: 'date' })
  proposalDate: Date;

  @Column({ type: 'date', nullable: true })
  validUntil: Date;

  @Column({
    type: 'enum',
    enum: PROPOSAL_STATUS,
    default: PROPOSAL_STATUS.DRAFT
  })
  status: PROPOSAL_STATUS;

  @Column()
  submittedBy: string; // Legal Entity ID/Name

  @Column({ nullable: true })
  subject: string;

  @Column({ type: 'text', nullable: true })
  introduction: string;

  @Column({ type: 'text', nullable: true })
  termsAndConditions: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  totalAmount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  taxAmount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  grandTotal: number;

  @Column({ length: 3, default: 'USD' })
  currency: string;

  @ManyToOne(() => Lead, (lead) => lead.proposals)
  @JoinColumn({ name: 'leadId' })
  lead: Lead;

  @Column({ nullable: true })
  leadId: number;

  @OneToMany(() => ProposalItem, (item) => item.proposal, { cascade: true })
  items: ProposalItem[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
