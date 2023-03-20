import { Test, TestingModule } from '@nestjs/testing';
import { ImagesToPdfService } from './images-to-pdf.service';

describe('ImagesToPdfService', () => {
  let service: ImagesToPdfService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImagesToPdfService],
    }).compile();

    service = module.get<ImagesToPdfService>(ImagesToPdfService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
