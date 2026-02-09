import { Column, Entity, OneToMany, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import "reflect-metadata";
import { CustomerAddress } from "./customerAddress.entity";
import { CustomerContact } from "./customerContact.entity";
import { Lead } from "./lead.entity";
import { ServiceMaster } from "./service-master.entity";

@Entity('customer')
export class Customer {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'timestamp', default: () => 'now()' })
  createdAt: Date

  @Column({ unique: true })
  customerId: string

  @Column()
  name: string

  @Column({ type: 'text', nullable: true })
  businessActivities: string

  @Column({ nullable: true })
  headcount: string

  @OneToMany(() => CustomerAddress, (address) => address.customer)
  addresses: CustomerAddress[]

  @OneToMany(() => CustomerContact, (contact) => contact.customer)
  contacts: CustomerContact[]

  @OneToMany(() => Lead, (lead) => lead.customer)
  leads: Lead[]

  @ManyToMany(() => ServiceMaster)
  @JoinTable({
    name: 'customer_services',
    joinColumn: { name: 'customerId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'serviceId', referencedColumnName: 'id' }
  })
  services: ServiceMaster[]
}
