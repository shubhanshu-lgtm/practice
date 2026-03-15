// import { Injectable, Logger } from '@nestjs/common';
// import PDFDocument from 'pdfkit';
// import * as path from 'path';
// import axios from 'axios';
// import { STANDARD_SCHEME_LABEL } from '../../../../../../libs/constants/technicalClusterMapping';
// import { STATIC_EVALUATION_CRITERIA } from '../../../../../../libs/constants/src/static-evaluation-criteria';

// @Injectable()
// export class AuditorReportService {
//   private readonly logger = new Logger(AuditorReportService.name);
//   private readonly PRIMARY_COLOR = '#0047AB';
//   private readonly LIGHT_BLUE = '#E8F0FE';
//   private readonly GRID_COLOR = 'black';
//   private readonly TEXT_COLOR = 'black';

//   async generateEvaluationReport(data: any): Promise<Buffer> {
//     // Pre-fetch signature images if they are URLs
//     let evalSignBuffer: Buffer | null = null;
//     let approveSignBuffer: Buffer | null = null;

//     if (data.auditorAuth?.evaluatedBySign) {
//       try {
//         const response = await axios.get(data.auditorAuth.evaluatedBySign, { responseType: 'arraybuffer' });
//         evalSignBuffer = Buffer.from(response.data);
//       } catch (err) {
//         this.logger.warn(`Could not fetch evaluation signature image from ${data.auditorAuth.evaluatedBySign}`);
//       }
//     }

//     if (data.auditorAuth?.approvedBySign) {
//       try {
//         const response = await axios.get(data.auditorAuth.approvedBySign, { responseType: 'arraybuffer' });
//         approveSignBuffer = Buffer.from(response.data);
//       } catch (err) {
//         this.logger.warn(`Could not fetch approval signature image from ${data.auditorAuth.approvedBySign}`);
//       }
//     }

//     return new Promise((resolve, reject) => {
//       try {
//         const doc = new PDFDocument({ margin: 50, size: 'A4', bufferPages: true });
//         const buffers: Buffer[] = [];

//         doc.on('data', (chunk) => buffers.push(chunk));
//         doc.on('end', () => resolve(Buffer.concat(buffers as any)));
//         doc.on('error', (err) => reject(err));

//         doc.strokeColor('black').lineWidth(0.5);

//         // Start content lower to clear the header logo on the first page
//         doc.y = 100;

//         this.generateHeader(doc);
//         this.generateApplicantInformation(doc, data.auditor);
//         this.generateEducationalQualifications(doc, data.educationQualifications);
//         this.generateWorkExperience(doc, data.workExperiences);
//         this.generateLeadAuditorTraining(doc, data.leadAuditorTraining);
//         this.generateAuditExperience(doc, data.auditExperiences, data.auditor.qualified_position);
//         this.generateGradeEvaluation(doc, data.evaluationGrades);
//         this.generateGradeEvaluationResults(doc, data.codeAllocations, data.initialAllocation);
//         this.generateStandardAllocationEvaluation(doc, data.applicableStandards);
//         this.generateInterviewResult(doc, data.interviewResult);
//         this.generateInitialAllocation(doc, data.initialAllocation, data.auditorAuth, evalSignBuffer, approveSignBuffer);

//         // Add header logo and footer to all pages
//         const range = doc.bufferedPageRange();
//         const logoPath = path.join(process.cwd(), 'libs', 'templates', 'Logo_Blue.png');

//         for (let i = range.start; i < range.start + range.count; i++) {
//           doc.switchToPage(i);
//           this.generatePageHeader(doc, logoPath);
//           this.generateFooter(doc, i + 1, range.count);
//         }

//         doc.end();
//       } catch (error) {
//         this.logger.error('Error generating PDF report:', error);
//         reject(error);
//       }
//     });
//   }

//   private generateFooter(doc: PDFKit.PDFDocument, pageNum: number, totalPages: number) {
//     const footerY = 760; // Moved up to be safely away from the absolute bottom (841)
    
//     doc.save();
//     doc.fontSize(9).fillColor('black').font('Helvetica');
    
//     // Use fixed coordinates to prevent any automatic layout shifts
//     doc.text('Auditor Registration – Initial', 50, footerY, { lineBreak: false });
    
//     // Right side: IC.F.01 and Page Number
//     const rightX = 450;
//     const rightWidth = 100;
    
//     doc.text('IC.F.01', rightX, footerY, { align: 'right', width: rightWidth, lineBreak: false });
//     doc.text(`Page ${pageNum} of ${totalPages}`, rightX, footerY + 12, { align: 'right', width: rightWidth, lineBreak: false });
    
//     doc.restore();
//   }

//   private generatePageHeader(doc: PDFKit.PDFDocument, logoPath: string) {
//     doc.save();
//     try {
//       // Position logo at the top right, similar to Contract Agreement.pdf
//       // Reference positioning: 430x, 20y with width ~120
//       doc.image(logoPath, 430, 20, { width: 120 });
//     } catch (error) {
//       this.logger.error('Could not add logo to PDF header:', error);
//     }
//     doc.restore();
//   }

//   private generateHeader(doc: PDFKit.PDFDocument) {
//     doc
//       .fillColor(this.PRIMARY_COLOR)
//       .fontSize(22)
//       .text('AUDITOR REGISTRATION FORM (INITIAL)', { align: 'center' })
//       .moveDown(0.5);
      
//     doc
//       .moveTo(50, doc.y)
//       .lineTo(550, doc.y)
//       .strokeColor(this.PRIMARY_COLOR)
//       .lineWidth(1)
//       .stroke();
      
//     doc.moveDown(1.5);
//   }

//   private drawSectionHeader(doc: PDFKit.PDFDocument, title: string) {
//     this.checkPageBreak(doc, 60);
    
//     const y = doc.y;
//     doc
//       .fillColor(this.LIGHT_BLUE)
//       .rect(50, y, 500, 25)
//       .fill();
      
//     doc
//       .fillColor(this.PRIMARY_COLOR)
//       .fontSize(12)
//       .font('Helvetica-Bold')
//       .text(title, 60, y + 7);
      
//     doc.moveDown(1.5);
//     doc.font('Helvetica').fillColor(this.TEXT_COLOR);
//   }

//   private checkPageBreak(doc: PDFKit.PDFDocument, neededHeight: number): boolean {
//     // Threshold adjusted to 740 to leave space for footer at 760
//     if (doc.y + neededHeight > 740) {
//       doc.addPage();
//       doc.y = 100; // Reset to 100 to clear the header logo on subsequent pages
//       return true;
//     }
//     return false;
//   }

//   private generateApplicantInformation(doc: PDFKit.PDFDocument, auditor: any) {
//     this.checkPageBreak(doc, 150);
//     this.drawSectionHeader(doc, 'A.1 APPLICANT INFORMATION');

