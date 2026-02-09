import { Injectable, Logger } from '@nestjs/common';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PdfTemplateService {
  private readonly logger = new Logger(PdfTemplateService.name);

  // Define table cell coordinates based on PDF template analysis
  private readonly TABLE_CELLS = {
    // Personnel table coordinates (first page - table section)
    personnel: {
      // Row 1 (main row for auditor information in the table)
      row1: {
        name: { x: 200, y: 0 }, // X position for second column (Name of Certification Personnel)
        designation: { x: 400, y: 0 } // X position for third column (Designation / Area of Working) - adjusted
      },
      // Row 2 (backup row)
      row2: {
        name: { x: 200, y: 0 },  
        designation: { x: 400, y: 0 } // X position for third column - adjusted
      }
    }
  };

  async fillPdfTemplate(
    auditorName: string,
    designation: string,
    generationDate?: string,
    interviewerName?: string
  ): Promise<Buffer> {
    const formattedDate = generationDate || new Date().toLocaleDateString('en-GB', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit' 
    }).replace(/\//g, '-');
    try {
      // Load the existing PDF template
      const templatePath = path.join(__dirname, '..', '..', '..', 'libs', 'templates', 'Contract Agreement.pdf');
      const existingPdfBytes = fs.readFileSync(templatePath);

      // Load the PDF document
      const pdfDoc = await PDFDocument.load(new Uint8Array(existingPdfBytes));

      // Get the first page (personnel table is on first page)
      const firstPage = pdfDoc.getPages()[0];
      const { height } = firstPage.getSize();
      
      // Get the second page (signature section is on second page)
      const secondPage = pdfDoc.getPages()[1];

      // Embed the Helvetica font
      const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const helveticaBoldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

      // Calculate dynamic Y positions based on page height
      this.calculateDynamicPositions(height);

      // Fill personnel table with dynamic positioning
      this.fillPersonnelTableDynamically(firstPage, auditorName, designation, helveticaFont, helveticaBoldFont);

      // Fill signature section on second page
      this.fillSignatureSection(secondPage, auditorName, generationDate, helveticaFont, helveticaBoldFont, interviewerName);

      // Save the modified PDF
      const pdfBytes = await pdfDoc.save();
      
      return Buffer.from(pdfBytes);
    } catch (error) {
      this.logger.error('Error filling PDF template:', error);
      throw error;
    }
  }

  private calculateDynamicPositions(pageHeight: number): void {
    // Calculate Y positions dynamically based on page height
    // These values are calibrated for standard A4 page height (841.89 points)
    // Position for the top table where "Name of Certification Personnel" and "Designation / Area of Working" are located
    const baseY = pageHeight - 158; // Adjusted for 1-2px top margin to center in cell
    
    // Update row positions for the top table
    this.TABLE_CELLS.personnel.row1.name.y = baseY; // Row 1: Name of Certification Personnel
    this.TABLE_CELLS.personnel.row1.designation.y = baseY; 
    
    this.TABLE_CELLS.personnel.row2.name.y = baseY - 22; // Row 2: Designation / Area of Working
    this.TABLE_CELLS.personnel.row2.designation.y = baseY - 22;
  }

  private fillPersonnelTableDynamically(page: any, name: string, designation: string, font: any, boldFont?: any): void {
    // Draw the name in the first row (uppercase as per requirement) - BOLD
    page.drawText(name.toUpperCase(), {
      x: 315, // Slightly right to center horizontally
      y: this.TABLE_CELLS.personnel.row1.name.y,
      size: 12,
      font: boldFont || font,
      color: rgb(0, 0, 0),
    });

    // Draw the designation in the second row - BOLD and moved 1px down
    page.drawText(designation, {
      x: 315, // Slightly right to center horizontally
      y: this.TABLE_CELLS.personnel.row2.designation.y - 2,
      size: 11,
      font: boldFont || font,
      color: rgb(0, 0, 0),
    });

    this.logger.log(`Placed "${name}" and "${designation}" in personnel table`);
  }

  private findEmptyRow(page: any): any {
    return this.TABLE_CELLS.personnel.row1;
  }

  private fillSignatureSection(page: any, auditorName: string, generationDate: string, font: any, boldFont: any, interviewerName?: string): void {
    const { width, height } = page.getSize();
    
    // Position for names in signature section (ABOVE the lines)
    const interviewerNameX = 70;
    const auditorNameX = 320;
    const nameY = 182; // Moved slightly higher to be clearly above the signature lines
    
    // Position for date in signature section (on same line as "Date:" label)
    const leftDateX = 70; // Position closer to "Date:" label
    const rightDateX = 355; // Adjusted to be closer to "Date:" label
    const dateY = 140; // Aligned with the "Date:" label text baseline

    // Draw the interviewer name (left side, above line) - BOLD
    page.drawText(interviewerName, {
      x: interviewerNameX,
      y: nameY,
      size: 11,
      font: boldFont,
      color: rgb(0, 0, 0),
    });

    // Draw the auditor name (right side, above line) - BOLD
    page.drawText(auditorName.toUpperCase(), {
      x: auditorNameX,
      y: nameY,
      size: 11,
      font: boldFont,
      color: rgb(0, 0, 0),
    });

    // Draw the date on same line as "Date:" label (Left side only) - BOLD
    page.drawText(generationDate, {
      x: leftDateX,
      y: dateY,
      size: 10,
      font: boldFont,
      color: rgb(0, 0, 0),
    });
  }


  /**
   * Advanced method to detect table cells in the PDF template
   * This would analyze the PDF structure to find empty cells dynamically
   */
  private async detectTableCells(page: any): Promise<any> {
    // This is a placeholder for advanced cell detection
    // In a real implementation, you would:
    // 1. Analyze the PDF content for table structures
    // 2. Identify empty cells by checking for text content
    // 3. Return coordinates of empty cells
    
    // For now, return predefined coordinates
    return {
      emptyCells: [
        { row: 2, col: 2, x: 180, y: 0, type: 'name' },
        { row: 2, col: 3, x: 350, y: 0, type: 'designation' }
      ]
    };
  }

  /**
   * Save modified PDF to file
   */
  saveToFile(buffer: Buffer, filename: string): string {
    try {
      const uploadsDir = './uploads/certificates';
      
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }
      
      const filePath = `${uploadsDir}/${filename}`;
      fs.writeFileSync(filePath, buffer as any);
      
      return `/uploads/certificates/${filename}`;
    } catch (error) {
      this.logger.error('Error saving modified PDF:', error);
      throw new Error(`Failed to save modified PDF: ${error.message}`);
    }
  }
}
