import { Module } from '@nestjs/common';
import { ImagesToPdfService } from './images-to-pdf.service';

@Module({
  providers: [ImagesToPdfService],
  exports: [ImagesToPdfService],
})
export class PdfgenModule {}