//     const startY = doc.y;
//     doc.fontSize(10).fillColor(this.TEXT_COLOR);
    
//     const labelX = 60;
//     const valueX = 160;
//     const label2X = 300;
//     const value2X = 400;

//     const renderField = (label: string, value: string, x: number, vX: number, y: number) => {
//       doc.font('Helvetica-Bold').text(label, x, y);
//       doc.font('Helvetica').text(value || 'N/A', vX, y);
//     };

//     renderField('Name:', auditor.auditor_name, labelX, valueX, startY);
//     renderField('Nationality:', auditor.auditor_nationality, label2X, value2X, startY);
    
//     doc.moveDown(1.2);
//     const nextY = doc.y;
//     renderField('Organization:', auditor.auditor_organization, labelX, valueX, nextY);
//     renderField('Registration No.:', auditor.registration_no, label2X, value2X, nextY);
    
//     doc.moveDown(1.2);
//     const statusY = doc.y;
//     renderField('Status:', auditor.auditor_status, labelX, valueX, statusY);
//     renderField('Grade:', auditor.grade, label2X, value2X, statusY);

//     doc.moveDown(1.2);
//     const countryY = doc.y;
//     doc.font('Helvetica-Bold').text('Country of', labelX, countryY);
//     doc.font('Helvetica-Bold').text('Residence:', labelX, countryY + 12);
//     doc.font('Helvetica').text(auditor.countryName || String(auditor.pcountry_id || 'N/A'), valueX, countryY + 12);
    
//     doc.font('Helvetica-Bold').text('Standard\'s:', label2X, countryY);
//     doc.font('Helvetica').text(auditor.auditorStandardNames || auditor.auditor_standards || 'N/A', value2X, countryY, { width: 150 });
    
//     doc.moveDown(2.5);
//   }

//   private drawEducationTableHeader(doc: PDFKit.PDFDocument) {
//     const tableTop = doc.y;
//     doc.fontSize(7).font('Helvetica-Bold');
    
//     const cols = [
//       { text: 'Educational Qualification (Degree / Diploma)', x: 50, w: 90 },
//       { text: 'Qualification Field (Major)', x: 140, w: 80 },
//       { text: 'Technical Area/ IAF Code', x: 220, w: 60 },
//       { text: 'Duration of Education', x: 280, w: 60 },
//       { text: 'Date of Start', x: 340, w: 60 },
//       { text: 'Date of Completion', x: 400, w: 60 },
//       { text: 'Name of the University / Institution', x: 460, w: 90 }
//     ];

//     // Calculate max header height
//     let maxH = 20;
//     cols.forEach(c => {
//       const h = doc.heightOfString(c.text, { width: c.w - 10 });
//       if (h > maxH) maxH = h;
//     });
//     maxH += 10;

//     // Draw header cells with blue background and black borders
//     cols.forEach(c => {
//       doc.save();
//       doc.fillColor(this.LIGHT_BLUE).rect(c.x, tableTop, c.w, maxH).fill();
//       doc.strokeColor(this.GRID_COLOR).lineWidth(0.5).rect(c.x, tableTop, c.w, maxH).stroke();
//       doc.fillColor(this.PRIMARY_COLOR).text(c.text, c.x + 5, tableTop + 5, { width: c.w - 10, align: 'center' });
//       doc.restore();
//     });

//     doc.y = tableTop + maxH;
//     doc.font('Helvetica').fontSize(7);
//   }

//   private generateEducationalQualifications(doc: PDFKit.PDFDocument, qualifications: any[]) {
//     if (!qualifications || qualifications.length === 0) return;

//     // Check if there's space for Section Header + Table Header + at least one row
//     this.checkPageBreak(doc, 150);
//     this.drawSectionHeader(doc, 'A.2 EDUCATIONAL QUALIFICATION');
    
//     this.drawEducationTableHeader(doc);

//     qualifications.forEach((edu) => {
//       // For each row, check if we need a new page and re-draw the table header if so
//       if (this.checkPageBreak(doc, 40)) {
//         this.drawEducationTableHeader(doc);
//       }
      
//       let duration = edu.durationOfEducation || '';
//       if (!duration && edu.dateOfStart && edu.dateOfCompletion) {
//         const d1 = new Date(edu.dateOfStart);
//         const d2 = new Date(edu.dateOfCompletion);
//         if (!isNaN(d1.getTime()) && !isNaN(d2.getTime())) {
//           const diffTime = Math.abs(d2.getTime() - d1.getTime());
//           const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//           const years = Math.floor(diffDays / 365);
//           const months = Math.floor((diffDays % 365) / 30);
//           if (years > 0) duration = `${years} Year${years > 1 ? 's' : ''}${months > 0 ? ` ${months} Mo.` : ''}`;
//           else if (months > 0) duration = `${months} Month${months > 1 ? 's' : ''}`;
//         }
//       }

//       const currentY = doc.y;
//       const cols = [
//         { text: edu.educationalQualification || '', x: 50, w: 90 },
//         { text: edu.qualificationField || '', x: 140, w: 80 },
//         { text: edu.technical_codes_string || edu.eduQuIafCode || edu.educationArea || '', x: 220, w: 60 },
//         { text: duration, x: 280, w: 60 },
//         { text: edu.dateOfStart || '', x: 340, w: 60 },
//         { text: edu.dateOfCompletion || '', x: 400, w: 60 },
//         { text: edu.nameOfTheUniversity || '', x: 460, w: 90 }
//       ];

//       // Calculate row height
//       let maxH = 15;
//       cols.forEach(c => {
//         const h = doc.heightOfString(c.text, { width: c.w - 10 });
//         if (h > maxH) maxH = h;
//       });
//       maxH += 10;

//       // Draw row cells
//       cols.forEach(c => {
//         doc.save();
//         doc.strokeColor(this.GRID_COLOR).lineWidth(0.5).rect(c.x, currentY, c.w, maxH).stroke();
//         doc.fillColor(this.TEXT_COLOR).text(c.text, c.x + 5, currentY + 5, { width: c.w - 10 });
//         doc.restore();
//       });
      
//       doc.y = currentY + maxH;
//     });

//     doc.moveDown(0.5);
//     this.checkPageBreak(doc, 20);
//     doc.font('Helvetica').fontSize(8).fillColor('black')
//       .text('Note: Evidence required Educational Qualification in relevant field (at least 12 years of formal education)', 50, doc.y);
//     doc.moveDown(1.5);
//   }

//   private drawWorkExperienceTableHeader(doc: PDFKit.PDFDocument) {
//     const tableTop = doc.y;
//     doc.fontSize(7).font('Helvetica-Bold');
    
