import { Role, VerificationStatus } from '@halostemba/db';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { CreateVerificationDto } from './dtos/create-verification.dto';
import { RejectVerificationDto } from './dtos/reject-verification.dto';
import { VerificationRepository } from './verification.repository';

@Injectable()
export class VerificationService {
  constructor(
    private readonly verificationRepository: VerificationRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async createVerification(
    createVerificationDto: CreateVerificationDto,
    userId: string,
  ) {
    const lastVerification =
      await this.verificationRepository.getVerificationByUserId(userId);

    if (
      lastVerification &&
      lastVerification?.status !== VerificationStatus.REJECTED
    )
      throw new BadRequestException('Verification request is still pending');

    const verification = await this.verificationRepository.createVerification({
      ...createVerificationDto,
      userId,
    });

    return verification;
  }

  async getCurrentUserVerifications(userId: string) {
    const verifications =
      await this.verificationRepository.getListVerificationByUserId(userId);
    return verifications;
  }

  async approveVerificationRequest(userId: string) {
    const verification =
      await this.verificationRepository.getVerificationByUserIdAndRole(
        userId,
        Role.GUEST,
      );

    if (!verification) {
      throw new NotFoundException('Verification request not found');
    }

    if (verification.status !== VerificationStatus.PENDING) {
      throw new BadRequestException('Verification request is not pending');
    }

    await this.verificationRepository.updateStatusVerification(
      verification.id,
      VerificationStatus.APPROVED,
    );

    await this.userRepository.updateUserGuestToStudent(userId, verification);

    return {
      message: 'Verification request has been approved',
    };
  }

  async rejectVerificationRequest(
    rejectVerificationDto: RejectVerificationDto,
    userId: string,
  ) {
    const verification =
      await this.verificationRepository.getVerificationByUserIdAndRole(
        userId,
        Role.GUEST,
      );

    if (!verification)
      throw new NotFoundException('Verification request not found');

    if (verification.status !== VerificationStatus.PENDING)
      throw new BadRequestException('Verification request is not pending');

    await this.verificationRepository.updateStatusVerification(
      verification.id,
      VerificationStatus.REJECTED,
      rejectVerificationDto.note,
    );

    return { message: 'Verification request has been rejected' };
  }
}
