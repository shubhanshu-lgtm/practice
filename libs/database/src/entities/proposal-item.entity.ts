import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { Proposal } from './proposal.entity';
import { LeadService } from './lead-service.entity';
import { ProposalPaymentTerm } from './proposal-payment-term.entity';

@Entity('proposal_item')
export class ProposalItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Proposal, (proposal) => proposal.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'proposalId' })
  proposal: Proposal;

  @Column()
  proposalId: number;

  @ManyToOne(() => LeadService)
  @JoinColumn({ name: 'leadServiceId' })
  leadService: LeadService;

  @Column({ nullable: true })
  leadServiceId: number;

  @Column({ nullable: true })
  serviceName: string; // Snapshot of service name

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ length: 3 })
  currency: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  discount: number; // Percentage

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  taxPercentage: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  netAmount: number;

  @OneToMany(() => ProposalPaymentTerm, (term) => term.proposalItem, { cascade: true })
  paymentTerms: ProposalPaymentTerm[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
