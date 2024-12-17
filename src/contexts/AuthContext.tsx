import type React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@/hooks/use-toast'
import { loginUser, type LoginParams } from '@/services/auth/login'
import { AuthContext, type User } from '@/hooks/use-auth'
import { registerUser } from '@/services/auth/register'
import { STORAGE_KEYS } from '@/constants/storageKeys'

interface RegisterParams {
  fullName: string
  role: string
  email: string
  password: string
  confirmPassword: string
  ddocument: File | null
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const toast = useToast()

  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN)
    const savedUser = localStorage.getItem(STORAGE_KEYS.USER)

    if (token && savedUser) {
      setUser(JSON.parse(savedUser))
    }

    setIsLoading(false)
  }, [])

  const login = async ({ email, password }: LoginParams) => {
    try {
      setIsLoading(true)

      const response = await loginUser({ email, password })

      const user = {
        id: response.user.id,
        email: response.user.email,
        role: response.user.role,
      }

      const token = response.token

      localStorage.setItem(STORAGE_KEYS.TOKEN, token)
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user))
      setUser(user)

      toast.success({
        title: 'Login successful',
        description: 'Welcome back!',
      })

      navigate('/files')
    } catch (error) {
      toast.error({
        title: 'Error',
        description: error.message || 'Invalid email or password.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const register = async ({
    fullName,
    email,
    password,
    confirmPassword,
    role,
    document,
  }: RegisterParams) => {
    try {
      setIsLoading(true)

      await registerUser({
        fullName,
        email,
        password,
        confirmPassword,
        role,
      })

      // await uploadDocument(document)

      toast.success({
        title: 'KYC Submitted',
        description: 'Your documents have been sent for review.',
      })

      navigate('/login')
    } catch (error) {
      toast.error({
        title: 'Error',
        description: error.message,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN)
    localStorage.removeItem(STORAGE_KEYS.USER)
    setUser(null)
    navigate('/login')

    toast.success({
      title: 'Logged out',
      description: 'Come back soon!',
    })
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}