//     const cols = [
//       { text: 'Name of the organization', x: 50, w: 95 },
//       { text: 'Duration (from / to)', x: 145, w: 85 },
//       { text: 'Position / function', x: 230, w: 75 },
//       { text: 'Technical Area / IAF Code', x: 305, w: 75 },
//       { text: 'Process(es) of the organization', x: 380, w: 85 },
//       { text: 'Specific Role in Management System', x: 465, w: 85 }
//     ];

//     // Calculate max header height
//     let maxH = 20;
//     cols.forEach(c => {
//       const h = doc.heightOfString(c.text, { width: c.w - 10 });
//       if (h > maxH) maxH = h;
//     });
//     maxH += 10;

//     // Draw header cells with blue background and black borders
//     cols.forEach(c => {
//       doc.save();
//       doc.fillColor(this.LIGHT_BLUE).rect(c.x, tableTop, c.w, maxH).fill();
//       doc.strokeColor(this.GRID_COLOR).lineWidth(0.5).rect(c.x, tableTop, c.w, maxH).stroke();
//       doc.fillColor(this.PRIMARY_COLOR).text(c.text, c.x + 5, tableTop + 5, { width: c.w - 10, align: 'center' });
//       doc.restore();
//     });

//     doc.y = tableTop + maxH;
//     doc.font('Helvetica').fontSize(7);
//   }

//   private generateWorkExperience(doc: PDFKit.PDFDocument, experiences: any[]) {
//     if (!experiences || experiences.length === 0) return;

//     // Check if there's space for Section Header + Table Header + at least one row
//     this.checkPageBreak(doc, 150);
//     this.drawSectionHeader(doc, 'A.3 WORK EXPERIENCE');
//     this.drawWorkExperienceTableHeader(doc);

//     experiences.forEach((work) => {
//       if (this.checkPageBreak(doc, 40)) {
//         this.drawWorkExperienceTableHeader(doc);
//       }
//       const currentY = doc.y;
//       const durationFromTo = `${work.durationForm || ''} to ${work.durationTo || ''}`;
      
//       const cols = [
//         { text: work.nameOfTheOrganization || '', x: 50, w: 95 },
//         { text: durationFromTo, x: 145, w: 85 },
//         { text: work.position || '', x: 230, w: 75 },
//         { text: work.technical_codes_string || work.workexpIafCode || work.code || '', x: 305, w: 75 },
//         { text: work.processOfTheOrganization || '', x: 380, w: 85 },
//         { text: work.roleInManagement || '', x: 465, w: 85 }
//       ];

//       // Calculate row height
//       let maxH = 15;
//       cols.forEach(c => {
//         const h = doc.heightOfString(c.text, { width: c.w - 10 });
//         if (h > maxH) maxH = h;
//       });
//       maxH += 10;

//       // Draw row cells
//       cols.forEach(c => {
//         doc.save();
//         doc.strokeColor(this.GRID_COLOR).lineWidth(0.5).rect(c.x, currentY, c.w, maxH).stroke();
//         doc.fillColor(this.TEXT_COLOR).text(c.text, c.x + 5, currentY + 5, { width: c.w - 10 });
//         doc.restore();
//       });
      
//       doc.y = currentY + maxH;
//     });

//     doc.moveDown(0.5);
//     this.checkPageBreak(doc, 20);
//     doc.font('Helvetica').fontSize(8).fillColor('black')
//       .text('Note: Evidence required(Minimum 02 years for Auditor / Lead Auditor Grade and 04 years for Technical Experts)', 50, doc.y);
//     doc.moveDown(1.5);
//   }

//   private drawLeadAuditorTableHeader(doc: PDFKit.PDFDocument) {
//     const tableTop = doc.y;
//     doc.fontSize(7).font('Helvetica-Bold');
    
//     const cols = [
//       { text: 'Training Standard', x: 50, w: 100 },
//       { text: 'Training Period / Cert. Date', x: 150, w: 125 },
//       { text: 'Training Provider Org.', x: 275, w: 135 },
//       { text: 'Certificate No.', x: 410, w: 140 }
//     ];

//     let maxH = 20;
//     cols.forEach(c => {
//       const h = doc.heightOfString(c.text, { width: c.w - 10 });
//       if (h > maxH) maxH = h;
//     });
//     maxH += 10;

//     // Draw header cells with blue background and black borders
//     cols.forEach(c => {
//       doc.save();
//       doc.fillColor(this.LIGHT_BLUE).rect(c.x, tableTop, c.w, maxH).fill();
//       doc.strokeColor(this.GRID_COLOR).lineWidth(0.5).rect(c.x, tableTop, c.w, maxH).stroke();
//       doc.fillColor(this.PRIMARY_COLOR).text(c.text, c.x + 5, tableTop + 5, { width: c.w - 10, align: 'center' });
//       doc.restore();
//     });

//     doc.y = tableTop + maxH;
//     doc.font('Helvetica').fontSize(7);
//   }

//   private generateLeadAuditorTraining(doc: PDFKit.PDFDocument, trainings: any[]) {
//     if (!trainings || trainings.length === 0) return;

//     // Check if there's space for Section Header + Table Header + at least one row
//     this.checkPageBreak(doc, 150);
//     this.drawSectionHeader(doc, 'A.4 LEAD AUDITOR TRAINING');
//     this.drawLeadAuditorTableHeader(doc);

//     trainings.forEach((training) => {
//       if (this.checkPageBreak(doc, 40)) {
//         this.drawLeadAuditorTableHeader(doc);
//       }
//       const currentY = doc.y;
      
//       const cols = [
//         { text: training.standardName || training.trainingStandard || '', x: 50, w: 100 },
//         { text: `${training.trainingPeriod || ''} / ${training.certificateDate || ''}`, x: 150, w: 125 },
//         { text: training.trainingProvider || '', x: 275, w: 135 },
//         { text: training.certificateNo || '', x: 410, w: 140 }
//       ];

//       let maxH = 15;
//       cols.forEach(c => {
//         const h = doc.heightOfString(c.text, { width: c.w - 10 });
//         if (h > maxH) maxH = h;
//       });
//       maxH += 10;

//       cols.forEach(c => {
//         doc.save();
//         doc.strokeColor(this.GRID_COLOR).lineWidth(0.5).rect(c.x, currentY, c.w, maxH).stroke();
//         doc.fillColor(this.TEXT_COLOR).text(c.text, c.x + 5, currentY + 5, { width: c.w - 10 });
//         doc.restore();
//       });
      
//       doc.y = currentY + maxH;
//     });

//     doc.moveDown(0.5);
//     this.checkPageBreak(doc, 20);
//     doc.font('Helvetica').fontSize(8).fillColor('black')
//       .text('* Training certificate required from institutions like IRCA/Exemplar Global/NBQP etc.', 50, doc.y);
//     doc.moveDown(1.5);
//   }

//   private drawAuditExperienceTableHeader(doc: PDFKit.PDFDocument) {
//     const tableTop = doc.y;
//     doc.fontSize(7).font('Helvetica-Bold');

