import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from '~/providers/database/database.service';
import { CreateVerificationDto } from './dtos/create-verification.dto';
import { Role, Status } from '@halostemba/db';
import { RejectVerificationDto } from './dtos/reject-verification.dto';

@Injectable()
export class VerificationService {
  constructor(private readonly db: DatabaseService) {}

  async createVerification(
    createVerificationDto: CreateVerificationDto,
    userId: string,
  ) {
    const { major_id, id_card, nis } = createVerificationDto;

    const lastVerification = await this.db.verificationRequest.findFirst({
      where: {
        userId,
      },
      select: {
        status: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (lastVerification && lastVerification?.status !== Status.REJECTED) {
      throw new BadRequestException('Verification request is still pending');
    }

    const verification = await this.db.verificationRequest.create({
      data: {
        idCard: id_card,
        nis,
        user: {
          connect: {
            id: userId,
          },
        },
        major: {
          connect: {
            id: major_id,
          },
        },
      },
    });

    return verification;
  }

  async getCurrentUserVerifications(userId: string) {
    const verifications = await this.db.verificationRequest.findMany({
      where: {
        userId,
      },
      include: {
        major: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return verifications;
  }

  async approveVerificationRequest(userId: string) {
    const verification = await this.db.verificationRequest.findFirst({
      where: {
        user: {
          id: userId,
          role: Role.GUEST,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!verification) {
      throw new NotFoundException('Verification request not found');
    }

    if (verification.status !== Status.PENDING) {
      throw new BadRequestException('Verification request is not pending');
    }

    await this.db.verificationRequest.update({
      where: {
        id: verification.id,
      },
      data: {
        status: Status.APPROVED,
      },
    });

    await this.db.user.update({
      where: {
        id: userId,
      },
      data: {
        role: Role.STUDENT,
        student: {
          create: {
            nis: verification.nis,
            majorId: verification.majorId,
            idCard: verification.idCard,
          },
        },
      },
    });

    return {
      message: 'Verification request has been approved',
    };
  }

  async rejectVerificationRequest(
    rejectVerificationDto: RejectVerificationDto,
    userId: string,
  ) {
    const verification = await this.db.verificationRequest.findFirst({
      where: {
        user: {
          id: userId,
          role: Role.GUEST,
        },
      },
      select: {
        id: true,
        status: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!verification) {
      throw new NotFoundException('Verification request not found');
    }

    if (verification.status !== Status.PENDING) {
      throw new BadRequestException('Verification request is not pending');
    }

    await this.db.verificationRequest.update({
      where: {
        id: verification.id,
      },
      data: {
        status: Status.REJECTED,
        note: rejectVerificationDto.note,
      },
    });

    return {
      message: 'Verification request has been rejected',
    };
  }
}
