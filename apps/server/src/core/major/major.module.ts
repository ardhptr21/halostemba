import { Module } from '@nestjs/common';
import { MajorService } from './major.service';
import { MajorController } from './major.controller';
import { MajorRepository } from './major.repository';

@Module({
  controllers: [MajorController],
  providers: [MajorService, MajorRepository],
})
export class MajorModule {}
