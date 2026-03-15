import * as fs from 'fs';
import * as path from 'path';
import PizZip from 'pizzip';

function extractDocxTemplateTags(docxPath: string): string[] {
  if (!fs.existsSync(docxPath)) {
    throw new Error(`Template not found: ${docxPath}`);
  }

  const content = fs.readFileSync(docxPath);
  const zip = new PizZip(content);
  const tags = new Set<string>();
  const regex = /\{\{([^}]+)\}\}/g;

  Object.keys(zip.files).forEach(relativePath => {
    const file = zip.files[relativePath];
    if (!relativePath.endsWith('.xml')) return;
    try {
      const text = file.asText();
      let match: RegExpExecArray | null;
      while ((match = regex.exec(text))) {
        const tag = match[1].trim();
        if (tag) tags.add(tag);
      }
    } catch {
      // ignore non-text entries
    }
  });

  return Array.from(tags).sort();
}

// List of DOCX files
const templates = [
  'India Certification Divison Proposal.docx',
  'India GRC Proposal.docx',
  'USA Certification Divison Proposal - Copy.docx',
  'USA GRC PROPOSAL.docx'
];

const templateDir = path.join(__dirname, '..', 'libs', 'templates', 'Proposal');

templates.forEach(template => {
  const fullPath = path.join(templateDir, template);
  try {
    const tags = extractDocxTemplateTags(fullPath);
    console.log(`\nTags in ${template}:`);
    console.log(tags.join(', '));
  } catch (error) {
    console.error(`Error processing ${template}:`, error.message);
  }
});