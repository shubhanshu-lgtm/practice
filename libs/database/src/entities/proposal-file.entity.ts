import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Proposal } from './proposal.entity';

@Entity('proposal_files')
export class ProposalFile {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Proposal, (proposal) => proposal.files, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'proposalId' })
  proposal: Proposal;

  @Column()
  proposalId: number;

  @Column({ length: 500 })
  fileUrl: string;

  @Column({ nullable: true })
  fileName: string;

  @CreateDateColumn()
  createdAt: Date;
}
