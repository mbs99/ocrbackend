import {
  Controller,
  Get,
  Header,
  Post,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  health(): string {
    return this.appService.getHealth();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('files'))
  @Header('Content-Type', 'application/pdf')
  @Header('Content-Disposition', 'attachment; filename="result.pdf"')
  uploadFile(@UploadedFile() files: Array<Express.Multer.File>) {
    return this.appService
      .handleFiles(files)
      .then((result) => new StreamableFile(result));
  }
}
