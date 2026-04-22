import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Proposal } from './proposal.entity';

@Entity('proposal_version')
export class ProposalVersion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Proposal, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'proposalId' })
  proposal: Proposal;

  @Column()
  proposalId: number;

  @Column()
  version: number;

  @Column({ type: 'json' })
  snapshotData: any;

  @CreateDateColumn()
  createdAt: Date;
}
