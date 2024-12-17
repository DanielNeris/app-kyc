import type { KYCStatus } from '@/components/enums/kycStatus'
import type { KYCStats } from '@/services/kyc/get-kyc-kpis'
import { createContext, useContext } from 'react'

export type KYCList = {
  id: string
  status: KYCStatus
  createdAt: string
  updatedAt: string
  user: {
    id: string
    email: string
    fullName: string
  }
  file: {
    id: string
    url: string
  }
}

export type KYCUpdate = {
  kycId: string
  status: KYCStatus
  remarks?: string
}

type KYCContextType = {
  kycList: KYCList[]
  kycKpis: KYCStats
  isLoading: boolean
  submitKYC: (userId: string, file: File) => Promise<void>
  fetchKYCList: () => Promise<void>
  fetchKYCKpis: () => Promise<void>
  updateKyc: (data: KYCUpdate) => Promise<void>
}

export const KYCContext = createContext<KYCContextType | undefined>(undefined)

export const useKYC = () => {
  const context = useContext(KYCContext)
  if (!context) {
    throw new Error('useKYC must be used within a KYCProvider')
  }
  return context
}