//     const cols = [
//       { text: 'Standard', x: 50, w: 52 },
//       { text: 'Auditee/CB', x: 102, w: 85 },
//       { text: 'Audit Dates', x: 187, w: 77 },
//       { text: 'Days', x: 264, w: 33 },
//       { text: 'Audit Type', x: 297, w: 60 },
//       { text: 'Audit Role', x: 357, w: 57 },
//       { text: 'Tech/IAF', x: 414, w: 65 },
//       { text: 'Process(es)', x: 479, w: 71 }
//     ];

//     let maxH = 20;
//     cols.forEach(c => {
//       const h = doc.heightOfString(c.text, { width: c.w - 10 });
//       if (h > maxH) maxH = h;
//     });
//     maxH += 10;

//     // Draw header cells with blue background and black borders
//     cols.forEach(c => {
//       doc.save();
//       doc.fillColor(this.LIGHT_BLUE).rect(c.x, tableTop, c.w, maxH).fill();
//       doc.strokeColor(this.GRID_COLOR).lineWidth(0.5).rect(c.x, tableTop, c.w, maxH).stroke();
//       doc.fillColor(this.PRIMARY_COLOR).text(c.text, c.x + 5, tableTop + 5, { width: c.w - 10, align: 'center' });
//       doc.restore();
//     });

//     doc.y = tableTop + maxH;
//     doc.font('Helvetica').fontSize(7);
//   }

//   private generateAuditExperience(doc: PDFKit.PDFDocument, experiences: any[], qualifiedPosition: string) {
//     if (!experiences || experiences.length === 0) return;

//     // Check if there's space for Section Header + Table Header + at least one row
//     this.checkPageBreak(doc, 150);
//     this.drawSectionHeader(doc, 'A.5 AUDIT EXPERIENCE');
//     this.drawAuditExperienceTableHeader(doc);

//     experiences.forEach((audit) => {
//       const fromDate = audit.auditDatesFormFormatted || audit.auditDatesForm || '';
//       const toDate = audit.auditDatesToFormatted || audit.auditDatesTo || '';
//       const auditDates = fromDate ? `${fromDate} to ${toDate}` : (audit.auditDates || '');

//       const cols = [
//         { text: audit.standardName || audit.auditExpStandatd || '', x: 50, w: 52 },
//         { text: audit.nameOfTheAuditee || '', x: 102, w: 85 },
//         { text: auditDates, x: 187, w: 77 },
//         { text: String(audit.manDays ?? ''), x: 264, w: 33 },
//         { text: audit.auditType || '', x: 297, w: 60 },
//         { text: audit.auditRole || '', x: 357, w: 57 },
//         { text: audit.techArea || '', x: 414, w: 65 },
//         { text: audit.processOfAuditee || '', x: 479, w: 71 }
//       ];

//       let maxH = 15;
//       cols.forEach(c => {
//         const h = doc.heightOfString(c.text, { width: c.w - 10 });
//         if (h > maxH) maxH = h;
//       });
//       maxH += 10;

//       if (this.checkPageBreak(doc, maxH + 5)) {
//         this.drawAuditExperienceTableHeader(doc);
//       }
//       const currentY = doc.y;

//       // Draw row cells
//       cols.forEach(c => {
//         doc.save();
//         doc.strokeColor(this.GRID_COLOR).lineWidth(0.5).rect(c.x, currentY, c.w, maxH).stroke();
//         doc.fillColor(this.TEXT_COLOR).text(c.text, c.x + 5, currentY + 5, { width: c.w - 10 });
//         doc.restore();
//       });
      
//       doc.y = currentY + maxH;
//     });

//     doc.moveDown(1);
//     this.checkPageBreak(doc, 20);
//     const lastY = doc.y;
//     doc.font('Helvetica-Bold').fontSize(9).text('Qualified Position :', 60, lastY);
//     doc.font('Helvetica').fontSize(9).text(qualifiedPosition || 'N/A', 160, lastY);
//     doc.moveDown(1.5);
//   }

//   private generateGradeEvaluation(doc: PDFKit.PDFDocument, grades: any) {
//     if (!grades) return;
//     this.checkPageBreak(doc, 140);
//     this.drawSectionHeader(doc, 'B.1 GRADE EVALUATION');

//     doc.fillColor(this.TEXT_COLOR);

//     const renderRow = (label: string, value: string) => {
//       const labelWidth = 390;
//       const valueWidth = 60;
//       doc.font('Helvetica-Bold').fontSize(10);
//       const labelHeight = doc.heightOfString(label, { width: labelWidth });
//       const rowH = labelHeight + 12;

//       if (doc.y + rowH > 735) {
//         doc.addPage();
//         doc.y = 100;
//       }
//       const startY = doc.y;

//       doc.save();
//       doc.strokeColor(this.GRID_COLOR).lineWidth(0.5).rect(50, startY, 410, rowH).stroke();
//       doc.rect(460, startY, 90, rowH).stroke();
//       doc.restore();

//       doc.text(label, 60, startY + 6, { width: labelWidth, align: 'left' });
//       doc.font('Helvetica').text(value, 470, startY + 6, { width: valueWidth, align: 'center' });
//       doc.y = startY + rowH;
//     };

//     renderRow(
//       'Does the education qualification meet the criteria of “Educational Qualification in relevant field (at least 12 years of formal education)”? If no, specify the insufficient details:',
//       grades.evaluationCriteriaQualification ? 'Yes' : 'No',
//     );
//     renderRow(
//       'Does the period of work experience meet the criteria of “At least 2 Years of relevant experience” for Auditor / lead Auditor OR At least 4 years of experience in relevant field for Technical Experts, whichever applicable? If no, specify the insufficient details:',
//       grades.evaluationCriteriaExperience ? 'Yes' : 'No',
//     );
//     renderRow(
//       'Does the Lead auditor training is from training organization- like IRCA/Exemplar Global /NBQP or equivalent? (Note: Not required for technical experts) If no, specify the insufficient details:',
//       grades.evaluationCriteriaTraining ? 'Yes' : 'No',
//     );
//     renderRow(
//       'Does the audit experience meet the criteria of “Four complete audits for a total of at least: 15 days of audit experience for Auditor” or 20 days of audit experience including minimum 1 initial audit (stage1 & stage2) as Lead Auditor / Team Leader for Lead Auditor or 30 days of audit experience including minimum 3 initial audits (stage1 & stage2) as Lead Auditor / Team Leader for Lead Auditor”, whichever applicable? (Note: Not required for technical experts) If no, specify the insufficient details:',
//       grades.evaluationCriteriaInsufficient ? 'Yes' : 'No',
//     );
//     doc.moveDown(1.5);
//   }

