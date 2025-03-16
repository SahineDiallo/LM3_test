import { create } from "zustand"
import { persist } from "zustand/middleware"

interface User {
  id: string
  email: string
  first_name: string
  last_name: string
  mobile_phone: string
  is_admin: boolean
  token: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  setUser: (user: User) => void
  logout: () => void
  register: (userData: Omit<User, "token"> & { token: string }) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: true }),
      register: (userData) =>
        set({
          user: userData,
          isAuthenticated: true,
        }),
        logout: () => {
          localStorage.removeItem("token")
          localStorage.removeItem("refreshToken")
          localStorage.removeItem("tokenExpirationTime")

          set({ 
            user: null, 
            isAuthenticated: false 
          })
        }
    }),
    {
      name: "auth-storage",
    },
  ),
)

