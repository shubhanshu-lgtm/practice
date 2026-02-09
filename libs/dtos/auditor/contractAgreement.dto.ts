export class GenerateCertificateDto {
  auditorId: number;
  certificateType: 'AGREEMENT' | 'CERTIFICATE';
  certificateGeneratedDate: string;
}

export class CertificateResponseDto {
  success: boolean;
  message: string;
  pdfUrl?: string;
  pdfBuffer?: Buffer;
}