export class VerificationEntity {
  id: string;
  userId: string;
  majorId: string;
  nis: string;
  idCard: string;
  note: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: Date;
  updatedAt: Date;
}

export interface AdminVerificationEntity extends Omit<VerificationEntity, 'status' | 'note' | 'majorId' | 'userId'> {
  major: { name: string };
  user: { id: string; name: string; email: string; avatar: string };
}
