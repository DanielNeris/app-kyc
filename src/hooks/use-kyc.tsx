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

export type KYCDetails = {
  id: string
  status: string
  remarks: string
  createdAt: string
  updatedAt: string
  user: {
    fullName: string
    email: string
  }
  file: {
    id: string
    url: string
  }
}

export type KYCSubmit = { userId: string; file: File }

type KYCContextType = {
  kycList: KYCList[]
  kycKpis: KYCStats
  isLoading: boolean
  submitKYC: (data: KYCSubmit) => Promise<void>
  fetchKYCList: () => Promise<void>
  fetchKYCById: (id: string) => Promise<KYCDetails>
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
