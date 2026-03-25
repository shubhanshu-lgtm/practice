import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { Proposal } from './proposal.entity';
import { ProposalItem } from './proposal-item.entity';

@Entity('proposal_payment_term')
export class ProposalPaymentTerm {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Proposal, (proposal) => proposal.paymentTerms, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'proposalId' })
  proposal: Proposal;

  @Column()
  proposalId: number;

  @ManyToOne(() => ProposalItem, (item) => item.paymentTerms, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'proposalItemId' })
  proposalItem: ProposalItem;

  @Column({ nullable: true })
  proposalItemId: number;

  @Column()
  milestoneName: string;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  percentage: number;

  @Column({ nullable: true })
  triggerEvent: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  amount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
