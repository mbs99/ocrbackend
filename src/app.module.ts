import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PdfgenModule } from './pdfgen/pdfgen.module';
import { OcrModule } from './ocr/ocr.module';

@Module({
  imports: [PdfgenModule, OcrModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
