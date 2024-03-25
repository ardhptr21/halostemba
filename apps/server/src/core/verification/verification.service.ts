import { Role, VerificationStatus } from '@halostemba/db';
import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { NotificationEvent } from '../notification/events/notification.event';
import { UserRepository } from '../user/user.repository';
import { CreateVerificationDto } from './dtos/create-verification.dto';
import { RejectVerificationDto } from './dtos/reject-verification.dto';
import {
  VerificationBadRequestException,
  VerificationNotFoundException,
} from './verification.exception';
import { VerificationRepository } from './verification.repository';
import { ListVerificationParamsDto } from './dtos/list-verification-params.dto';

@Injectable()
export class VerificationService {
  constructor(
    private readonly verificationRepository: VerificationRepository,
    private readonly userRepository: UserRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async getVerifications(params: ListVerificationParamsDto) {
    return await this.verificationRepository.getVerifications(params);
  }

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
      throw new VerificationBadRequestException(
        'Permintaan verifikasi sebelumnya masih dalam proses.',
      );

    const verification = await this.verificationRepository.createVerification({
      ...createVerificationDto,
      userId,
    });

    await this.notifyAdmins();

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
      throw new VerificationNotFoundException();
    }

    if (verification.status !== VerificationStatus.PENDING) {
      throw new VerificationBadRequestException(
        'Permintaan verifikasi tidak dalam status pending.',
      );
    }

    await this.verificationRepository.updateStatusVerification(
      verification.id,
      VerificationStatus.APPROVED,
    );

    await this.userRepository.updateUserGuestToStudent(userId, verification);

    this.verificationNotification(userId, VerificationStatus.APPROVED);

    return {
      message: 'Permintaan verifikasi telah disetujui.',
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

    if (!verification) throw new VerificationNotFoundException();

    if (verification.status !== VerificationStatus.PENDING)
      throw new VerificationBadRequestException(
        'Permintaan verifikasi tidak dalam status pending.',
      );

    await this.verificationRepository.updateStatusVerification(
      verification.id,
      VerificationStatus.REJECTED,
      rejectVerificationDto.note,
    );

    this.verificationNotification(
      userId,
      VerificationStatus.REJECTED,
      rejectVerificationDto.note,
    );

    return { message: 'Penolakan verifikasi berhasil.' };
  }

  private verificationNotification(
    userId: string,
    status: VerificationStatus,
    note?: string,
  ) {
    const statusMessage: {
      [key: string]: {
        message: string;
        status: 'SUCCESS' | 'WARNING';
        url?: string;
      };
    } = {
      APPROVED: {
        message: 'Selamat !! Kamu sudah terdaftar menjadi anggota STEMBA CLUB.',
        status: 'SUCCESS',
        url: `/profile`,
      },
      REJECTED: {
        message: `Maaf, permintaan verifikasi kamu ditolak. ${
          note ? `\nAlasan: ${note}` : ''
        }`,
        status: 'WARNING',
        url: `/stembaclub`,
      },
    };

    this.eventEmitter.emit(
      'notification',
      new NotificationEvent({
        userId,
        title: 'STEMBA CLUB',
        type: statusMessage[status].status,
        message: statusMessage[status].message,
        url: statusMessage[status].url,
        identifier: 'VERIFICATION',
      }),
    );
  }

  private async notifyAdmins() {
    const admins = await this.userRepository.getUserByRole(Role.ADMIN);

    admins.forEach((admin) => {
      this.eventEmitter.emit(
        'notification',
        new NotificationEvent({
          userId: admin.id,
          title: 'New Verification Request',
          type: 'INFO',
          message: 'Ada permintaan verifikasi baru.',
          url: `/admin/verification`,
          identifier: 'VERIFICATION',
        }),
      );
    });
  }
}
