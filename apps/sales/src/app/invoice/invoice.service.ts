import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from '../../../../../libs/database/src/entities/invoice.entity';
import { InvoiceItem } from '../../../../../libs/database/src/entities/invoice-item.entity';
import { PaymentRecord } from '../../../../../libs/database/src/entities/payment-record.entity';
import { InvoiceReportService } from './invoice-report.service';
import { ProposalAcceptance } from '../../../../../libs/database/src/entities/proposal-acceptance.entity';
import { ProposalPaymentTerm } from '../../../../../libs/database/src/entities/proposal-payment-term.entity';
import {
  INVOICE_STATUS,
  INVOICE_TAX_TYPE
} from '../../../../../libs/constants/salesConstants';
import {
  CreateInvoiceDto,
  UpdateInvoiceDto,
  RecordPaymentDto,
  InvoiceTaxUpdateDto,
  InvoiceItemDto
} from '../../../../../libs/dtos/sales/invoice.dto';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private invoiceRepo: Repository<Invoice>,
    @InjectRepository(InvoiceItem)
    private invoiceItemRepo: Repository<InvoiceItem>,
    @InjectRepository(PaymentRecord)
    private paymentRepo: Repository<PaymentRecord>,
    @InjectRepository(ProposalAcceptance)
    private closureRepo: Repository<ProposalAcceptance>,
    @InjectRepository(ProposalPaymentTerm)
    private paymentTermRepo: Repository<ProposalPaymentTerm>,
    private invoiceReportService: InvoiceReportService,
    private dataSource: DataSource
  ) {}

  private async generateInvoiceNumber(): Promise<string> {
    const year = new Date().getFullYear();
    const month = String(new Date().getMonth() + 1).padStart(2, '0');
    const count = await this.invoiceRepo
      .createQueryBuilder('invoice')
      .select('COUNT(invoice.id)', 'count')
      .where('invoice.invoiceNumber LIKE :prefix', {
        prefix: `INV/${year}/${month}%`
      })
      .getRawOne();

    const seq = String((count ? Number(count.count) : 0) + 1).padStart(4, '0');
    return `INV/${year}/${month}/${seq}`;
  }

  private calculateItemAmounts(item: InvoiceItemDto): {
    discountAmount: number;
    taxableAmount: number;
    taxAmount: number;
    netAmount: number;
  } {
    const lineTotal = item.qty * item.unitPrice;
    const discountPct = item.discount || 0;
    const discountAmount = (lineTotal * discountPct) / 100;
    const taxableAmount = lineTotal - discountAmount;
    const taxPct = item.taxPercentage || 0;
    const taxAmount = (taxableAmount * taxPct) / 100;
    const netAmount = taxableAmount + taxAmount;

    return {
      discountAmount: Number(discountAmount.toFixed(2)),
      taxableAmount: Number(taxableAmount.toFixed(2)),
      taxAmount: Number(taxAmount.toFixed(2)),
      netAmount: Number(netAmount.toFixed(2))
    };
  }

  private calculateInvoiceTotals(
    items: InvoiceItem[],
    taxType: INVOICE_TAX_TYPE,
    cgstPct: number,
    sgstPct: number,
    igstPct: number,
    advancePaid: number
  ) {
    const subTotal = items.reduce(
      (sum, i) => sum + Number(i.unitPrice) * Number(i.qty),
      0
    );
    const totalDiscount = items.reduce(
      (sum, i) => sum + Number(i.discountAmount),
      0
    );
    const taxableBase = subTotal - totalDiscount;

    let cgstAmount = 0;
    let sgstAmount = 0;
    let igstAmount = 0;

    if (taxType === INVOICE_TAX_TYPE.CGST_SGST) {
      cgstAmount = Number(((taxableBase * cgstPct) / 100).toFixed(2));
      sgstAmount = Number(((taxableBase * sgstPct) / 100).toFixed(2));
    } else if (taxType === INVOICE_TAX_TYPE.IGST) {
      igstAmount = Number(((taxableBase * igstPct) / 100).toFixed(2));
    }

    const totalTaxAmount = cgstAmount + sgstAmount + igstAmount;
    const grandTotal = Number((taxableBase + totalTaxAmount).toFixed(2));
    const netPayable = Number((grandTotal - advancePaid).toFixed(2));
    const remainingBalance = netPayable;

    return {
      subTotal: Number(subTotal.toFixed(2)),
      totalDiscount: Number(totalDiscount.toFixed(2)),
      cgstAmount,
      sgstAmount,
      igstAmount,
      totalTaxAmount: Number(totalTaxAmount.toFixed(2)),
      grandTotal,
      netPayable,
      remainingBalance
    };
  }

  async createInvoice(dto: CreateInvoiceDto): Promise<Invoice> {
    return this.dataSource.transaction(async (manager) => {
      const closure = await manager.findOne(ProposalAcceptance, {
        where: { id: dto.closureId },
        relations: [
          'proposal',
          'proposal.paymentTerms',
          'lead',
          'lead.customer'
        ]
      });
      if (!closure) throw new NotFoundException('Closure not found');

      if (!dto.items || dto.items.length === 0) {
        throw new BadRequestException('At least one invoice item is required');
      }

      const invoiceNumber = await this.generateInvoiceNumber();

      const taxType = dto.taxType || INVOICE_TAX_TYPE.NONE;
      const cgstPct = dto.cgstPercentage || 0;
      const sgstPct = dto.sgstPercentage || 0;
      const igstPct = dto.igstPercentage || 0;
      const advancePaid = dto.advancePaid || 0;

      const savedItems: InvoiceItem[] = [];
      for (const itemDto of dto.items) {
        const calcs = this.calculateItemAmounts(itemDto);
        const item = manager.create(InvoiceItem, {
          proposalItemId: itemDto.proposalItemId,
          serviceName: itemDto.serviceName,
          serviceDescription: itemDto.serviceDescription,
          qty: itemDto.qty,
          unitPrice: itemDto.unitPrice,
          discount: itemDto.discount || 0,
          discountAmount: calcs.discountAmount,
          taxableAmount: calcs.taxableAmount,
          taxPercentage: itemDto.taxPercentage || 0,
          taxAmount: calcs.taxAmount,
          netAmount: calcs.netAmount,
          currency: itemDto.currency || dto.currency || closure.proposal?.currency || 'INR'
        });
        savedItems.push(item);
      }

      const totals = this.calculateInvoiceTotals(
        savedItems,
        taxType,
        cgstPct,
        sgstPct,
        igstPct,
        advancePaid
      );

      const invoice = manager.create(Invoice, {
        invoiceNumber,
        closureId: dto.closureId,
        projectId: dto.projectId || null,
        leadId: closure.leadId,
        paymentTermId: dto.paymentTermId || null,
        accountDepartmentId: dto.accountDepartmentId || null,
        billFromEntity: dto.billFromEntity || closure.raisedFromEntity,
        billToCompanyName: closure.billToCompanyName,
        billToAddress: closure.billToAddress,
        billToGstNumber: closure.gstNumber,
        billToPan: dto.billToPan,
        customerPoNumber: dto.customerPoNumber || closure.poNumber,
        accountManager: dto.accountManager,
        businessNumber: dto.businessNumber,
        sacCode: dto.sacCode,
        bankDetails: dto.bankDetails,
        invoiceDate: dto.invoiceDate,
        dueDate: dto.dueDate || null,
        taxType,
        cgstPercentage: cgstPct,
        sgstPercentage: sgstPct,
        igstPercentage: igstPct,
        advancePaid,
        currency: dto.currency || closure.proposal?.currency || 'INR',
        status: INVOICE_STATUS.DRAFT,
        notes: dto.notes,
        ...totals
      });

      const savedInvoice = await manager.save(Invoice, invoice);

      for (const item of savedItems) {
        item.invoiceId = savedInvoice.id;
        await manager.save(InvoiceItem, item);
      }

      return this.getInvoice(savedInvoice.id);
    });
  }

  async getInvoice(id: number): Promise<Invoice> {
    const invoice = await this.invoiceRepo.findOne({
      where: { id },
      relations: [
        'closure',
        'closure.lead',
        'closure.lead.customer',
        'project',
        'project.department',
        'project.team',
        'lead',
        'lead.customer',
        'paymentTerm',
        'accountDepartment',
        'items',
        'payments'
      ]
    });
    if (!invoice) throw new NotFoundException('Invoice not found');
    return invoice;
  }

  async getInvoices(query: {
    closureId?: number;
    leadId?: number;
    status?: INVOICE_STATUS;
    page?: number;
    limit?: number;
  }): Promise<{ data: Invoice[]; total: number; page: number; limit: number }> {
    const page = query.page || 1;
    const limit = query.limit || 20;

    const qb = this.invoiceRepo
      .createQueryBuilder('invoice')
      .leftJoinAndSelect('invoice.closure', 'closure')
      .leftJoinAndSelect('invoice.lead', 'lead')
      .leftJoinAndSelect('lead.customer', 'customer')
      .leftJoinAndSelect('invoice.accountDepartment', 'accountDepartment')
      .leftJoinAndSelect('invoice.payments', 'payments')
      .orderBy('invoice.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    if (query.closureId) {
      qb.andWhere('invoice.closureId = :closureId', {
        closureId: query.closureId
      });
    }
    if (query.leadId) {
      qb.andWhere('invoice.leadId = :leadId', { leadId: query.leadId });
    }
    if (query.status) {
      qb.andWhere('invoice.status = :status', { status: query.status });
    }

    const [data, total] = await qb.getManyAndCount();
    return { data, total, page, limit };
  }

  async updateInvoice(id: number, dto: UpdateInvoiceDto): Promise<Invoice> {
    const invoice = await this.invoiceRepo.findOne({ where: { id } });
    if (!invoice) throw new NotFoundException('Invoice not found');

    if (
      invoice.status === INVOICE_STATUS.PAID &&
      dto.status !== INVOICE_STATUS.PAID
    ) {
      throw new BadRequestException('Cannot modify a fully paid invoice');
    }

    Object.assign(invoice, {
      ...(dto.accountDepartmentId !== undefined && {
        accountDepartmentId: dto.accountDepartmentId
      }),
      ...(dto.billFromEntity !== undefined && {
        billFromEntity: dto.billFromEntity
      }),
      ...(dto.invoiceDate !== undefined && { invoiceDate: dto.invoiceDate }),
      ...(dto.dueDate !== undefined && { dueDate: dto.dueDate }),
      ...(dto.notes !== undefined && { notes: dto.notes }),
      ...(dto.status !== undefined && { status: dto.status }),
      ...(dto.pdfUrl !== undefined && { pdfUrl: dto.pdfUrl }),
      ...(dto.billToPan !== undefined && { billToPan: dto.billToPan }),
      ...(dto.customerPoNumber !== undefined && { customerPoNumber: dto.customerPoNumber }),
      ...(dto.accountManager !== undefined && { accountManager: dto.accountManager }),
      ...(dto.businessNumber !== undefined && { businessNumber: dto.businessNumber }),
      ...(dto.sacCode !== undefined && { sacCode: dto.sacCode }),
      ...(dto.bankDetails !== undefined && { bankDetails: dto.bankDetails }),
      ...(dto.projectId !== undefined && { projectId: dto.projectId }),
      ...(dto.paymentTermId !== undefined && { paymentTermId: dto.paymentTermId }),
    });

    await this.invoiceRepo.save(invoice);
    return this.getInvoice(id);
  }

  async generateInvoicePdf(id: number): Promise<Buffer> {
    const invoice = await this.getInvoice(id);
    return this.invoiceReportService.generateInvoicePdf(invoice);
  }

  async updateInvoiceTax(
    id: number,
    dto: InvoiceTaxUpdateDto
  ): Promise<Invoice> {
    return this.dataSource.transaction(async (manager) => {
      const invoice = await manager.findOne(Invoice, {
        where: { id },
        relations: ['items']
      });
      if (!invoice) throw new NotFoundException('Invoice not found');

      if (invoice.status === INVOICE_STATUS.PAID) {
        throw new BadRequestException(
          'Cannot update tax on a fully paid invoice'
        );
      }

      const cgstPct = dto.cgstPercentage || 0;
      const sgstPct = dto.sgstPercentage || 0;
      const igstPct = dto.igstPercentage || 0;

      const totals = this.calculateInvoiceTotals(
        invoice.items,
        dto.taxType,
        cgstPct,
        sgstPct,
        igstPct,
        Number(invoice.advancePaid)
      );

      Object.assign(invoice, {
        taxType: dto.taxType,
        cgstPercentage: cgstPct,
        sgstPercentage: sgstPct,
        igstPercentage: igstPct,
        ...totals
      });

      await manager.save(Invoice, invoice);
      return this.getInvoice(id);
    });
  }

  async recordPayment(dto: RecordPaymentDto): Promise<Invoice> {
    return this.dataSource.transaction(async (manager) => {
      const invoice = await manager.findOne(Invoice, {
        where: { id: dto.invoiceId },
        relations: ['payments']
      });
      if (!invoice) throw new NotFoundException('Invoice not found');

      if (invoice.status === INVOICE_STATUS.PAID) {
        throw new BadRequestException('Invoice is already fully paid');
      }

      if (invoice.status === INVOICE_STATUS.CANCELLED) {
        throw new BadRequestException('Cannot record payment on a cancelled invoice');
      }

      const currentRemaining = Number(invoice.remainingBalance);
      if (dto.amount > currentRemaining + 0.01) {
        throw new BadRequestException(
          `Payment amount (${dto.amount}) exceeds remaining balance (${currentRemaining})`
        );
      }

      const newRemaining = Number(
        (currentRemaining - dto.amount).toFixed(2)
      );

      const payment = manager.create(PaymentRecord, {
        invoiceId: dto.invoiceId,
        orderId: dto.orderId,
        paymentDate: dto.paymentDate,
        amount: dto.amount,
        paymentMethod: dto.paymentMethod,
        bankName: dto.bankName,
        transactionId: dto.transactionId,
        chequeNumber: dto.chequeNumber,
        remainingBalance: newRemaining,
        notes: dto.notes
      });
      await manager.save(PaymentRecord, payment);

      const newAmountReceived = Number(
        (Number(invoice.amountReceived) + dto.amount).toFixed(2)
      );

      invoice.amountReceived = newAmountReceived;
      invoice.remainingBalance = newRemaining;

      if (newRemaining <= 0) {
        invoice.status = INVOICE_STATUS.PAID;
      } else if (newAmountReceived > 0) {
        invoice.status = INVOICE_STATUS.PARTIAL;
      }

      await manager.save(Invoice, invoice);

      return this.getInvoice(dto.invoiceId);
    });
  }

  async getInvoicePayments(invoiceId: number): Promise<PaymentRecord[]> {
    const invoice = await this.invoiceRepo.findOne({ where: { id: invoiceId } });
    if (!invoice) throw new NotFoundException('Invoice not found');

    return this.paymentRepo.find({
      where: { invoiceId },
      order: { createdAt: 'DESC' }
    });
  }

  async getClosureInvoiceSummary(closureId: number): Promise<{
    closure: ProposalAcceptance;
    invoices: Invoice[];
    totalInvoiced: number;
    totalReceived: number;
    totalPending: number;
  }> {
    const closure = await this.closureRepo.findOne({
      where: { id: closureId },
      relations: [
        'proposal',
        'proposal.items',
        'proposal.paymentTerms',
        'lead',
        'lead.customer'
      ]
    });
    if (!closure) throw new NotFoundException('Closure not found');

    const invoices = await this.invoiceRepo.find({
      where: { closureId },
      relations: ['items', 'payments', 'accountDepartment'],
      order: { createdAt: 'DESC' }
    });

    const totalInvoiced = invoices.reduce(
      (sum, inv) => sum + Number(inv.grandTotal),
      0
    );
    const totalReceived = invoices.reduce(
      (sum, inv) => sum + Number(inv.amountReceived),
      0
    );
    const totalPending = invoices.reduce(
      (sum, inv) =>
        inv.status !== INVOICE_STATUS.CANCELLED
          ? sum + Number(inv.remainingBalance)
          : sum,
      0
    );

    return {
      closure,
      invoices,
      totalInvoiced: Number(totalInvoiced.toFixed(2)),
      totalReceived: Number(totalReceived.toFixed(2)),
      totalPending: Number(totalPending.toFixed(2))
    };
  }

  async markInvoiceSent(id: number): Promise<Invoice> {
    const invoice = await this.invoiceRepo.findOne({ where: { id } });
    if (!invoice) throw new NotFoundException('Invoice not found');

    if (invoice.status !== INVOICE_STATUS.DRAFT) {
      throw new BadRequestException(
        `Invoice is already in ${invoice.status} status`
      );
    }

    invoice.status = INVOICE_STATUS.SENT;
    await this.invoiceRepo.save(invoice);
    return this.getInvoice(id);
  }

  async cancelInvoice(id: number): Promise<Invoice> {
    const invoice = await this.invoiceRepo.findOne({ where: { id } });
    if (!invoice) throw new NotFoundException('Invoice not found');

    if (invoice.status === INVOICE_STATUS.PAID) {
      throw new BadRequestException('Cannot cancel a paid invoice');
    }

    invoice.status = INVOICE_STATUS.CANCELLED;
    await this.invoiceRepo.save(invoice);
    return this.getInvoice(id);
  }

  async getFinanceWindowInvoices(query: {
    status?: INVOICE_STATUS;
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<{
    data: Invoice[];
    total: number;
    page: number;
    limit: number;
    summary: {
      totalDraft: number;
      totalSent: number;
      totalPaid: number;
      totalPartial: number;
      totalOverdue: number;
    };
  }> {
    const page = query.page || 1;
    const limit = query.limit || 20;

    const qb = this.invoiceRepo
      .createQueryBuilder('invoice')
      .leftJoinAndSelect('invoice.lead', 'lead')
      .leftJoinAndSelect('lead.customer', 'customer')
      .leftJoinAndSelect('invoice.accountDepartment', 'accountDepartment')
      .leftJoinAndSelect('invoice.project', 'project')
      .leftJoinAndSelect('project.department', 'department')
      .leftJoinAndSelect('invoice.payments', 'payments')
      .orderBy('invoice.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    if (query.status) {
      qb.andWhere('invoice.status = :status', { status: query.status });
    }

    if (query.search) {
      qb.andWhere(
        '(invoice.invoiceNumber LIKE :search OR customer.name LIKE :search)',
        { search: `%${query.search}%` }
      );
    }

    await this.updateOverdueStatuses();

    const [data, total] = await qb.getManyAndCount();

    const summaryQb = this.invoiceRepo
      .createQueryBuilder('invoice')
      .select('invoice.status', 'status')
      .addSelect('COUNT(invoice.id)', 'count')
      .groupBy('invoice.status');

    const summaryRows = await summaryQb.getRawMany();

    const summary = {
      totalDraft: 0,
      totalSent: 0,
      totalPaid: 0,
      totalPartial: 0,
      totalOverdue: 0
    };

    for (const row of summaryRows) {
      switch (row.status) {
        case INVOICE_STATUS.DRAFT:
          summary.totalDraft = Number(row.count);
          break;
        case INVOICE_STATUS.SENT:
          summary.totalSent = Number(row.count);
          break;
        case INVOICE_STATUS.PAID:
          summary.totalPaid = Number(row.count);
          break;
        case INVOICE_STATUS.PARTIAL:
          summary.totalPartial = Number(row.count);
          break;
        case INVOICE_STATUS.OVERDUE:
          summary.totalOverdue = Number(row.count);
          break;
      }
    }

    return { data, total, page, limit, summary };
  }

  private async updateOverdueStatuses(): Promise<void> {
    const today = new Date();
    await this.invoiceRepo
      .createQueryBuilder()
      .update(Invoice)
      .set({ status: INVOICE_STATUS.OVERDUE })
      .where('status IN (:...statuses)', {
        statuses: [INVOICE_STATUS.SENT, INVOICE_STATUS.PARTIAL]
      })
      .andWhere('dueDate < :today', { today })
      .execute();
  }
}
