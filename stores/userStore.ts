'use client';

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface UserState {
  username: string | null
  email: string | null
  token: string | null
  setUser: (username: string, email: string, token: string) => void
  clearUser: () => void
  getToken: () => string | null
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      username: null,
      email: null,
      token: null,
      setUser: (username, email, token) => set({ username, email, token }),
      clearUser: () => set({ username: null, email: null, token: null }),
      getToken: () => get().token,
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)