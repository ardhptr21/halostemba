import { create } from "zustand";

interface VerificationEmailStore {
  email: string | null;
  setEmail: (email: string | null) => void;
}

export const useVerificationEmailStore = create<VerificationEmailStore>(
  (set) => ({
    email: null,
    setEmail: (email: string | null) => set({ email }),
  }),
);
