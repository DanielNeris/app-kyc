import { STORAGE_KEYS } from '@/constants/storageKeys'
import httpClient from '@/services/httpClient'
import type { KYCStatus } from '@/components/enums/kycStatus'

export type KYCUpdate = {
  kycId: string
  status: KYCStatus
  remarks?: string
}

export const updateKycStatus = async (data: KYCUpdate): Promise<void> => {
  try {
    const response = await httpClient.patch('/kyc/update-status', data, {
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
