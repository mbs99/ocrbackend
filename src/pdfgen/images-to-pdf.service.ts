import { Injectable } from '@nestjs/common';
import jsPDF from 'jspdf';
import { Result } from './result';
import * as gm from 'gm';
import { stdout } from 'process';

@Injectable()
export class ImagesToPdfService {
  async createPdf(files: Express.Multer.File[]) {
    const doc = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4',
    });

    var firstPage = true;

    await Promise.all(
      files.map(async (file) => {
        if (!firstPage) {
          doc.addPage('a4', 'p');
        } else {
          firstPage = false;
        }

        let width = doc.internal.pageSize.getWidth();
        let height = doc.internal.pageSize.getHeight();

        const rotated = await new Promise<Buffer>((resolve, reject) => {
          gm(file.path)
            .autoOrient()
            .toBuffer((err, buffer) => {
              if (err) {
                reject(err);
              }
              resolve(buffer);
            });
        });

        doc.addImage({
          imageData: rotated,
          x: 0,
          y: 0,
          width: width,
          height: height,
        });
      }),
    );

    return doc.output('arraybuffer');
  }
}