//   private generateInterviewResult(doc: PDFKit.PDFDocument, interview: any) {
//     if (!interview) return;
//     this.checkPageBreak(doc, 140);
//     this.drawSectionHeader(doc, 'B.3.6 INTERVIEW RESULT');

//     doc.fontSize(10).fillColor('black');

//     const LABEL_X = 60;
//     const VALUE_X = 200;
//     const LABEL_W = 130;
//     const VALUE_W = 340;
//     const ROW_GAP = 8;

//     const renderRow = (label: string, value: string) => {
//       const valueStr = String(value ?? 'N/A') || 'N/A';
//       const labelH = doc.heightOfString(label, { width: LABEL_W });
//       const valueH = doc.heightOfString(valueStr, { width: VALUE_W });
//       const rowH = Math.max(labelH, valueH) + ROW_GAP;
//       if (doc.y + rowH > 735) { doc.addPage(); doc.y = 100; }
//       const startY = doc.y;

//       // Draw blue background and black borders
//       doc.save();
//       doc.fillColor(this.LIGHT_BLUE).rect(50, startY, 500, rowH).fill();
//       doc.strokeColor(this.GRID_COLOR).lineWidth(0.5).rect(50, startY, 500, rowH).stroke();
//       doc.restore();

//       doc.font('Helvetica-Bold').fontSize(10)
//         .text(label, LABEL_X, startY + 4, { width: LABEL_W });

//       doc.font('Helvetica').fontSize(10)
//         .text(valueStr, VALUE_X, startY + 4, { width: VALUE_W });

//       doc.y = startY + rowH;
//     };

//     renderRow('Interviewer Name:', interview.interviewerName);
//     renderRow('Grade of Audit:', interview.auditorGrade);
//     renderRow('Audit Dates:', interview.auditDates);
//     renderRow('Conclusion / Result:', String(interview.resultConclution ?? 'N/A'));
//     renderRow('Comment:', interview.comment);

//     doc.moveDown(1.5);
//   }

//   private generateGradeEvaluationResults(
//     doc: PDFKit.PDFDocument,
//     codeAllocations: any[],
//     initialAllocation: Record<string, any>,
//   ) {
//     const hasInitial = initialAllocation && Object.keys(initialAllocation).length > 0;
//     const hasAllocations = codeAllocations && codeAllocations.length > 0;
//     if (!hasInitial && !hasAllocations) return;

//     // Use a larger look-ahead to keep the intro text + table header together
//     this.checkPageBreak(doc, 180);
//     this.drawSectionHeader(doc, 'B.2 GRADE EVALUATION RESULTS');

//     doc.fontSize(9).fillColor('black').font('Helvetica')
//       .text(
//         'Applicant found competent and provisionally registered for following schemes with INTERCERT. (Note: The grade evaluation\'s confirmation under above clause shall be "YES" for Auditor / Lead Auditor / Principal Auditor provisional registration for applicable standards)',
//         60, doc.y, { width: 490 },
//       );
//     doc.moveDown(1);

//     const tableTop = doc.y;
//     const cols = [
//       { text: 'Standards', x: 50, w: 260 },
//       { text: 'Qualification Grade (Auditor / Lead Auditor / Principal Auditor / Technical Expert)', x: 310, w: 240 }
//     ];

//     let maxH = 20;
//     cols.forEach(c => {
//       const h = doc.heightOfString(c.text, { width: c.w - 10 });
//       if (h > maxH) maxH = h;
//     });
//     maxH += 10;

//     // Draw header cells with blue background and black borders
//     cols.forEach(c => {
//       doc.save();
//       doc.fillColor(this.LIGHT_BLUE).rect(c.x, tableTop, c.w, maxH).fill();
//       doc.strokeColor(this.GRID_COLOR).lineWidth(0.5).rect(c.x, tableTop, c.w, maxH).stroke();
//       doc.fillColor(this.PRIMARY_COLOR).text(c.text, c.x + 5, tableTop + 5, { width: c.w - 10, align: 'center' });
//       doc.restore();
//     });

//     doc.y = tableTop + maxH;
//     doc.font('Helvetica').fillColor('black').fontSize(9);

//     const renderDataRow = (std: string, grade: string) => {
//       const stdH = doc.heightOfString(std || 'N/A', { width: 250 });
//       const gradeH = doc.heightOfString(grade || 'N/A', { width: 230 });
//       const rowH = Math.max(stdH, gradeH) + 10;
//       if (doc.y + rowH > 735) { doc.addPage(); doc.y = 100; }
//       const rowY = doc.y;

//       doc.save();
//       doc.strokeColor(this.GRID_COLOR).lineWidth(0.5).rect(50, rowY, 260, rowH).stroke();
//       doc.rect(310, rowY, 240, rowH).stroke();
//       doc.restore();

//       doc.fillColor(this.TEXT_COLOR).text(std || 'N/A', 55, rowY + 5, { width: 250 });
//       doc.text(grade || 'N/A', 315, rowY + 5, { width: 230 });
//       doc.y = rowY + rowH;
//     };

//     if (hasInitial) {
//       for (const [, alloc] of Object.entries(initialAllocation)) {
//         renderDataRow(alloc.title, alloc.qualified_grade);
//       }
//     } else {
//       codeAllocations.forEach((alloc: any) => {
//         renderDataRow(alloc.standardName, alloc.evaluationGrade);
//       });
//     }

//     doc.moveDown(1.5);
//   }

//   private drawCheckbox(doc: PDFKit.PDFDocument, x: number, y: number, checked: boolean, label: string, width = 215) {
//     doc.save();
//     doc.rect(x, y, 10, 10).strokeColor('#000000').lineWidth(0.5).stroke();
//     if (checked) {
//       doc.lineWidth(1.5).strokeColor(this.PRIMARY_COLOR)
//         .moveTo(x + 2, y + 5).lineTo(x + 4, y + 8).lineTo(x + 8, y + 2).stroke();
//     }
//     doc.restore();
//     doc.fontSize(8).fillColor('black').font('Helvetica').text(label, x + 15, y + 1, { width });
//   }

//   private generateStandardAllocationEvaluation(
//     doc: PDFKit.PDFDocument,
//     applicableStandards: Record<string, any>,
//   ) {
//     if (!applicableStandards || Object.keys(applicableStandards).length === 0) return;

//     this.checkPageBreak(doc, 150);
//     this.drawSectionHeader(doc, 'B.3 STANDARD / TECHNICAL AREA / IAF CODE ALLOCATION EVALUATION');

//     for (const [stdId, clusters] of Object.entries(applicableStandards)) {
//       const scheme = STANDARD_SCHEME_LABEL[stdId];
//       const subsectionTitle = scheme
//         ? `${scheme.subsection} ${scheme.label}`
//         : `B.3.x Applicable for Scheme (Standard ${stdId})`;

