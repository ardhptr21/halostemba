export interface MajorEntity {
  id: string;
  name: string;
  logo: string;
  createdAt: string;
  updatedAt: string;
  _count?: {
    students: number;
  };
}
