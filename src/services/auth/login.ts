import httpClient from '@/services/httpClient'

export interface LoginParams {
  email: string
  password: string
}

export async function loginUser(data: LoginParams) {
  try {
    const response = await httpClient.post('/auth/login', data)
    return response.data
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'An error occurred during login'
    )
  }
}