//       // Add a gap before subsection if not the very first thing after main header
//       // AND check if we have space for Subsection Header + Table Header + 1st row
//       this.checkPageBreak(doc, 150);
//       doc.moveDown(1);
//       this.drawSectionHeader(doc, subsectionTitle);

//       const label = scheme?.label || '';
//       const staticKey = Object.keys(STATIC_EVALUATION_CRITERIA).find((key) =>
//         label.toUpperCase().includes(key.toUpperCase()),
//       );
//       const staticCriteria = staticKey ? STATIC_EVALUATION_CRITERIA[staticKey] : null;

//       const B3_COLS = [
//         { text: 'Standard', x: 50, w: 95 },
//         { text: 'Technical Cluster', x: 145, w: 90 },
//         { text: 'IAF Code(s)', x: 235, w: 55 },
//         { text: 'Basis of Evaluation and Allocation', x: 290, w: 260 }
//       ];
//       const B3_HDR_H = 25;

//       const drawB3ColHeaders = () => {
//         const y = doc.y;
//         doc.save();
//         B3_COLS.forEach(c => {
//           doc.fillColor(this.LIGHT_BLUE).rect(c.x, y, c.w, B3_HDR_H).fill();
//           doc.strokeColor(this.GRID_COLOR).lineWidth(0.5).rect(c.x, y, c.w, B3_HDR_H).stroke();
//           doc.fillColor(this.PRIMARY_COLOR).font('Helvetica-Bold').fontSize(8)
//             .text(c.text, c.x + 5, y + 8, { width: c.w - 10, align: 'center' });
//         });
//         doc.restore();
//         doc.y = y + B3_HDR_H;
//       };

//       drawB3ColHeaders();
//       doc.font('Helvetica').fillColor(this.TEXT_COLOR).fontSize(8);

//       const buildBasisText = (codeData: any): string => {
//         if (stdId === '1104' && clusters.enms_data) {
//           const enms = clusters.enms_data;
//           const yearsW = Math.floor(enms.work / 365);
//           const monthsW = Math.floor((enms.work % 365) / 30);
//           const yearsE = Math.floor(enms.edu / 365);
//           let t = `${yearsW} Years, ${monthsW} months Work Exp. in TC\n`;
//           if (enms.edu > 0) t += `${yearsE} Years Education\n`;
//           if (enms.audit > 0) t += `${enms.audit} Days Audit Experience`;
//           return t;
//         }
//         const parts: string[] = [];
//         const workYears = Number(codeData?.work_duration) || 0;
//         const eduYears = Number(codeData?.edu_duration) || 0;
//         const auditDays = Number(codeData?.audit_duration) || 0;
//         if (workYears > 0) parts.push(`${workYears} Year${workYears > 1 ? 's' : ''} Work Exp. in TC`);
//         if (eduYears > 0) parts.push(`${eduYears} Year${eduYears > 1 ? 's' : ''} Education Qualification in TC`);
//         if (auditDays > 0) parts.push(`${auditDays} Days Audit Experience`);
//         return parts.join('\n');
//       };

//       // Draw a single data row, handling page breaks (repeats column headers + shows std/cluster again)
//       const drawB3Row = (
//         stdName: string, showStd: boolean,
//         clusterName: string, showCluster: boolean,
//         iafCode: string, basisText: string,
//       ) => {
//         const rowH = Math.max(20, doc.heightOfString(basisText || ' ', { width: B3_COLS[3].w - 10 }) + 10);
//         if (doc.y + rowH > 735) {
//           doc.addPage();
//           doc.y = 100;
//           drawB3ColHeaders();
//           doc.font('Helvetica').fillColor(this.TEXT_COLOR).fontSize(8);
//           // After page break, always show std and cluster names again
//           showStd = true;
//           showCluster = true;
//         }
//         const rowY = doc.y;
//         const cells = [
//           { text: showStd ? stdName : '', col: B3_COLS[0] },
//           { text: showCluster ? clusterName : '', col: B3_COLS[1] },
//           { text: iafCode, col: B3_COLS[2] },
//           { text: basisText || ' ', col: B3_COLS[3] },
//         ];
//         cells.forEach(({ text, col }) => {
//           doc.save();
//           doc.strokeColor(this.GRID_COLOR).lineWidth(0.5).rect(col.x, rowY, col.w, rowH).stroke();
//           doc.fillColor(this.TEXT_COLOR).text(text, col.x + 5, rowY + 5, { width: col.w - 10 });
//           doc.restore();
//         });
//         doc.y = rowY + rowH;
//       };

//       // Handle Special Rendering for ISMS (1105)
//       if (stdId === '1105' && clusters.isms_data) {
//         const isms = clusters.isms_data;
//         this.checkPageBreak(doc, 100);
//         const rowY = doc.y;
//         const rowCols = [
//           { text: staticKey || label || 'ISMS', x: 50, w: 95 },
//           { text: 'N/A', x: 145, w: 90 },
//           { text: 'N/A', x: 235, w: 55 },
//         ];
//         let currentY = rowY + 5;
//         const checkboxItems = [
//           { checked: isms.totalItWorkDurationIsms >= 4, label: 'Work Experience (minimum 4 years in information technology including 2 years related to information security) AND' },
//           { checked: isms.totalAuditSumIsms >= 10, label: 'Audit Experience (minimum 10 onsite audit days in last 5 years, the audit experience should be as an auditor-in-training monitored by an ISMS evaluator in at least one ISMS initial certification audit (stage 1 and stage 2) or re-certification and at least one surveillance audit.)' },
//           { checked: isms.itQualifiedIsms === 'Yes', label: 'IT Related Qualification.' }
//         ];
//         let totalBasisH = 10;
//         checkboxItems.forEach(item => { totalBasisH += doc.heightOfString(item.label, { width: 235 }) + 10; });
//         const rowH = Math.max(20, totalBasisH);
//         doc.save();
//         doc.strokeColor(this.GRID_COLOR).lineWidth(0.5);
//         rowCols.forEach(c => {
//           doc.rect(c.x, rowY, c.w, rowH).stroke();
//           doc.fillColor(this.TEXT_COLOR).text(c.text, c.x + 5, rowY + 8, { width: c.w - 10 });
//         });
//         doc.rect(290, rowY, 260, rowH).stroke();
//         checkboxItems.forEach(item => {
//           this.drawCheckbox(doc, 295, currentY, item.checked, item.label, 235);
//           currentY += doc.heightOfString(item.label, { width: 235 }) + 10;
//         });
//         doc.restore();
//         doc.y = rowY + rowH;
//         continue;
//       }

