import { Prisma } from '@halostemba/db';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from '~/providers/database/database.service';
import { CreateMenfessDto } from './dtos/create-menfess.dto';

@Injectable()
export class MenfessService {
  constructor(private readonly db: DatabaseService) {}

  async createMenfess(createMenfessDto: CreateMenfessDto, userId: string) {
    const menfess = await this.db.menfess.create({
      data: { ...createMenfessDto, author: { connect: { id: userId } } },
      select: { id: true, content: true, anonymous: true },
    });

    if (!menfess) {
      throw new InternalServerErrorException('Failed to create menfess.');
    }

    return { message: 'Menfess created.', data: menfess };
  }

  async getMenfess(menfessId: string) {
    const menfess = await this.db.menfess.findFirst({
      where: { id: menfessId },
      select: {
        id: true,
        content: true,
        anonymous: true,
        createdAt: true,
        author: { select: { name: true, username: true } },
        votes: { select: { userId: true, type: true } },
      },
    });

    if (!menfess) {
      throw new NotFoundException('Menfess not found.');
    }

    if (menfess.anonymous) {
      menfess.author = null;
    }

    return { data: menfess };
  }

  async removeMenfess(menfessId: string, userId: string) {
    try {
      await this.db.menfess.delete({
        where: {
          id: menfessId,
          authorId: userId,
        },
      });

      return { message: 'Menfess removed.' };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025')
          throw new NotFoundException('Menfess not found.');
      }

      throw new InternalServerErrorException('Failed to remove menfess.');
    }
  }
}
