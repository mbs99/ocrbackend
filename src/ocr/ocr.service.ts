import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';

@Injectable()
export class OcrService {
  public ocrMyPdf(pdf: Buffer): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const child = exec(
        `ocrmypdf - - `,
        {
          encoding: 'buffer',
          maxBuffer: 1024 * 1014 * 10,
        },
        (error, stdout, stderr) => {
          if (error) {
            console.log(`${stderr.toString()}`);
            reject(error);
          }

          resolve(stdout);
        },
      );

      child.stdin.write(pdf);
      child.stdin.end();
    });
  }
}
