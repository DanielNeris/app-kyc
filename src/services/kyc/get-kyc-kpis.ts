import { STORAGE_KEYS } from '@/constants/storageKeys'
import httpClient from '@/services/httpClient'

export type KYCStats = {
  totalUsers: number
  approved: number
  rejected: number
  pending: number
}

export const getKycKpis = async (): Promise<KYCStats> => {
  try {
    const response = await httpClient.get('/dashboard/kpis', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(STORAGE_KEYS.TOKEN)}`,
      },
    })

    return response.data
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'An error occurred during login'
    )
  }
}