//       // Handle Special Rendering for ABMS (ISO 37001:2016 only — stdId 1108)
//       if (stdId === '1108' && clusters.abms_data) {
//         const abms = clusters.abms_data;
//         this.checkPageBreak(doc, 100);
//         const rowY = doc.y;
//         const rowCols = [
//           { text: staticKey || label || 'AbMS', x: 50, w: 95 },
//           { text: 'N/A', x: 145, w: 90 },
//           { text: 'N/A', x: 235, w: 55 },
//         ];
//         let currentY = rowY + 5;
//         const checkboxItems = [
//           { checked: abms.audAuditExpForAbms === 'Yes', label: 'Work Experience (minimum 4 experience, of which at least 2 year in management / Procurement / HR / Law / Legal / Compliance etc which shall also include Anti-bribery or related exposures / experience AND.' },
//           { checked: abms.totalWorkExpAbms === 'Yes', label: 'Audit Experience (minimum 10 audit days in ISO 37001 or 10 audit days in ISO 9001 under technical cluster of "services"' }
//         ];
//         let totalBasisH = 10;
//         checkboxItems.forEach(item => { totalBasisH += doc.heightOfString(item.label, { width: 235 }) + 10; });
//         const rowH = Math.max(20, totalBasisH);
//         doc.save();
//         doc.strokeColor(this.GRID_COLOR).lineWidth(0.5);
//         rowCols.forEach(c => {
//           doc.rect(c.x, rowY, c.w, rowH).stroke();
//           doc.fillColor(this.TEXT_COLOR).text(c.text, c.x + 5, rowY + 8, { width: c.w - 10 });
//         });
//         doc.rect(290, rowY, 260, rowH).stroke();
//         checkboxItems.forEach(item => {
//           this.drawCheckbox(doc, 295, currentY, item.checked, item.label, 235);
//           currentY += doc.heightOfString(item.label, { width: 235 }) + 10;
//         });
//         doc.restore();
//         doc.y = rowY + rowH;
//         continue;
//       }

//       let isFirstCluster = true;
//       for (const [clusterTitle, clusterData] of Object.entries(clusters as Record<string, any>)) {
//         if (clusterTitle === 'isms_data' || clusterTitle === 'abms_data' || clusterTitle === 'enms_data') continue;

//         const techCodes = Object.keys(clusterData.technical_code_data || {});
//         const stdName: string = clusterData.standard_name || '';
//         const clusterDisplay = clusterTitle !== 'N/A' ? clusterTitle : '';

//         if (techCodes.length === 0) {
//           let techCluster = '';
//           let iafCode = '';
//           let basisOfEval = '';
//           if (staticCriteria) {
//             techCluster = staticCriteria.technicalCluster || '';
//             iafCode = staticCriteria.iafCode || '';
//             basisOfEval = staticCriteria.basisOfEvaluation || '';
//           } else if (stdId === '1104' && clusters.enms_data) {
//             const enms = clusters.enms_data;
//             const yearsW = Math.floor(enms.work / 365);
//             const monthsW = Math.floor((enms.work % 365) / 30);
//             const yearsE = Math.floor(enms.edu / 365);
//             techCluster = '';
//             iafCode = '';
//             basisOfEval = `${yearsW} Years, ${monthsW} months Work Exp. in TC\n`;
//             if (enms.edu > 0) basisOfEval += `${yearsE} Years Education\n`;
//             if (enms.audit > 0) basisOfEval += `${enms.audit} Days Audit Experience`;
//           } else {
//             techCluster = clusterDisplay;
//           }
//           drawB3Row(staticKey || stdName, isFirstCluster, techCluster, true, iafCode, basisOfEval);
//           isFirstCluster = false;
//         } else {
//           let isFirstCode = true;
//           techCodes.forEach((code: string) => {
//             const codeData = clusterData.technical_code_data[code];
//             const basisText = buildBasisText(codeData);
//             drawB3Row(stdName, isFirstCluster && isFirstCode, clusterDisplay, isFirstCode, code, basisText);
//             isFirstCode = false;
//             isFirstCluster = false;
//           });
//         }
//       }
//       doc.moveDown(1);
//     }

//     doc.moveDown(0.5);
//   }

//   private generateInitialAllocation(
//     doc: PDFKit.PDFDocument,
//     initialAllocation: Record<string, any>,
//     auditorAuth: any,
//     evalSignBuffer?: Buffer | null,
//     approveSignBuffer?: Buffer | null,
//   ) {
//     const hasInitial = initialAllocation && Object.keys(initialAllocation).length > 0;
//     if (!hasInitial && !auditorAuth) return;

//     const TABLE_LEFT = 50;
//     const TABLE_RIGHT = 550;
//     const TABLE_WIDTH = TABLE_RIGHT - TABLE_LEFT;
//     const FOOTER_LIMIT = 735;
//     const SIGNATURE_BLOCK_H = 110; // height needed for knowledge row + signatures

//     const cols = [
//       { text: 'Standard', x: TABLE_LEFT, w: 100 },
//       { text: 'Grade (Auditor /Lead Auditor /Technical Expert)', x: TABLE_LEFT + 100, w: 190 },
//       { text: 'TechnicalArea\'s / IAF Gode\'s / Food Chain Gategories (As Applicable)', x: TABLE_LEFT + 290, w: 210 },
//     ];

//     const SPAN_H = 18;
//     doc.font('Helvetica').fontSize(9);

//     // Pre-calculate column header height
//     let colHdrMaxH = 20;
//     cols.forEach(c => {
//       const h = doc.heightOfString(c.text, { width: c.w - 10 });
//       if (h > colHdrMaxH) colHdrMaxH = h;
//     });
//     colHdrMaxH += 10;

//     // Pre-calculate all data row heights
//     const allocEntries = hasInitial ? Object.entries(initialAllocation) : [];
//     const rowHeights: number[] = allocEntries.map(([, alloc]) => {
//       const rawCodes = Array.isArray(alloc.technical_code)
//         ? [...new Set(alloc.technical_code)].join(',')
//         : (alloc.technical_code || '');
//       const iafCodesStr = rawCodes.trim() || 'N/A';
//       const rowData = [
//         { text: alloc.title || '', w: cols[0].w },
//         { text: alloc.qualified_grade || '', w: cols[1].w },
//         { text: iafCodesStr, w: cols[2].w },
//       ];
//       let rh = 14;
//       rowData.forEach(d => {
//         const h = doc.heightOfString(d.text, { width: d.w - 10 });
//         if (h > rh) rh = h;
//       });
//       return rh + 6;
//     });

//     const KNOWLEDGE_ROW_H = 20;
//     const totalTableH = SPAN_H + colHdrMaxH + rowHeights.reduce((a, b) => a + b, 0) + KNOWLEDGE_ROW_H;
//     const totalNeeded = totalTableH + SIGNATURE_BLOCK_H + 30;

//     // If entire section fits on current page, ensure enough space; otherwise just ensure section header fits
//     if (totalNeeded <= 600) {
//       this.checkPageBreak(doc, totalNeeded + 20);
//     } else {
//       this.checkPageBreak(doc, 150);
//     }

