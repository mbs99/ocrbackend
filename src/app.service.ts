import { Injectable } from '@nestjs/common';
import jsPDF from 'jspdf';
import { OcrService } from './ocr/ocr.service';
import { ImagesToPdfService } from './pdfgen/images-to-pdf.service';

@Injectable()
export class AppService {
  constructor(
    private readonly imagesToPdfService: ImagesToPdfService,
    private readonly ocrService: OcrService,
  ) {}

  handleFiles(files: Express.Multer.File[]): Promise<Buffer> {
    var uploads = files;
    if (!Array.isArray(files)) {
      uploads = [files];
    }

    const images = uploads.filter((file) =>
      this.isValidMimetype(file.mimetype),
    );

    return this.imagesToPdfService
      .createPdf(images)
      .then((pdf) => this.ocrService.ocrMyPdf(Buffer.from(pdf)));
  }

  getHealth(): string {
    return 'UP';
  }

  isValidMimetype(mimetype: string): boolean {
    return mimetype.startsWith('image/');
  }
}
