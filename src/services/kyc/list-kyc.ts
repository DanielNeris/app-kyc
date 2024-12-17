import { STORAGE_KEYS } from '@/constants/storageKeys'
import httpClient from '@/services/httpClient'

export async function listKyc() {
  try {
    const response = await httpClient.get('/kyc', {
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
