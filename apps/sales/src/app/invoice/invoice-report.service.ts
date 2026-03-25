import { Injectable, Logger } from '@nestjs/common';
import PDFDocument from 'pdfkit';
import * as path from 'path';
import * as fs from 'fs';
import { Invoice } from '../../../../../libs/database/src/entities/invoice.entity';

@Injectable()
export class InvoiceReportService {
  private readonly logger = new Logger(InvoiceReportService.name);
  private readonly PRIMARY_COLOR = '#0047AB';
  private readonly SECONDARY_COLOR = '#555555';
  private readonly GRID_COLOR = '#DDDDDD';
  private readonly TEXT_COLOR = '#333333';

  async generateInvoicePdf(invoice: Invoice): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument({ margin: 40, size: 'A4', bufferPages: true });
        const buffers: Buffer[] = [];

        doc.on('data', (chunk) => buffers.push(chunk));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        doc.on('end', () => resolve(Buffer.concat(buffers as any)));
        doc.on('error', (err) => reject(err));

        const isIndiaInvoice = invoice.billFromEntity?.toLowerCase().includes('india') || 
                              invoice.billFromEntity?.toLowerCase().includes('private limited') ||
                              invoice.currency === 'INR';

        if (isIndiaInvoice) {
          this.generateIndiaTaxInvoice(doc, invoice);
        } else {
          this.generateGlobalInvoice(doc, invoice);
        }

