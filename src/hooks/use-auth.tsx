import { createContext, useContext } from 'react'

export interface User {
  id: string
  fullName: string
  email: string
  role: string
}

interface LoginCredentials {
  email: string
  password: string
}

interface RegisterCredentials {
  fullName: string
  email: string
  password: string
  confirmPassword: string
  role: string
  document: File | null
}

interface AuthContextType {
  user: User | null
  login: (data: LoginCredentials) => Promise<void>
  register: (data: RegisterCredentials) => Promise<void>
  logout: () => void
  isLoading: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
