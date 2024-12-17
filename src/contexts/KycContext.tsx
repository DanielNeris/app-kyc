import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { uploadFile } from '@/services/kyc/create-kyc'
import { getKycKpis, type KYCStats } from '@/services/kyc/get-kyc-kpis'
import { listKyc } from '@/services/kyc/list-kyc'
import { KYCContext, type KYCList, type KYCUpdate } from '@/hooks/use-kyc'
import { updateKycStatus } from '@/services/kyc/update-kyc-status'

export const KYCProvider = ({ children }: { children: React.ReactNode }) => {
  const [kycList, setKycList] = useState<KYCList[]>([])
  const [kycKpis, setKycKpis] = useState<KYCStats>({
    totalUsers: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  })

  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()

  const fetchKYCList = async () => {
    try {
      setIsLoading(true)
      const response = await listKyc()

      setKycList(response.kycs)
    } catch (error) {
      toast.error({
        title: 'Error',
        description: 'Failed to fetch KYC submissions.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const fetchKYCKpis = async () => {
    try {
      setIsLoading(true)
      const response = await getKycKpis()

      setKycKpis(response)
    } catch (error) {
      toast.error({
        title: 'Error',
        description: 'Failed to fetch KYC submissions.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const submitKYC = async (userId: string, file: File) => {
    try {
      setIsLoading(true)
      await uploadFile({ userId, file })
      toast.success({
        title: 'KYC Submitted',
        description: 'Your KYC documents have been sent for review.',
      })
      fetchKYCList()
    } catch (error) {
      toast.error({
        title: 'Error',
        description: 'Failed to submit KYC documents.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const updateKyc = async ({ kycId, status, remarks }: KYCUpdate) => {
    try {
      setIsLoading(true)
      await updateKycStatus({ kycId, status, remarks })
      toast.success({
        title: 'KYC Approved',
        description: 'The KYC submission has been approved.',
      })
      await fetchKYCList()
      await fetchKYCKpis()
    } catch (error) {
      toast.error({
        title: 'Error',
        description: 'Failed to approve KYC submission.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <KYCContext.Provider
      value={{
        kycList,
        isLoading,
        submitKYC,
        fetchKYCList,
        updateKyc,
        fetchKYCKpis,
        kycKpis,
      }}
    >
      {children}
    </KYCContext.Provider>
  )
}
