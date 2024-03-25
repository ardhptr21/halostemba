import { Injectable } from '@nestjs/common';
import { DatabaseService } from '~/providers/database/database.service';
import { CreateMajorDto } from './dtos/create-major.dto';
import { UpdateMajorDto } from './dtos/update-major.dto';

@Injectable()
export class MajorRepository {
  constructor(private readonly db: DatabaseService) {}

  async listMajors() {
    return await this.db.major.findMany({
      include: { _count: { select: { students: true } } },
    });
  }

  async majorExists(name: string) {
    return await this.db.major.count({ where: { name } });
  }

  async majorExistsById(id: string) {
    return await this.db.major.count({ where: { id } });
  }

  async getMajorById(id: string) {
    return await this.db.major.findFirst({ where: { id } });
  }

  async getMajorByIdCountStudents(id: string) {
    return await this.db.major.findFirst({
      where: { id },
      include: { _count: { select: { students: true } } },
    });
  }

  async createMajor(createMajorDto: CreateMajorDto) {
    return await this.db.major.create({ data: createMajorDto });
  }

  async updateMajor(id: string, updateMajorDto: UpdateMajorDto) {
    return await this.db.major.update({ data: updateMajorDto, where: { id } });
  }

  async deleteMajor(id: string) {
    return await this.db.major.delete({ where: { id } });
  }
}