        doc.end();
      } catch (error) {
        this.logger.error('Error generating Invoice PDF:', error);
        reject(error);
      }
    });
  }

  private generateGlobalInvoice(doc: PDFKit.PDFDocument, invoice: Invoice) {
    this.drawHeader(doc, 'INVOICE', invoice.billFromEntity || 'INTERCERT INC');
    
    const startY = 110;
    
    // Invoice To & Information Table
    this.drawInfoTable(doc, startY, invoice);
    
    // Wire Transfer Details
    this.drawWireTransferDetails(doc, doc.y + 20, invoice);
    
    // Item Details Table
    this.drawItemsTable(doc, doc.y + 20, invoice);
    
    // Totals
    this.drawTotals(doc, doc.y + 10, invoice, false);
    
    // Footer
    this.drawFooter(doc);
  }

  private generateIndiaTaxInvoice(doc: PDFKit.PDFDocument, invoice: Invoice) {
    this.drawHeader(doc, 'TAX INVOICE', invoice.billFromEntity || 'INTER CERT PRIVATE LIMITED');
    
    const startY = 110;
    
    // India specific info (GST, PAN, SAC)
    this.drawIndiaInfoTable(doc, startY, invoice);
    
    // Item Details Table
    this.drawItemsTable(doc, doc.y + 20, invoice);
    
    // Totals (with GST breakdown)
    this.drawTotals(doc, doc.y + 10, invoice, true);
    
    // Bank Details
    this.drawWireTransferDetails(doc, doc.y + 20, invoice);
    
    // Terms & Signature
    this.drawIndiaFooter(doc);
  }

  private drawHeader(doc: PDFKit.PDFDocument, title: string, companyName: string) {
    const logoPath = path.join(process.cwd(), 'libs', 'templates', 'Logo_Blue.png');
    if (fs.existsSync(logoPath)) {
      doc.image(logoPath, 40, 30, { width: 150 });
    } else {
      doc.fillColor(this.PRIMARY_COLOR).fontSize(20).font('Helvetica-Bold').text('INTERCERT', 40, 40);
    }

    doc.fillColor(this.TEXT_COLOR).fontSize(12).font('Helvetica-Bold').text(companyName, 400, 40, { align: 'right' });
    
    doc.moveTo(40, 80).lineTo(555, 80).strokeColor(this.GRID_COLOR).stroke();
    doc.fillColor(this.TEXT_COLOR).fontSize(14).font('Helvetica-Bold').text(title, 40, 85, { align: 'center', width: 515 });
    doc.moveTo(40, 105).lineTo(555, 105).strokeColor(this.GRID_COLOR).stroke();
  }

  private drawInfoTable(doc: PDFKit.PDFDocument, y: number, invoice: Invoice) {
    doc.font('Helvetica-Bold').fontSize(10);
    doc.rect(40, y, 257, 15).fill(this.GRID_COLOR).stroke();
    doc.rect(297, y, 258, 15).fill(this.GRID_COLOR).stroke();
    
    doc.fillColor(this.TEXT_COLOR).text('Invoice To:', 45, y + 3);
    doc.text('Invoice Information', 302, y + 3);
    
    const tableHeight = 120;
    doc.rect(40, y + 15, 257, tableHeight).stroke();
    doc.rect(297, y + 15, 258, tableHeight).stroke();
    
    // Bill To content
    doc.font('Helvetica').fontSize(9);
    let billToY = y + 25;
    doc.text(invoice.billToCompanyName || '', 50, billToY);
    billToY += 15;
    if (invoice.billToAddress) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const addr = invoice.billToAddress as any;
      doc.text(`${addr.addressLine1}${addr.addressLine2 ? ', ' + addr.addressLine2 : ''}`, 50, billToY);
      billToY += 12;
      doc.text(`${addr.city}, ${addr.state || ''} ${addr.postalCode || ''}`, 50, billToY);
      billToY += 12;
      doc.text(addr.country || '', 50, billToY);
    }
    
    // Info content
    let infoY = y + 25;
    const drawInfoLine = (label: string, value: string) => {
      doc.font('Helvetica-Bold').text(label, 302, infoY);
      doc.font('Helvetica').text(value || '', 420, infoY);
      infoY += 15;
    };
    
    drawInfoLine('Invoice #', invoice.invoiceNumber);
    drawInfoLine('Invoice Date', new Date(invoice.invoiceDate).toLocaleDateString());
    drawInfoLine('Customer PO #', invoice.customerPoNumber);
    drawInfoLine('Account Manager', invoice.accountManager);
    drawInfoLine('Currency', invoice.currency);
    drawInfoLine('Business #', invoice.businessNumber);
    
    doc.y = y + 15 + tableHeight;
  }

  private drawIndiaInfoTable(doc: PDFKit.PDFDocument, y: number, invoice: Invoice) {
    // Similar to drawInfoTable but with GST/PAN fields
    doc.font('Helvetica-Bold').fontSize(9);
    
    const rows = [
      ['Invoice No.', invoice.invoiceNumber, 'Invoice Date', new Date(invoice.invoiceDate).toLocaleDateString()],
      ['GSTIN', '09AAGCM0083J1ZC', 'PAN', 'AAGCM0083J'], // Static company info for now
      ['SAC Code', invoice.sacCode || '998349', 'State', 'Uttar Pradesh']
    ];
    
    let currentY = y;
    rows.forEach(row => {
      doc.rect(40, currentY, 128, 15).stroke();
      doc.rect(168, currentY, 129, 15).stroke();
      doc.rect(297, currentY, 128, 15).stroke();
      doc.rect(425, currentY, 130, 15).stroke();
      
      doc.text(row[0], 45, currentY + 3);
      doc.font('Helvetica').text(row[1], 173, currentY + 3);
      doc.font('Helvetica-Bold').text(row[2], 302, currentY + 3);
      doc.font('Helvetica').text(row[3], 430, currentY + 3);
      currentY += 15;
    });
    
    // Bill To
    doc.rect(40, currentY, 515, 15).fill(this.GRID_COLOR).stroke();
    doc.fillColor(this.TEXT_COLOR).font('Helvetica-Bold').text('Bill To:', 45, currentY + 3);
    currentY += 15;
    
    doc.rect(40, currentY, 515, 60).stroke();
    doc.font('Helvetica').text(invoice.billToCompanyName || '', 45, currentY + 5);
    if (invoice.billToAddress) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const addr = invoice.billToAddress as any;
      doc.text(`${addr.addressLine1}, ${addr.city}, ${addr.state || ''}`, 45, currentY + 17);
    }
    doc.font('Helvetica-Bold').text(`GSTIN: ${invoice.billToGstNumber || 'Not Available'}`, 45, currentY + 29);
    doc.text(`PAN: ${invoice.billToPan || 'Not Available'}`, 302, currentY + 29);
    
    doc.y = currentY + 60;
  }

  private drawWireTransferDetails(doc: PDFKit.PDFDocument, y: number, invoice: Invoice) {
    doc.font('Helvetica-Bold').fontSize(10);
    doc.rect(40, y, 515, 15).fill(this.GRID_COLOR).stroke();
    doc.fillColor(this.TEXT_COLOR).text('Bank Details for Payment Remittance', 45, y + 3);
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const details = (invoice.bankDetails as any) || {};
    const rows = [
      ['Beneficiary Name', details.beneficiaryName || 'INTERCERT INC'],
      ['Bank Name', details.bankName || 'Texas First Bank'],
      ['Account #', details.accountNumber || '10392033'],
      ['IFSC / Routing', details.ifscCode || details.abaRoutingNumber || '113110256']
    ];
    
    let currentY = y + 15;
    doc.font('Helvetica').fontSize(9);
    rows.forEach(row => {
      doc.rect(40, currentY, 150, 15).stroke();
      doc.rect(190, currentY, 365, 15).stroke();
      doc.font('Helvetica-Bold').text(row[0], 45, currentY + 3);
      doc.font('Helvetica').text(row[1], 195, currentY + 3);
      currentY += 15;
    });
    doc.y = currentY;
  }

  private drawItemsTable(doc: PDFKit.PDFDocument, y: number, invoice: Invoice) {
    doc.font('Helvetica-Bold').fontSize(9);
    const headers = ['#', 'Service Description', 'Qty', 'Unit Price', 'Amount'];
    const colWidths = [30, 285, 40, 80, 80];
    
    let currentX = 40;
    headers.forEach((h, i) => {
      doc.rect(currentX, y, colWidths[i], 20).fill(this.GRID_COLOR).stroke();
      doc.fillColor(this.TEXT_COLOR).text(h, currentX + 5, y + 6, { width: colWidths[i] - 10, align: i > 1 ? 'right' : 'left' });
      currentX += colWidths[i];
    });
    
    let currentY = y + 20;
    doc.font('Helvetica').fontSize(9);
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (invoice.items || []).forEach((item: any, index: number) => {
      const rowHeight = 20;
      doc.rect(40, currentY, colWidths[0], rowHeight).stroke();
      doc.rect(70, currentY, colWidths[1], rowHeight).stroke();
      doc.rect(355, currentY, colWidths[2], rowHeight).stroke();
      doc.rect(395, currentY, colWidths[3], rowHeight).stroke();
      doc.rect(475, currentY, colWidths[4], rowHeight).stroke();
      
      doc.text((index + 1).toString(), 45, currentY + 6);
      doc.text(item.serviceName, 75, currentY + 6, { width: colWidths[1] - 10 });
      doc.text(item.qty.toString(), 355, currentY + 6, { width: colWidths[2] - 10, align: 'right' });
      doc.text(item.unitPrice.toLocaleString(), 395, currentY + 6, { width: colWidths[3] - 10, align: 'right' });
      doc.text((item.qty * item.unitPrice).toLocaleString(), 475, currentY + 6, { width: colWidths[4] - 10, align: 'right' });
      
      currentY += rowHeight;
    });
    
    doc.y = currentY;
  }

  private drawTotals(doc: PDFKit.PDFDocument, y: number, invoice: Invoice, isIndia: boolean) {
    const labelWidth = 435;
    const valueWidth = 80;
    let currentY = y;
    
    const drawTotalLine = (label: string, value: number, isBold = false) => {
      doc.font(isBold ? 'Helvetica-Bold' : 'Helvetica').fontSize(10);
      doc.text(label, 40, currentY, { width: labelWidth, align: 'right' });
      doc.text(value.toLocaleString(undefined, { minimumFractionDigits: 2 }), 475, currentY, { width: valueWidth, align: 'right' });
      currentY += 15;
    };
    
    drawTotalLine('Subtotal', Number(invoice.subTotal));
    if (Number(invoice.totalDiscount) > 0) {
      drawTotalLine('Discount', Number(invoice.totalDiscount));
    }
    
    if (isIndia) {
      if (Number(invoice.cgstAmount) > 0) drawTotalLine(`CGST @ ${invoice.cgstPercentage}%`, Number(invoice.cgstAmount));
      if (Number(invoice.sgstAmount) > 0) drawTotalLine(`SGST @ ${invoice.sgstPercentage}%`, Number(invoice.sgstAmount));
      if (Number(invoice.igstAmount) > 0) drawTotalLine(`IGST @ ${invoice.igstPercentage}%`, Number(invoice.igstAmount));
    } else if (Number(invoice.totalTaxAmount) > 0) {
      drawTotalLine('Tax', Number(invoice.totalTaxAmount));
    }
    
    doc.moveTo(430, currentY).lineTo(555, currentY).stroke();
    currentY += 5;
    drawTotalLine('Grand Total', Number(invoice.grandTotal), true);
    
    if (Number(invoice.advancePaid) > 0) {
      drawTotalLine('Less: Advance / Adjustments', Number(invoice.advancePaid));
      doc.moveTo(430, currentY).lineTo(555, currentY).stroke();
      currentY += 5;
      doc.fillColor(this.PRIMARY_COLOR);
      drawTotalLine('Final Payable', Number(invoice.netPayable), true);
      doc.fillColor(this.TEXT_COLOR);
    }
    
    doc.y = currentY;
  }

  private drawFooter(doc: PDFKit.PDFDocument) {
    const bottomY = 750;
    doc.moveTo(40, bottomY).lineTo(555, bottomY).strokeColor(this.GRID_COLOR).stroke();
    doc.fontSize(8).fillColor(this.SECONDARY_COLOR);
    doc.text('INTERCERT Inc. | 2001 Timberloch Place, Suite 500, The Woodlands, Texas 77380, U.S.A.', 40, bottomY + 10, { align: 'center' });
    doc.text('www.intercert.com | info@intercert.com | +1 (281) 720-3261', 40, bottomY + 22, { align: 'center' });
  }

  private drawIndiaFooter(doc: PDFKit.PDFDocument) {
    const bottomY = 700;
    doc.fontSize(8).font('Helvetica').text('The Invoice shall be settled within 15 days of receipt or on completion of the services, whichever is earlier otherwise an interest @18% per annum will be charged as per INTERCERT general terms of services or payment terms as per the agreed contract shall be applicable.', 40, bottomY, { width: 515, align: 'justify' });
    
    doc.font('Helvetica-Bold').fontSize(10).text('For INTER CERT PVT LTD', 400, bottomY + 50);
    doc.text('Authorised Signatory', 400, bottomY + 80);
    
    const footerY = 800;
    doc.rect(0, footerY, 600, 42).fill(this.PRIMARY_COLOR);
    doc.fillColor('white').fontSize(8);
    doc.text('Email: info@intercert.com', 50, footerY + 15);
    doc.text('Phone: +91-120-4258833', 250, footerY + 15);
    doc.text('Website: www.intercert.com', 450, footerY + 15);
  }
}
