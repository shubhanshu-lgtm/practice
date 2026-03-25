import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { ProposalAcceptance } from './proposal-acceptance.entity';
import { Project } from './project.entity';
import { Lead } from './lead.entity';
import { Department } from './department.entity';
import { ProposalPaymentTerm } from './proposal-payment-term.entity';
import { InvoiceItem } from './invoice-item.entity';
import { PaymentRecord } from './payment-record.entity';
import { INVOICE_STATUS, INVOICE_TAX_TYPE } from '../../../constants/salesConstants';

@Entity('invoice')
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  invoiceNumber: string;

  @ManyToOne(() => ProposalAcceptance, { nullable: false })
  @JoinColumn({ name: 'closureId' })
  closure: ProposalAcceptance;

  @Column()
  closureId: number;

  @ManyToOne(() => Project, { nullable: true })
  @JoinColumn({ name: 'projectId' })
  project?: Project;

  @Column({ nullable: true })
  projectId?: number;

  @ManyToOne(() => Lead, { nullable: false })
  @JoinColumn({ name: 'leadId' })
  lead: Lead;

  @Column()
  leadId: number;

  @ManyToOne(() => ProposalPaymentTerm, { nullable: true })
  @JoinColumn({ name: 'paymentTermId' })
  paymentTerm?: ProposalPaymentTerm;

  @Column({ nullable: true })
  paymentTermId?: number;

  @ManyToOne(() => Department, { nullable: true })
  @JoinColumn({ name: 'accountDepartmentId' })
  accountDepartment?: Department;

  @Column({ nullable: true })
  accountDepartmentId?: number;

  @Column({ nullable: true })
  billFromEntity?: string;

  @Column({ nullable: true })
  billToCompanyName?: string;

  @Column({ type: 'json', nullable: true })
  billToAddress?: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state?: string;
    country: string;
    postalCode?: string;
  };

  @Column({ nullable: true })
  billToGstNumber?: string;

  @Column({ nullable: true })
  billToPan?: string;

  @Column({ nullable: true })
  customerPoNumber?: string;

  @Column({ nullable: true })
  accountManager?: string;

  @Column({ nullable: true })
  businessNumber?: string;

  @Column({ nullable: true })
  sacCode?: string;

  @Column({ type: 'json', nullable: true })
  bankDetails?: {
    beneficiaryName: string;
    beneficiaryAddress?: string;
    accountNumber: string;
    bankName: string;
    bankBranch?: string;
    ifscCode?: string;
    abaRoutingNumber?: string;
    swiftCode?: string;
  };

  @Column({ type: 'date' })
  invoiceDate: Date;

  @Column({ type: 'date', nullable: true })
  dueDate?: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  subTotal: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  totalDiscount: number;

  @Column({
    type: 'enum',
    enum: INVOICE_TAX_TYPE,
    default: INVOICE_TAX_TYPE.NONE
  })
  taxType: INVOICE_TAX_TYPE;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  cgstPercentage: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  sgstPercentage: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  igstPercentage: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  cgstAmount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  sgstAmount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  igstAmount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  totalTaxAmount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  grandTotal: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  advancePaid: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  netPayable: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  amountReceived: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  remainingBalance: number;

  @Column({ length: 3, default: 'INR' })
  currency: string;

  @Column({
    type: 'enum',
    enum: INVOICE_STATUS,
    default: INVOICE_STATUS.DRAFT
  })
  status: INVOICE_STATUS;

  @Column({ nullable: true })
  pdfUrl?: string;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @OneToMany(() => InvoiceItem, (item) => item.invoice, { cascade: true })
  items: InvoiceItem[];

  @OneToMany(() => PaymentRecord, (payment) => payment.invoice)
  payments: PaymentRecord[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
