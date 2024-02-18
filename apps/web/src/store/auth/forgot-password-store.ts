import { create } from "zustand";

interface ForgotPasswordStore {
  email: string | null;
  token: string | null;
  setToken: (token: string) => void;
  setEmail: (email: string) => void;
  reset: () => void;
}

export const useForgotPasswordStore = create<ForgotPasswordStore>((set) => ({
  email: null,
  token: null,
  setToken: (token: string) => set({ token }),
  setEmail: (email: string) => set({ email }),
  reset: () => set({ email: null, token: null }),
}));
