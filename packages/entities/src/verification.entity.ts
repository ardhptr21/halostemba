export class VerificationEntity {
  id: string;
  userId: string;
  majorId: string;
  nis: string;
  idCard: string;
  note: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: Date;
  updatedAt: Date;
}
