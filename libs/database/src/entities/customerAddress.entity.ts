import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import "reflect-metadata";
import { Customer } from "./customer.entity";

@Entity('customeraddress')
export class CustomerAddress {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'timestamp', default: () => 'now()' })
  createdAt: Date

  @Column()
  addressLine1: string

  @Column({ nullable: true })
  addressLine2: string

  @Column()
  city: string

  @Column({ nullable: true })
  state: string

  @Column()
  country: string

  @Column({ nullable: true })
  postalCode: string

  @Column({ nullable: true })
  addressType: string

  @ManyToOne(() => Customer, (customer) => customer.addresses)
  @JoinColumn({ name: 'customerId' })
  customer: Customer
}
