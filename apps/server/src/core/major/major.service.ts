import { Injectable } from '@nestjs/common';
import { MajorRepository } from './major.repository';

@Injectable()
export class MajorService {
  constructor(private readonly majorRepository: MajorRepository) {}

  async listMajors() {
    return await this.majorRepository.listMajors();
  }
}
