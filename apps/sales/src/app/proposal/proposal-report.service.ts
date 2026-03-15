import { Injectable, Logger } from '@nestjs/common';
import PDFDocument from 'pdfkit';
import * as path from 'path';
import * as fs from 'fs';
import axios from 'axios';

const INTERCERT_ADDRESS = '2001 Timberloch Place, Suite 500, The Woodlands, Texas 77380 United States';
const INTERCERT_PHONE = '+1 281 899 8052';
const INTERCERT_EMAIL = 'info@intercert.com';
const INTERCERT_WEBSITE = 'www.intercert.com';

const ABOUT_INTERCERT = [
  'INTERCERT is a leading multinational organization specializing in Audits and Assessments. We provide Management System Certification, Governance, Risk, and Compliance (GRC) related services, Training, and Security Assessment services. Founded in 2009 with a commitment to building a secure and sustainable world through customer-centric services.',
  'Our Accreditations and Services includes:',
];

const ACCREDITATIONS = [
  'Accredited from leading America\'s accreditation board (SCC, Canada & UAF, United States) under IAF for ISO Certification Services & accredited from Exemplar Global for ISO Lead Auditor / Implementation Training.',
  'United States Registered CPA firm (INTERCERT CPA LLC) in State of Montana, vide License Number PAC-FIRM-LIC-51611 for SOC2 / SOC1 Services.',
  'Accredited from Cloud Security Alliance, United States for CSA STAR Certification services.',
  'Registered Practitioner Organization (RPO) from Cyber AB, United States for CMMC Certification Services with onboard C3PAO\'s.',
  'PCI DSS QSA Company (Group Company) for PCI DSS Certification.',
  'Data Protection GDPR, HIPAA, PDPA & Cyber Security Compliances for NIST, HITRUST, FEDRAMP, DORA, NIS2, Cyber Essential attestation by qualified CISA\'s.',
  'VAPT & Security Assessment Services by a qualified team of CISA\'s / CEH / Cyber Experts.',
];

const ABOUT_CLOSING = 'With extensive experience across diverse industries and business sectors, INTERCERT experienced team of 150+ Assessors delivers assessment services globally in compliance with ISO 17021 requirements. Our team excels at adapting to changing business needs, ensuring that our service delivery consistently meets and exceeds client expectations.';

const COMMERCIAL_TC = [
  'The validity of Proposal is 30 days and INTERCERT reserve the right of acceptance beyond the validity period.',
  'Payment Terms – The 100% fee shall be paid before submission of final certificate/report.',
  'The final deliverables will always be issued on full settlement of invoices.',
  'All fees once paid are non-refundable in any circumstances.',
  'The assessment may be conducted (offsite / onsite) as per applicable rules, guidelines and Country / State specific guidelines travel advisories.',
  'The Travel and Boarding for assessment team (if required) shall be arranged by Client otherwise will be billed as per actuals to client.',
  'The above-mentioned fee is inclusive of all Offsite activities like Contract Review, Assessment Planning, Report Preparation, Reviews and issuance of certification / attestation tabulated based on information\'s as per client application & mentioned under scoping section, any deviation may lead to revision in certification fee / proposal.',
  'The Invoices shall be settled through electronic transfer within 15 days of Invoice or before conducting the audit, whichever is earlier. Any transfer charges or withholding taxes, if applicable will be on the part of client.',
];

const GENERAL_TC_SECTIONS = [
  {
    title: 'Fairness',
    text: 'The Assessment will be conducted as per the requirements of frameworks defined under the scoping and require suitable criteria for measurement of the effectiveness of the controls be identified as per applicable frameworks.\n\nThe assessment team will examine, on a test basis, evidence supporting company\'s description of controls, and perform other procedures, as necessary in the circumstances to provide a reasonable basis for the report.\n\nThe Client Top Management shall provide an assertion letter about the fairness of the presentation of the description and suitability of the design of the operating effectiveness of the controls to achieve the related control objectives of the required frameworks.\n\nThe Client shall make available all records, evidences, documentation & information required during the audit. The audit team will maintain privacy & confidentiality of the information provided.',
  },
  {
    title: 'Confidentiality',
    text: 'The Client and INTERCERT shall protect the confidentiality of each other\'s Confidential Information in the same manner as they protect the confidentiality of their own proprietary and confidential information of similar nature. Each Party, while acknowledging the confidential and proprietary nature of the Confidential Information agrees to take all reasonable measures at its own expense to restrain its representatives from prohibited or unauthorized disclosure or use of the Confidential Information.',
  },
  {
    title: 'Liability',
    text: 'The assessment be conducted at the given point of time based on sampling data of client process and establishment produced during the assessment process. INTERCERT don\'t assume any responsibility arising over client systems, management process or any new update or changes resulting from client team intervention or negligence.\n\nINTERCERT will not be accountable for any third-party claims, demand, suit, or proceedings made or brought against client by a third party arising from the non-compliance of assessed frameworks / compliance reporting.\n\nExcept to the extent prohibited by law, in no event shall INTERCERT or any of its officers, directors, shareholders, employees, auditors, subcontractors or agents be liable for any indirect, exemplary, incidental, special, punitive, cover, business interruption, lost profit, or consequential damages, whether an action is in contract or tort and regardless of the theory of liability, even if INTERCERT has been advised of the possibility of such damages. Notwithstanding anything to the contrary elsewhere contained herein, the maximum aggregate liability of INTERCERT together with its affiliates arising out of or related to this assignment shall not exceed the amount has paid by the client for this assignment in the six-month period preceding the event giving rise to the liability.',
  },
];

