import httpClient from '@/services/httpClient'

interface RegisterParams {
  fullName: string
  role: string
  email: string
  password: string
  confirmPassword: string
}

export async function registerUser(data: RegisterParams) {
  try {
    const response = await httpClient.post('/auth/register', data)
    return response.data
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'An error occurred during registration'
    )
  }
}