//     this.drawSectionHeader(doc, 'B.4 INITIAL ALLOCATION\'S');
//     doc.fontSize(9).fillColor('black').font('Helvetica');

//     const drawTableHeader = (startY: number): number => {
//       // Span header
//       doc.fillColor(this.LIGHT_BLUE).rect(TABLE_LEFT, startY, TABLE_WIDTH, SPAN_H).fill();
//       doc.fillColor(this.PRIMARY_COLOR).font('Helvetica-Bold').fontSize(8)
//         .text(
//           'Details of Allocated Standards and technical area\'s or IAF Codes or Categories, as applicable.',
//           TABLE_LEFT + 5, startY + 4, { width: TABLE_WIDTH - 10, align: 'center' },
//         );
//       doc.rect(TABLE_LEFT, startY, TABLE_WIDTH, SPAN_H).stroke();

//       const hdrY = startY + SPAN_H;
//       cols.forEach(c => {
//         doc.save();
//         doc.fillColor(this.LIGHT_BLUE).rect(c.x, hdrY, c.w, colHdrMaxH).fill();
//         doc.strokeColor(this.GRID_COLOR).lineWidth(0.5).rect(c.x, hdrY, c.w, colHdrMaxH).stroke();
//         doc.fillColor(this.PRIMARY_COLOR).font('Helvetica-Bold').fontSize(8)
//           .text(c.text, c.x + 5, hdrY + 5, { width: c.w - 10, align: 'center' });
//         doc.restore();
//       });
//       return hdrY + colHdrMaxH;
//     };

//     let tableBodyTop = drawTableHeader(doc.y);
//     doc.font('Helvetica').fontSize(9);

//     allocEntries.forEach(([, alloc], idx) => {
//       const rowH = rowHeights[idx];
//       const rawCodes = Array.isArray(alloc.technical_code)
//         ? [...new Set(alloc.technical_code)].join(',')
//         : (alloc.technical_code || '');
//       const iafCodesStr = rawCodes.trim() || 'N/A';
//       const rowData = [
//         { text: alloc.title || '', w: cols[0].w },
//         { text: alloc.qualified_grade || '', w: cols[1].w },
//         { text: iafCodesStr, w: cols[2].w },
//       ];

//       // Check if this row + knowledge row + signatures would overflow footer
//       if (tableBodyTop + rowH + KNOWLEDGE_ROW_H + SIGNATURE_BLOCK_H > FOOTER_LIMIT) {
//         doc.addPage();
//         doc.y = 100;
//         tableBodyTop = drawTableHeader(doc.y);
//         doc.font('Helvetica').fontSize(9);
//       }

//       const rowY = tableBodyTop;
//       cols.forEach((c, i) => {
//         doc.save();
//         doc.strokeColor(this.GRID_COLOR).lineWidth(0.5).rect(c.x, rowY, c.w, rowH).stroke();
//         doc.fillColor(this.TEXT_COLOR).text(rowData[i].text, c.x + 5, rowY + 3, { width: c.w - 10 });
//         doc.restore();
//       });
//       tableBodyTop += rowH;
//     });

//     // Knowledge Skill row — ensure it stays with the table and doesn't overflow
//     if (tableBodyTop + KNOWLEDGE_ROW_H + SIGNATURE_BLOCK_H > FOOTER_LIMIT) {
//       doc.addPage();
//       doc.y = 100;
//       tableBodyTop = drawTableHeader(doc.y);
//       doc.font('Helvetica').fontSize(9);
//     }

//     const knowY = tableBodyTop;
//     doc.fillColor(this.LIGHT_BLUE).rect(TABLE_LEFT, knowY, TABLE_WIDTH - 40, KNOWLEDGE_ROW_H).fill();
//     doc.fillColor(this.PRIMARY_COLOR).font('Helvetica-Bold').fontSize(8)
//       .text(
//         'Knowledge Skill Evaluation completed for above allocated Technical Area\'s / Cluster / IAF Godes',
//         cols[0].x + 5, knowY + 4, { width: TABLE_WIDTH - 55 },
//       );
//     doc.fillColor(this.LIGHT_BLUE).rect(TABLE_RIGHT - 40, knowY, 40, KNOWLEDGE_ROW_H).fill();
//     doc.strokeColor(this.GRID_COLOR).lineWidth(0.5).rect(TABLE_LEFT, knowY, TABLE_WIDTH, KNOWLEDGE_ROW_H).stroke();
//     doc.fillColor(this.PRIMARY_COLOR).font('Helvetica-Bold').fontSize(9)
//       .text('Yes', TABLE_RIGHT - 38, knowY + 4, { width: 35, align: 'center' });

//     doc.y = knowY + KNOWLEDGE_ROW_H + 35;
//     doc.font('Helvetica').fillColor('black');

//     // Signatures block — keep together on same page
//     if (doc.y + SIGNATURE_BLOCK_H > FOOTER_LIMIT) {
//       doc.addPage();
//       doc.y = 100;
//     }

//     const sigRowY = doc.y;

//     // Signature labels
//     doc.font('Helvetica-Bold').fontSize(9).text('Signature :', 60, sigRowY);
//     doc.font('Helvetica-Bold').text('Signature :', 350, sigRowY);

//     // Signature Images
//     if (evalSignBuffer) {
//       doc.image(evalSignBuffer, 120, sigRowY - 20, { height: 30 });
//     }
//     if (approveSignBuffer) {
//       doc.image(approveSignBuffer, 410, sigRowY - 20, { height: 30 });
//     }

//     // Role labels and values
//     const roleRowY = sigRowY + 25;
//     doc.font('Helvetica-Bold').fontSize(9).text('Evaluated By:', 60, roleRowY, { width: 100 });
//     doc.font('Helvetica').fillColor('#555').text(auditorAuth?.evaluatedBy || 'Certification Manager', 125, roleRowY, { width: 150 });

//     doc.fillColor('black').font('Helvetica-Bold').text('Approved By:', 350, roleRowY, { width: 90 });
//     doc.font('Helvetica').fillColor('#555').text(auditorAuth?.approvedBy || 'Head Certification', 415, roleRowY, { width: 130 });

//     // Evaluation Date row
//     const dateRowY = roleRowY + 18;
//     doc.fillColor('black').font('Helvetica-Bold').text('Evaluation Date:', 60, dateRowY, { width: 105 });
//     doc.font('Helvetica').fillColor('#555').text(auditorAuth?.evaluationDate || 'N/A', 135, dateRowY, { width: 150 });

//     // Section label
//     const secLabelY = dateRowY + 25;
//     doc.fillColor('black').font('Helvetica-Bold').fontSize(10)
//       .text('Auditor Registration - Initial', 60, secLabelY);

//     doc.y = secLabelY + 20;
//     doc.moveDown(1.5);
//   }
// }
