import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMajorDto } from './dtos/create-major.dto';
import { UpdateMajorDto } from './dtos/update-major.dto';
import { MajorRepository } from './major.repository';

@Injectable()
export class MajorService {
  constructor(private readonly majorRepository: MajorRepository) {}

  async listMajors() {
    const majors = await this.majorRepository.listMajors();
    return { data: majors };
  }

  async createMajor(createMajorDto: CreateMajorDto) {
    const exists = await this.majorRepository.majorExists(createMajorDto.name);

    if (exists) {
      throw new BadRequestException('Major sudah ada, coba yang lain.');
    }

    const major = await this.majorRepository.createMajor(createMajorDto);

    return { data: major };
  }

  async updateMajor(id: string, updateMajorDto: UpdateMajorDto) {
    const major = await this.majorRepository.getMajorById(id);

    if (!major) {
      throw new NotFoundException('Major tidak ditemukan.');
    }

    if (updateMajorDto.name && updateMajorDto.name === major.name) {
      delete updateMajorDto.name;
    } else {
      const exists = await this.majorRepository.majorExists(
        updateMajorDto.name,
      );

      if (exists) {
        throw new BadRequestException('Major sudah ada, coba yang lain.');
      }
    }

    const updated = await this.majorRepository.updateMajor(id, updateMajorDto);

    return { message: 'Major berhasil diupdate.', data: updated };
  }

  async deleteMajor(id: string) {
    const major = await this.majorRepository.getMajorByIdCountStudents(id);

    if (!major) {
      throw new NotFoundException('Major tidak ditemukan.');
    }

    if (major._count.students > 0) {
      throw new BadRequestException(
        `Major masih digunakan ${major._count.students} siswa, tidak dapat dihapus.`,
      );
    }

    return { message: 'Major berhasil dihapus.' };
  }
}
