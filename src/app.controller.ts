import {
  Controller,
  Get,
  Header,
  Post,
  Render,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  health(): string {
    return this.appService.getHealth();
  }

  @Get('upload')
  @Render('upload')
  upload() {
    return {};
  }

  /*
  @Post('upload')
  @UseInterceptors(FileInterceptor('files'))
  @Render('pages')
  uploadFile(@UploadedFile() files: Array<Express.Multer.File>) {
    var uploads = files;
    if (!Array.isArray(files)) {
      uploads = [files];
    }
    const pages = uploads.map((file, i) => {
      return {
        pos: i,
        name: file.originalname,
      };
    });

    return {
      pages: pages,
    };
  }
  */

  @Post('upload')
  @UseInterceptors(FileInterceptor('files'))
  @Header('Content-Type', 'application/pdf')
  @Header('Content-Disposition', 'attachment; filename="result.pdf"')
  pages(@UploadedFile() files: Array<Express.Multer.File>) {
    return this.appService
      .handleFiles(files)
      .then((result) => new StreamableFile(result));
  }
}
