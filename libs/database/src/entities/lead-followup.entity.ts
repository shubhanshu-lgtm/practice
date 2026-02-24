import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import "reflect-metadata";
import { Lead } from "./lead.entity";
import { User } from "./user.entity";

export enum FOLLOWUP_TYPE {
  CALL = 'Call',
  EMAIL = 'Email',
  MEETING = 'Meeting',
  WHATSAPP = 'WhatsApp',
  SITE_VISIT = 'Site Visit',
  FOLLOW_UP = 'Follow Up',
  STATUS_UPDATE = 'Status Update',
  NOTE = 'Note',
  OTHER = 'Other'
}

export enum FOLLOWUP_PRIORITY {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
  URGENT = 'Urgent'
}

@Entity('lead_followup')
export class LeadFollowUp {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Lead, (lead) => lead.followUps)
  @JoinColumn({ name: 'leadId' })
  lead: Lead;

  @Column()
  leadId: number;

  @Column({
    type: 'enum',
    enum: FOLLOWUP_TYPE,
    default: FOLLOWUP_TYPE.FOLLOW_UP
  })
  type: FOLLOWUP_TYPE;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'timestamp', nullable: true })
  followUpDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  completedAt: Date;

  @Column({ default: false })
  isCompleted: boolean;

  @Column({
    type: 'enum',
    enum: FOLLOWUP_PRIORITY,
    default: FOLLOWUP_PRIORITY.MEDIUM
  })
  priority: FOLLOWUP_PRIORITY;

  @Column({ type: 'text', nullable: true })
  outcome: string;

  @Column({ type: 'text', nullable: true })
  nextAction: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'createdBy' })
  createdBy: User;

  @Column({ type: 'timestamp', default: () => 'now()' })
  createdAt: Date;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'updatedBy' })
  updatedBy: User;

  @Column({ type: 'timestamp', nullable: true })
  updatedAt: Date;

  @Column({ default: true })
  isActive: boolean;
}
