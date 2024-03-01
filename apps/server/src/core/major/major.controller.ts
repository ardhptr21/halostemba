import { Role } from '@halostemba/db';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { Auth } from '~/commons/decorators/validators/auth.decorator';
import { CreateMajorDto } from './dtos/create-major.dto';
import { MajorService } from './major.service';

@Controller('majors')
export class MajorController {
  constructor(private readonly majorService: MajorService) {}

  @Get()
  async listMajors() {
    return await this.majorService.listMajors();
  }

  @Auth(false, Role.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createMajor(@Body() createMajorDto: CreateMajorDto) {
    return await this.majorService.createMajor(createMajorDto);
  }

  @Auth(false, Role.ADMIN)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async updateMajor(
    @Body() updateMajorDto: CreateMajorDto,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return await this.majorService.updateMajor(id, updateMajorDto);
  }

  @Auth(false, Role.ADMIN)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async deleteMajor(@Param('id', ParseUUIDPipe) id: string) {
    return await this.majorService.deleteMajor(id);
  }
}
