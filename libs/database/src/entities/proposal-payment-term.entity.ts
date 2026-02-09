import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { ProposalItem } from './proposal-item.entity';

@Entity('proposal_payment_term')
export class ProposalPaymentTerm {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ProposalItem, (item) => item.paymentTerms, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'proposalItemId' })
  proposalItem: ProposalItem;

  @Column()
  proposalItemId: number;

  @Column()
  milestoneName: string;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  percentage: number;

  @Column({ nullable: true })
  triggerEvent: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  amount: number; // Calculated based on percentage of item net amount

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
