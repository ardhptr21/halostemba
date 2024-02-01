import { create } from "zustand";
import { VerifyStudentValidatorType } from "~/validators/verification/verify-student-validator";

export interface VerificationStore {
  step: number;
  data: VerifyStudentValidatorType;
  incrementStep: () => void;
  decremenetStep: () => void;
  setData: (key: keyof VerifyStudentValidatorType, value: string) => void;
}

export const useVerificationStore = create<VerificationStore>()((set) => ({
  step: 1,
  data: {
    nis: "",
    majorId: "",
    idCard: "",
  },
  setData: (key, value) =>
    set((state) => ({ data: { ...state.data, [key]: value } })),
  incrementStep: () => set((state) => ({ step: state.step + 1 })),
  decremenetStep: () => set((state) => ({ step: state.step - 1 })),
}));
