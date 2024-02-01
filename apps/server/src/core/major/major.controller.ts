import { Controller, Get } from '@nestjs/common';
import { MajorService } from './major.service';

@Controller('majors')
export class MajorController {
  constructor(private readonly majorService: MajorService) {}

  @Get()
  async listMajors() {
    return await this.majorService.listMajors();
  }
}
