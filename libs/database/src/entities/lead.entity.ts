import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import "reflect-metadata";
import { Customer } from "./customer.entity";
import { User } from "./user.entity";
import { LeadService } from "./lead-service.entity";
import { Proposal } from "./proposal.entity";
import { LeadContact } from "./lead-contact.entity";
import { LeadAddress } from "./lead-address.entity";
import { LeadFollowUp } from "./lead-followup.entity";
import { LEAD_SOURCE, LEAD_STATUS, LEAD_QUALITY } from "../../../constants/salesConstants";

@Entity('lead')
export class Lead {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'timestamp', default: () => 'now()' })
  createdAt: Date

  @Column({ unique: true })
  enquiryId: string

  @Column({ nullable: true })
  enquiryReference: string

  @Column({
    type: 'varchar',
    length: 100,
    default: LEAD_SOURCE.WEBSITE
  })
  source: string | LEAD_SOURCE

 @Column({ type: 'varchar', length: 255, nullable: true })
  sourceDetail: string

  @Column({ type: 'json', nullable: true })
  meta: Record<string, any>

  @Column({ nullable: true })
  sourceDescription: string

  @Column({
    type: 'enum',
    enum: LEAD_STATUS,
    default: LEAD_STATUS.NEW
  })
  status: LEAD_STATUS

  @Column({
    type: 'enum',
    enum: LEAD_QUALITY,
    default: LEAD_QUALITY.WARM
  })
  quality: LEAD_QUALITY

  @Column({ type: 'text', nullable: true })
  notes: string

  @Column({ default: false })
  isDraft: boolean

  @Column({ default: true })
  isActive: boolean

  @ManyToOne(() => Customer, (customer) => customer.leads)
  @JoinColumn({ name: 'customerId' })
  customer: Customer

  @ManyToOne(() => User, (user) => user.id, { nullable: true })
  @JoinColumn({ name: 'createdBy' })
  createdBy: User

  @OneToMany(() => LeadService, (leadService) => leadService.lead)
  leadServices: LeadService[]

  @OneToMany(() => Proposal, (proposal) => proposal.lead)
  proposals: Proposal[]

  @OneToMany(() => LeadContact, (contact) => contact.lead, { cascade: true })
  contacts: LeadContact[]

  @OneToMany(() => LeadAddress, (address) => address.lead, { cascade: true })
  addresses: LeadAddress[]

  @OneToMany(() => LeadFollowUp, (followUp) => followUp.lead)
  followUps: LeadFollowUp[]
}
