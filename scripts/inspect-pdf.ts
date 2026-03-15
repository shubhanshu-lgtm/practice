import * as fs from 'fs';
import * as path from 'path';
import { PDFDocument } from 'pdf-lib';

async function inspectPdf(pdfPath: string) {
  const pdfBytes = fs.readFileSync(pdfPath);
  const pdfDoc = await PDFDocument.load(new Uint8Array(pdfBytes));

  console.log(`PDF: ${path.basename(pdfPath)}`);
  console.log(`Pages: ${pdfDoc.getPageCount()}`);

  const form = pdfDoc.getForm();
  const fields = form.getFields();
  console.log(`Form fields: ${fields.length}`);
  fields.forEach(field => {
    console.log(`- ${field.getName()}: ${field.constructor.name}`);
  });

  // Get page sizes
  pdfDoc.getPages().forEach((page, index) => {
    const { width, height } = page.getSize();
    console.log(`Page ${index + 1}: ${width} x ${height}`);
  });
}

// Inspect the sample PDF
const samplePdfPath = path.join(__dirname, '..', 'libs', 'templates', 'Proposal Sample Dynamic Data Highlight Part.pdf');
inspectPdf(samplePdfPath).catch(console.error);