// store/authStore.ts
import { create } from 'zustand';

type AuthState = {
    user: null | { uid: string; email: string };
    setUser: (user: AuthState['user']) => void;
};

export const useAuth = create<AuthState>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
}));
