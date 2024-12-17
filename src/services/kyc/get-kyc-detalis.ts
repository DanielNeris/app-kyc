import { STORAGE_KEYS } from '@/constants/storageKeys'
import type { KYCDetails } from '@/hooks/use-kyc'
import httpClient from '@/services/httpClient'

export const getKycDetails = async (userId: string): Promise<KYCDetails> => {
  try {
    const response = await httpClient.get(`/kyc/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(STORAGE_KEYS.TOKEN)}`,
      },
    })

    return response.data.kyc
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'An error occurred during login'
    )
  }
}
