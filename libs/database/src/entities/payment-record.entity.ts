import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { Invoice } from './invoice.entity';
import { PAYMENT_METHOD } from '../../../constants/salesConstants';

@Entity('payment_record')
export class PaymentRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Invoice, (invoice) => invoice.payments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'invoiceId' })
  invoice: Invoice;

  @Column()
  invoiceId: number;

  @Column({ nullable: true })
  orderId?: string;

  @Column({ type: 'date' })
  paymentDate: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({
    type: 'enum',
    enum: PAYMENT_METHOD,
    default: PAYMENT_METHOD.NEFT
  })
  paymentMethod: PAYMENT_METHOD;

  @Column({ nullable: true })
  bankName?: string;

  @Column({ nullable: true })
  transactionId?: string;

  @Column({ nullable: true })
  chequeNumber?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  remainingBalance: number;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