@Injectable()
export class ProposalReportService {
  private readonly logger = new Logger(ProposalReportService.name);
  private readonly PRIMARY_COLOR = '#0047AB';
  private readonly LIGHT_BLUE = '#E8F0FE';
  private readonly GRID_COLOR = 'black';
  private readonly TEXT_COLOR = 'black';

  async generateProposalReport(data: any): Promise<Buffer> {
    let preparedSignBuffer: Buffer | null = null;

    if (data.auth?.preparedBySign) {
      try {
        const response = await axios.get(data.auth.preparedBySign, { responseType: 'arraybuffer' });
        preparedSignBuffer = Buffer.from(response.data);
      } catch (err) {
        this.logger.warn(`Could not fetch signature from ${data.auth.preparedBySign}`);
      }
    }

    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument({ margin: 50, size: 'A4', bufferPages: true });
        const buffers: Buffer[] = [];

        doc.on('data', (chunk) => buffers.push(chunk));
        doc.on('end', () => resolve(Buffer.concat(buffers as any)));
        doc.on('error', (err) => reject(err));

        doc.strokeColor('black').lineWidth(0.5);

        this.generateCoverPage(doc, data.proposal, data.lead);
        this.generateCoverLetter(doc, data.proposal, data.lead, data.auth);
        this.generateSectionA(doc, data.lead, data.items);
        this.generateSectionB(doc, data.items, data.proposal);
        this.generateSectionC(doc, data.proposal);
        this.generateSignaturePage(doc, data.auth, preparedSignBuffer);

        const range = doc.bufferedPageRange();
        const logoPath = path.join(process.cwd(), 'libs', 'templates', 'Logo_Blue.png');

        for (let i = range.start; i < range.start + range.count; i++) {
          doc.switchToPage(i);
          this.generatePageHeader(doc, logoPath);
          this.generateFooter(doc, i + 1, range.count, data.proposal);
        }

        doc.end();
      } catch (error) {
        this.logger.error('Error generating Proposal PDF:', error);
        reject(error);
      }
    });
  }

  private generatePageHeader(doc: PDFKit.PDFDocument, logoPath: string) {
    doc.save();
    try {
      if (fs.existsSync(logoPath)) {
        doc.image(logoPath, 430, 20, { width: 120 });
      } else {
        doc.fillColor(this.PRIMARY_COLOR).fontSize(16).font('Helvetica-Bold')
          .text('INTERCERT', 410, 20, { width: 140, align: 'right' });
        doc.fontSize(8).font('Helvetica').fillColor('#555')
          .text('Certification & Security Services', 410, 40, { width: 140, align: 'right' });
      }
    } catch (error) {
      this.logger.warn('Could not add logo to PDF header, using text fallback');
      doc.fillColor(this.PRIMARY_COLOR).fontSize(16).font('Helvetica-Bold')
        .text('INTERCERT', 410, 20, { width: 140, align: 'right' });
    }
    doc.restore();
  }

  private generateFooter(doc: PDFKit.PDFDocument, pageNum: number, totalPages: number, proposal: any) {
    const footerY = 760;
    doc.save();
    
    // Footer line
    doc.moveTo(50, footerY - 5).lineTo(550, footerY - 5)
      .strokeColor('#E5E7EB').lineWidth(0.5).stroke();
    
    // Footer content
    doc.fontSize(8).fillColor('#6B7280').font('Helvetica');
    
    // Left side: Proposal reference
    const ref = proposal?.proposalReference || '';
    doc.text(`Ref: ${ref}`, 50, footerY, { lineBreak: false });
    
    // Center: Confidential notice
    doc.text('CONFIDENTIAL AND PROPRIETARY', 275, footerY, { align: 'center', width: 50, lineBreak: false });
    
    // Right side: Page numbering
    const rightX = 450;
    const rightWidth = 100;
    doc.text(`Page ${pageNum} of ${totalPages}`, rightX, footerY, { align: 'right', width: rightWidth, lineBreak: false });
    
    // Second line: Company info
    doc.text(`INTERCERT © ${new Date().getFullYear()} | ${INTERCERT_WEBSITE}`, 50, footerY + 10, { lineBreak: false });
    
    doc.restore();
  }

  private checkPageBreak(doc: PDFKit.PDFDocument, neededHeight: number): boolean {
    if (doc.y + neededHeight > 740) {
      doc.addPage();
      doc.y = 100;
      return true;
    }
    return false;
  }

  private drawSectionHeader(doc: PDFKit.PDFDocument, title: string) {
    this.checkPageBreak(doc, 60);
    const y = doc.y;
    
    // Section header with border
    doc.fillColor(this.PRIMARY_COLOR).fontSize(14).font('Helvetica-Bold')
      .text(title, 50, y + 5);
    
    // Underline
    doc.moveTo(50, y + 20).lineTo(550, y + 20)
      .strokeColor(this.PRIMARY_COLOR).lineWidth(1).stroke();
    
    doc.moveDown(1.2);
    doc.font('Helvetica').fillColor(this.TEXT_COLOR);
  }

  private drawSubSectionHeader(doc: PDFKit.PDFDocument, title: string) {
    this.checkPageBreak(doc, 40);
    const y = doc.y;
    
    // Subsection header with bold text and small underline
    doc.fillColor(this.PRIMARY_COLOR).fontSize(12).font('Helvetica-Bold')
      .text(title, 50, y + 3);
    
    // Small underline
    doc.moveTo(50, y + 15).lineTo(250, y + 15)
      .strokeColor(this.PRIMARY_COLOR).lineWidth(0.5).stroke();
    
    doc.moveDown(1);
    doc.font('Helvetica').fillColor(this.TEXT_COLOR);
  }

  private generateCoverPage(doc: PDFKit.PDFDocument, proposal: any, lead: any) {
    doc.y = 100;

    // Company Logo and Header
    doc.fillColor(this.PRIMARY_COLOR).fontSize(16).font('Helvetica-Bold')
      .text('INTERCERT', 50, doc.y, { align: 'center', width: 500 });
    doc.fontSize(10).font('Helvetica').fillColor('#555')
      .text('Certification & Security Services', 50, doc.y, { align: 'center', width: 500 });
    doc.moveDown(2);

    // Main Title
    doc.fontSize(28).font('Helvetica-Bold').fillColor(this.PRIMARY_COLOR)
      .text('BUSINESS PROPOSAL', 50, doc.y, { align: 'center', width: 500 });
    doc.moveDown(1.5);

    // Division
    const division = proposal?.division || 'GRC DIVISION';
    doc.fontSize(14).font('Helvetica-Bold').fillColor('#555')
      .text(division, 50, doc.y, { align: 'center', width: 500 });
    doc.moveDown(2);

    // Subject Line
    const subject = proposal?.subject || `Proposal for Services`;
    doc.fontSize(12).font('Helvetica').fillColor(this.TEXT_COLOR)
      .text(subject, 50, doc.y, { align: 'center', width: 500 });
    doc.moveDown(3);

    // Horizontal Line
    doc.moveTo(100, doc.y).lineTo(500, doc.y)
      .strokeColor(this.PRIMARY_COLOR).lineWidth(1).stroke();
    doc.moveDown(2);

    // Submitted To Section
    doc.fontSize(12).font('Helvetica-Bold').fillColor(this.TEXT_COLOR)
      .text('SUBMITTED TO:', 50, doc.y);
    doc.font('Helvetica').fontSize(14).fillColor(this.PRIMARY_COLOR)
      .text(lead?.customerName || '', 50, doc.y, { width: 300 });
    doc.moveDown(1.5);

    // Proposal Information Table
    const infoY = doc.y;
    const labelX = 50;
    const valueX = 200;

    const renderInfoRow = (label: string, value: string, y: number) => {
      doc.font('Helvetica-Bold').fontSize(10).fillColor(this.TEXT_COLOR).text(label, labelX, y);
      doc.font('Helvetica').fontSize(10).fillColor('#555').text(value || 'N/A', valueX, y, { width: 300 });
    };

    renderInfoRow('Proposal No.:', proposal?.proposalReference || 'N/A', infoY);
    doc.moveDown(1);
    renderInfoRow('Dated:', this.formatDate(proposal?.proposalDate), doc.y);
    doc.moveDown(1);
    renderInfoRow('Submitted By:', proposal?.submittedBy || 'INTERCERT', doc.y);
    doc.moveDown(1);
    renderInfoRow('Valid Until:', this.formatDate(proposal?.validUntil), doc.y);
    doc.moveDown(3);

    // INTERCERT Contact Information
    doc.fontSize(9).font('Helvetica').fillColor('#777')
      .text(INTERCERT_ADDRESS, 50, doc.y, { align: 'center', width: 500 });
    doc.moveDown(0.3);
    doc.text(`Phone: ${INTERCERT_PHONE} | Email: ${INTERCERT_EMAIL} | Website: ${INTERCERT_WEBSITE}`, 50, doc.y, { align: 'center', width: 500 });
    doc.moveDown(2);

    // Final Horizontal Line
    doc.moveTo(100, doc.y).lineTo(500, doc.y)
      .strokeColor(this.PRIMARY_COLOR).lineWidth(1).stroke();
  }

  private generateCoverLetter(doc: PDFKit.PDFDocument, proposal: any, lead: any, auth: any) {
    doc.addPage();
    doc.y = 100;

    // Header with Proposal Reference and Date
    doc.fontSize(10).font('Helvetica-Bold').fillColor(this.TEXT_COLOR)
      .text(`Proposal No.: ${proposal?.proposalReference || 'N/A'}`, 50, doc.y);
    doc.font('Helvetica-Bold')
      .text(`Date: ${this.formatDate(proposal?.proposalDate)}`, 400, doc.y, { align: 'right', width: 150 });
    doc.moveDown(2);

    // Recipient Address
    doc.font('Helvetica-Bold').fontSize(10).fillColor(this.TEXT_COLOR)
      .text('To,', 50, doc.y);
    doc.moveDown(0.5);
    
    doc.font('Helvetica').fontSize(11).fillColor(this.TEXT_COLOR)
      .text(lead?.customerName || '', 50, doc.y, { width: 300 });

    const addressParts = [
      lead?.customerAddress,
      lead?.customerCity,
      lead?.customerState,
      lead?.customerCountry,
    ].filter(Boolean).join(', ');

    if (addressParts) {
      doc.moveDown(0.5);
      doc.text(addressParts, 50, doc.y, { width: 300 });
    }
    
    if (lead?.contactPerson) {
      doc.moveDown(0.5);
      doc.text(`Attn: ${lead.contactPerson}`, 50, doc.y, { width: 300 });
    }
    
    if (lead?.contactEmail) {
      doc.moveDown(0.5);
      doc.text(`Email: ${lead.contactEmail}`, 50, doc.y, { width: 300 });
    }
    
    if (lead?.contactPhone) {
      doc.moveDown(0.5);
      doc.text(`Phone: ${lead.contactPhone}`, 50, doc.y, { width: 300 });
    }
    
    doc.moveDown(2);

    // Subject Line
    const subject = proposal?.subject || 'Proposal for Services';
    doc.font('Helvetica-Bold').fontSize(11)
      .text(`Subject: ${subject}`, 50, doc.y, { width: 500 });
    doc.moveDown(1.5);

    // Salutation
    doc.font('Helvetica').fontSize(11).fillColor(this.TEXT_COLOR)
      .text('Dear Sir/Madam,', 50, doc.y);
    doc.moveDown(1.5);

    // Introduction Paragraph
    doc.font('Helvetica').fontSize(11).fillColor(this.TEXT_COLOR)
      .text('Further to your enquiry and subsequent discussions, we are pleased to submit our comprehensive proposal for the services outlined below.', 50, doc.y, { width: 500, align: 'justify' });
    doc.moveDown(1);

    // About INTERCERT
    doc.font('Helvetica').fontSize(11).fillColor(this.TEXT_COLOR)
      .text(ABOUT_INTERCERT[0], 50, doc.y, { width: 500, align: 'justify' });
    doc.moveDown(1);
    
    doc.font('Helvetica-Bold').text(ABOUT_INTERCERT[1], 50, doc.y);
    doc.moveDown(0.5);

    // Accreditations List
    ACCREDITATIONS.forEach((item) => {
      this.checkPageBreak(doc, 35);
      const bulletY = doc.y;
      doc.font('Helvetica').fontSize(10).fillColor(this.TEXT_COLOR)
        .text('\u2022', 55, bulletY);
      doc.text(item, 70, bulletY, { width: 475, align: 'justify' });
      doc.moveDown(0.5);
    });

    doc.moveDown(0.5);
    this.checkPageBreak(doc, 60);
    
    // Closing About INTERCERT
    doc.font('Helvetica').fontSize(11).fillColor(this.TEXT_COLOR)
      .text(ABOUT_CLOSING, 50, doc.y, { width: 500, align: 'justify' });
    doc.moveDown(1);

    // Proposal Submission Statement
    this.checkPageBreak(doc, 60);
    doc.font('Helvetica').fontSize(11)
      .text('We have carefully reviewed your requirements and are confident in our ability to deliver exceptional service that meets your expectations.', 50, doc.y, { width: 500, align: 'justify' });
    doc.moveDown(1);
    
    doc.text('This proposal outlines our understanding of your needs, the scope of services, commercial terms, and our approach to delivering value.', 50, doc.y, { width: 500, align: 'justify' });
    doc.moveDown(1.5);

    // Closing Remarks
    doc.text('We look forward to the opportunity to partner with you and contribute to your organization\'s success.', 50, doc.y, { width: 500, align: 'justify' });
    doc.moveDown(2);

    // Signature Block
    doc.font('Helvetica').text('Thanking you,', 50, doc.y);
    doc.moveDown(1);
    
    doc.font('Helvetica-Bold').text(auth?.preparedBy || 'N/A', 50, doc.y);
    
    if (auth?.preparedByDesignation) {
      doc.font('Helvetica').fontSize(10).fillColor('#555')
        .text(auth.preparedByDesignation, 50, doc.y);
    }
    
    if (auth?.preparedByEmail) {
      doc.font('Helvetica').fontSize(10).fillColor('#555')
        .text(auth.preparedByEmail, 50, doc.y);
    }
    
    doc.moveDown(0.5);
    
    doc.font('Helvetica-Bold').text(auth?.submittedByEntity || 'INTERCERT', 50, doc.y);
    doc.moveDown(2);
  }

  private generateSectionA(doc: PDFKit.PDFDocument, lead: any, items: any[]) {
    this.checkPageBreak(doc, 80);
    this.drawSectionHeader(doc, 'Section A – Scoping & Project Deliverables');

    this.drawSubSectionHeader(doc, 'A.1 Scoping');

    const scopingRows = [
      { label: 'Company Name', value: lead?.customerName || '' },
      { label: 'Location/s & Headcounts', value: [lead?.customerCity, lead?.customerCountry, lead?.headcount ? `(${lead.headcount})` : ''].filter(Boolean).join(', ') },
      { label: 'Business Activities', value: lead?.businessActivities || '' },
      {
        label: 'Scope of Services',
        value: items?.map((item: any, idx: number) => `${idx + 1}. ${item.serviceName || item.leadService?.service?.name || ''}`).join('\n') || '',
      },
    ];

    scopingRows.forEach((row) => {
      this.checkPageBreak(doc, 35);
      const rowY = doc.y;
      const LABEL_W = 130;
      const VALUE_W = 370;
      const labelH = doc.fontSize(10).font('Helvetica-Bold').heightOfString(row.label, { width: LABEL_W - 10 });
      const valueH = doc.font('Helvetica').heightOfString(row.value || 'N/A', { width: VALUE_W - 10 });
      const rowH = Math.max(labelH, valueH) + 12;

      doc.save();
      doc.fillColor(this.LIGHT_BLUE).rect(50, rowY, LABEL_W, rowH).fill();
      doc.strokeColor(this.GRID_COLOR).lineWidth(0.5).rect(50, rowY, LABEL_W, rowH).stroke();
      doc.strokeColor(this.GRID_COLOR).rect(50 + LABEL_W, rowY, VALUE_W, rowH).stroke();

      doc.fillColor(this.PRIMARY_COLOR).font('Helvetica-Bold').fontSize(10)
        .text(row.label, 55, rowY + 6, { width: LABEL_W - 10 });
      doc.fillColor(this.TEXT_COLOR).font('Helvetica').fontSize(10)
        .text(row.value || 'N/A', 50 + LABEL_W + 5, rowY + 6, { width: VALUE_W - 10 });
      doc.restore();
      doc.y = rowY + rowH;
    });

    doc.moveDown(1.5);

    this.checkPageBreak(doc, 80);
    this.drawSubSectionHeader(doc, 'A.2 Project Deliverables');

    this.drawDeliverablesTableHeader(doc);
    items?.forEach((item: any) => {
      const serviceName = item.serviceName || item.leadService?.service?.name || '';
      const deliverables = Array.isArray(item.deliverables)
        ? item.deliverables.join('\n')
        : (item.description || '');

      if (this.checkPageBreak(doc, 40)) {
        this.drawDeliverablesTableHeader(doc);
      }

      const currentY = doc.y;
      const sH = doc.fontSize(9).font('Helvetica').heightOfString(serviceName, { width: 175 });
      const dH = doc.heightOfString(deliverables || 'N/A', { width: 310 });
      const rowH = Math.max(sH, dH) + 12;

      doc.save();
      doc.strokeColor(this.GRID_COLOR).lineWidth(0.5).rect(50, currentY, 185, rowH).stroke();
      doc.strokeColor(this.GRID_COLOR).rect(235, currentY, 315, rowH).stroke();
      doc.fillColor(this.TEXT_COLOR).font('Helvetica').fontSize(9)
        .text(serviceName, 55, currentY + 6, { width: 175 });
      doc.text(deliverables || 'N/A', 240, currentY + 6, { width: 305 });
      doc.restore();
      doc.y = currentY + rowH;
    });

    doc.moveDown(1.5);

    this.checkPageBreak(doc, 80);
    this.drawSubSectionHeader(doc, 'A.3 Timelines');

    doc.fontSize(9).font('Helvetica').fillColor('#555')
      .text('The estimated timelines mentioned below depends upon client team support and providing the required information to audit team.', 50, doc.y, { width: 500 });
    doc.moveDown(0.8);

    this.drawTimelinesTableHeader(doc);
    items?.forEach((item: any) => {
      const serviceName = item.serviceName || item.leadService?.service?.name || '';
      const timeline = item.timeline || '3-4 Weeks';

      if (this.checkPageBreak(doc, 30)) {
        this.drawTimelinesTableHeader(doc);
      }

      const currentY = doc.y;
      const sH = doc.fontSize(9).font('Helvetica').heightOfString(serviceName, { width: 310 });
      const tH = doc.heightOfString(timeline, { width: 175 });
      const rowH = Math.max(sH, tH) + 10;

      doc.save();
      doc.strokeColor(this.GRID_COLOR).lineWidth(0.5).rect(50, currentY, 320, rowH).stroke();
      doc.strokeColor(this.GRID_COLOR).rect(370, currentY, 180, rowH).stroke();
      doc.fillColor(this.TEXT_COLOR).font('Helvetica').fontSize(9)
        .text(serviceName, 55, currentY + 5, { width: 310 });
      doc.text(timeline, 375, currentY + 5, { width: 170 });
      doc.restore();
      doc.y = currentY + rowH;
    });

    doc.moveDown(2);
  }

  private drawDeliverablesTableHeader(doc: PDFKit.PDFDocument) {
    const tableTop = doc.y;
    doc.fontSize(9).font('Helvetica-Bold');

    const cols = [
      { text: 'Services', x: 50, w: 185 },
      { text: 'Deliverables', x: 235, w: 315 },
    ];

    let maxH = 18;
    cols.forEach(c => {
      const h = doc.heightOfString(c.text, { width: c.w - 10 });
      if (h > maxH) maxH = h;
    });
    maxH += 10;

    cols.forEach(c => {
      doc.save();
      doc.fillColor(this.LIGHT_BLUE).rect(c.x, tableTop, c.w, maxH).fill();
      doc.strokeColor(this.GRID_COLOR).lineWidth(0.5).rect(c.x, tableTop, c.w, maxH).stroke();
      doc.fillColor(this.PRIMARY_COLOR).text(c.text, c.x + 5, tableTop + 5, { width: c.w - 10, align: 'center' });
      doc.restore();
    });

    doc.y = tableTop + maxH;
    doc.font('Helvetica').fontSize(9);
  }

  private drawTimelinesTableHeader(doc: PDFKit.PDFDocument) {
    const tableTop = doc.y;
    doc.fontSize(9).font('Helvetica-Bold');

    const cols = [
      { text: 'Services', x: 50, w: 320 },
      { text: 'Timelines', x: 370, w: 180 },
    ];

    let maxH = 18;
    cols.forEach(c => {
      const h = doc.heightOfString(c.text, { width: c.w - 10 });
      if (h > maxH) maxH = h;
    });
    maxH += 10;

    cols.forEach(c => {
      doc.save();
      doc.fillColor(this.LIGHT_BLUE).rect(c.x, tableTop, c.w, maxH).fill();
      doc.strokeColor(this.GRID_COLOR).lineWidth(0.5).rect(c.x, tableTop, c.w, maxH).stroke();
      doc.fillColor(this.PRIMARY_COLOR).text(c.text, c.x + 5, tableTop + 5, { width: c.w - 10, align: 'center' });
      doc.restore();
    });

    doc.y = tableTop + maxH;
    doc.font('Helvetica').fontSize(9);
  }

  private generateSectionB(doc: PDFKit.PDFDocument, items: any[], proposal: any) {
    this.checkPageBreak(doc, 100);
    this.drawSectionHeader(doc, 'Section B – Project Fee');

    const currency = proposal?.currency || 'USD';

    // Enhanced table columns with better spacing
    const cols = [
      { text: '#', x: 50, w: 35 },
      { text: 'Service Description', x: 85, w: 320 },
      { text: `Amount (${currency})`, x: 405, w: 145 },
    ];

    const tableTop = doc.y;
    
    // Table header with professional styling
    doc.save();
    doc.fillColor(this.PRIMARY_COLOR).rect(50, tableTop, 500, 25).fill();
    
    cols.forEach(c => {
      doc.fillColor('white').font('Helvetica-Bold').fontSize(10)
        .text(c.text, c.x + 5, tableTop + 8, { width: c.w - 10, align: c.text.includes('Amount') ? 'right' : 'left' });
      
      // Vertical separators
      if (c.x > 50) {
        doc.moveTo(c.x, tableTop).lineTo(c.x, tableTop + 25)
          .strokeColor('white').lineWidth(0.5).stroke();
      }
    });
    
    // Bottom border
    doc.moveTo(50, tableTop + 25).lineTo(550, tableTop + 25)
      .strokeColor(this.PRIMARY_COLOR).lineWidth(1).stroke();
    
    doc.restore();
    doc.y = tableTop + 25;

    // Table rows with alternating background colors
    items?.forEach((item: any, idx: number) => {
      if (this.checkPageBreak(doc, 30)) {
        // Recreate header if page break occurs
        const hdrY = doc.y;
        doc.save();
        doc.fillColor(this.PRIMARY_COLOR).rect(50, hdrY, 500, 25).fill();
        
        cols.forEach(c => {
          doc.fillColor('white').font('Helvetica-Bold').fontSize(10)
            .text(c.text, c.x + 5, hdrY + 8, { width: c.w - 10, align: c.text.includes('Amount') ? 'right' : 'left' });
          
          if (c.x > 50) {
            doc.moveTo(c.x, hdrY).lineTo(c.x, hdrY + 25)
              .strokeColor('white').lineWidth(0.5).stroke();
          }
        });
        
        doc.moveTo(50, hdrY + 25).lineTo(550, hdrY + 25)
          .strokeColor(this.PRIMARY_COLOR).lineWidth(1).stroke();
        
        doc.restore();
        doc.y = hdrY + 25;
      }

      const currentY = doc.y;
      const serviceName = item.serviceName || item.leadService?.service?.name || '';
      const amount = Number(item.netAmount || item.amount || 0);
      const amountStr = amount > 0 ? this.formatCurrency(amount, currency) : `${currency}`;

      const sH = doc.fontSize(10).heightOfString(serviceName, { width: cols[1].w - 10 });
      const rowH = Math.max(sH, 20) + 10;

      // Alternating row colors
      const bgColor = idx % 2 === 0 ? '#FFFFFF' : '#F8F9FB';
      
      doc.save();
      doc.fillColor(bgColor).rect(50, currentY, 500, rowH).fill();
      
      // Cell borders
      cols.forEach(c => {
        doc.strokeColor('#E5E7EB').lineWidth(0.5).rect(c.x, currentY, c.w, rowH).stroke();
      });
      
      // Cell content
      doc.fillColor(this.TEXT_COLOR).fontSize(10).font('Helvetica')
        .text(String(idx + 1), cols[0].x + 5, currentY + 8, { width: cols[0].w - 10, align: 'center' });
      
      doc.text(serviceName, cols[1].x + 5, currentY + 8, { width: cols[1].w - 10 });
      
      doc.font('Helvetica-Bold')
        .text(amountStr, cols[2].x + 5, currentY + 8, { width: cols[2].w - 10, align: 'right' });
      
      doc.restore();
      doc.y = currentY + rowH;
    });

    // Total row with prominent styling
    this.checkPageBreak(doc, 200);
    const totalY = doc.y;
    const totalRowH = 28;
    const grandTotal = Number(proposal?.grandTotal || proposal?.totalAmount || 0);
    const totalStr = grandTotal > 0 ? this.formatCurrency(grandTotal, currency) : `${currency}`;

    doc.save();
    
    // Total row background
    doc.fillColor(this.PRIMARY_COLOR).rect(50, totalY, 500, totalRowH).fill();
    
    // Total label
    doc.fillColor('white').font('Helvetica-Bold').fontSize(12)
      .text('TOTAL FEE', cols[1].x + 5, totalY + 9, { width: cols[1].w - 10, align: 'right' });
    
    // Total amount
    doc.fillColor('white').font('Helvetica-Bold').fontSize(12)
      .text(totalStr, cols[2].x + 5, totalY + 9, { width: cols[2].w - 10, align: 'right' });
    
    // Top border for total row
    doc.moveTo(50, totalY).lineTo(550, totalY)
      .strokeColor(this.PRIMARY_COLOR).lineWidth(1).stroke();
    
    doc.restore();
    doc.y = totalY + totalRowH;

    doc.moveDown(2);
    
    // Additional notes about payment terms
    doc.fontSize(9).font('Helvetica').fillColor('#6B7280')
      .text('Note: All amounts are exclusive of applicable taxes. Payment terms: 50% advance, 50% upon completion.', 50, doc.y, { width: 500 });
    doc.moveDown(1);
  }

  private generateSectionC(doc: PDFKit.PDFDocument, proposal: any) {
    this.checkPageBreak(doc, 80);
    this.drawSectionHeader(doc, 'Section C – Terms & Conditions');

    this.drawSubSectionHeader(doc, 'C.1 Commercial Terms & Conditions');

    COMMERCIAL_TC.forEach((item, idx) => {
      this.checkPageBreak(doc, 35);
      const bulletY = doc.y;
      doc.font('Helvetica').fontSize(9).fillColor(this.TEXT_COLOR)
        .text(`${idx + 1}.`, 55, bulletY, { width: 20 });
      doc.text(item, 75, bulletY, { width: 470, align: 'justify' });
      doc.moveDown(0.6);
    });

    if (proposal?.termsAndConditions) {
      doc.moveDown(0.5);
      this.checkPageBreak(doc, 40);
      doc.font('Helvetica').fontSize(9).fillColor(this.TEXT_COLOR)
        .text(proposal.termsAndConditions, 50, doc.y, { width: 500, align: 'justify' });
    }

    doc.moveDown(1.5);

    this.checkPageBreak(doc, 60);
    this.drawSubSectionHeader(doc, 'C.2 General Terms & Conditions');

    GENERAL_TC_SECTIONS.forEach((section) => {
      this.checkPageBreak(doc, 60);
      doc.font('Helvetica-Bold').fontSize(10).fillColor(this.PRIMARY_COLOR)
        .text(section.title, 50, doc.y);
      doc.moveDown(0.5);
      doc.font('Helvetica').fontSize(9).fillColor(this.TEXT_COLOR)
        .text(section.text, 50, doc.y, { width: 500, align: 'justify' });
      doc.moveDown(1.2);
    });

    doc.moveDown(1);
  }

  private generateSignaturePage(
    doc: PDFKit.PDFDocument,
    auth: any,
    preparedSignBuffer?: Buffer | null,
  ) {
    this.checkPageBreak(doc, 200);

    const TABLE_LEFT = 50;
    const TABLE_WIDTH = 500;
    const COL_W = TABLE_WIDTH / 2;

    const SUBMITTED_X = TABLE_LEFT;
    const ACCEPTED_X = TABLE_LEFT + COL_W;

    // Signature section header
    doc.font('Helvetica-Bold').fontSize(12).fillColor(this.PRIMARY_COLOR)
      .text('ACCEPTANCE AND AUTHORIZATION', 50, doc.y);
    doc.moveTo(50, doc.y + 15).lineTo(300, doc.y + 15)
      .strokeColor(this.PRIMARY_COLOR).lineWidth(0.5).stroke();
    doc.moveDown(2);

    const baseY = doc.y;

    // Submitted By section
    doc.font('Helvetica-Bold').fontSize(11).fillColor(this.TEXT_COLOR)
      .text(`FOR ${auth?.submittedByEntity || 'INTERCERT'}`, SUBMITTED_X, baseY);
    
    // Accepted By section  
    doc.font('Helvetica-Bold').fontSize(11).fillColor(this.TEXT_COLOR)
      .text('FOR CLIENT ORGANIZATION', ACCEPTED_X, baseY);

    doc.moveDown(3);
    const sigY = doc.y;

    // Signature lines
    doc.moveTo(SUBMITTED_X, sigY).lineTo(SUBMITTED_X + 200, sigY)
      .strokeColor('#666').lineWidth(0.5).stroke();
    
    doc.moveTo(ACCEPTED_X, sigY).lineTo(ACCEPTED_X + 200, sigY)
      .strokeColor('#666').lineWidth(0.5).stroke();

    // Signature image if available
    if (preparedSignBuffer) {
      try {
        doc.image(preparedSignBuffer, SUBMITTED_X, sigY - 25, { height: 30 });
      } catch (err) {
        this.logger.warn('Could not embed signature image');
      }
    }

    doc.moveDown(2);
    const nameY = doc.y;

    // Submitted By details
    doc.font('Helvetica-Bold').fontSize(10).fillColor(this.TEXT_COLOR)
      .text('Name:', SUBMITTED_X, nameY);
    doc.font('Helvetica').fontSize(10).fillColor(this.TEXT_COLOR)
      .text(auth?.preparedBy || 'Authorized Signatory', SUBMITTED_X, nameY + 14, { width: 200 });

    if (auth?.preparedByDesignation) {
      doc.font('Helvetica').fontSize(9).fillColor('#666')
        .text(auth.preparedByDesignation, SUBMITTED_X, nameY + 28, { width: 200 });
    }

    // Accepted By details
    doc.font('Helvetica-Bold').fontSize(10).fillColor(this.TEXT_COLOR)
      .text('Name:', ACCEPTED_X, nameY);
    doc.font('Helvetica').fontSize(10).fillColor('#666')
      .text('_________________________', ACCEPTED_X, nameY + 14, { width: 200 });

    doc.font('Helvetica-Bold').fontSize(10).fillColor(this.TEXT_COLOR)
      .text('Designation:', ACCEPTED_X, nameY + 28);
    doc.font('Helvetica').fontSize(9).fillColor('#666')
      .text('_________________________', ACCEPTED_X, nameY + 42, { width: 200 });

    doc.moveDown(2);
    
    // Date section
    const dateY = doc.y;
    doc.font('Helvetica-Bold').fontSize(10).fillColor(this.TEXT_COLOR)
      .text('Date:', SUBMITTED_X, dateY);
    doc.font('Helvetica').fontSize(10).fillColor(this.TEXT_COLOR)
      .text(new Date().toLocaleDateString('en-GB'), SUBMITTED_X, dateY + 14, { width: 200 });

    doc.font('Helvetica-Bold').fontSize(10).fillColor(this.TEXT_COLOR)
      .text('Date:', ACCEPTED_X, dateY);
    doc.font('Helvetica').fontSize(10).fillColor('#666')
      .text('_________________________', ACCEPTED_X, dateY + 14, { width: 200 });

    doc.moveDown(3);
    
    // Terms acceptance note
    doc.font('Helvetica').fontSize(9).fillColor('#666').font('Helvetica-Oblique')
      .text('By signing this proposal, both parties agree to the terms and conditions outlined in this document.', 50, doc.y, { width: 500 });
  }

  private formatDate(date: Date | string | null | undefined): string {
    if (!date) return 'N/A';
    try {
      const d = new Date(date);
      if (isNaN(d.getTime())) return String(date);
      return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    } catch {
      return String(date);
    }
  }

  private formatCurrency(amount: number, currency: string): string {
    // use text currency codes to avoid encoding issues
    const symbols: Record<string, string> = { INR: 'INR ', USD: '$', EUR: '€', ZAR: 'R', GBP: '£' };
    const symbol = symbols[currency] || `${currency} `;
    return `${symbol}${Number(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
}
