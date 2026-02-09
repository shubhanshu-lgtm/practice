import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import "reflect-metadata";
import { Customer } from "./customer.entity";

@Entity('customercontact')
export class CustomerContact {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'timestamp', default: () => 'now()' })
  createdAt: Date

  @Column()
  name: string

  @Column({ nullable: true })
  designation: string

  @Column()
  email: string

  @Column()
  phoneNo: string

  @Column()
  countryCode: string

  @Column({ default: false })
  isPrimary: boolean

  @ManyToOne(() => Customer, (customer) => customer.contacts)
  @JoinColumn({ name: 'customerId' })
  customer: Customer
}
