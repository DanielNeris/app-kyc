import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import DashboardLayout from '@/components/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useKYC, type KYCDetails } from '@/hooks/use-kyc'
import { KYCStatus } from '@/components/enums/kycStatus'
import { useAuth } from '@/hooks/use-auth'

const UserKYCDetails = () => {
  const { user } = useAuth()
  const { fetchKYCById } = useKYC()

  const [kycDetails, setKYCDetails] = useState<KYCDetails | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchKYCById(user.id)
        setKYCDetails(data)
      } catch (error) {
        console.error('Failed to fetch KYC details:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [user.id])

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-screen">
          <p className="text-gray-500">Loading...</p>
        </div>
      </DashboardLayout>
    )
  }

  if (!kycDetails) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-screen">
          <p className="text-red-500">KYC details not found.</p>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>User Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>
              <strong>Full Name:</strong> {kycDetails.user.fullName}
            </p>
            <p>
              <strong>Email:</strong> {kycDetails.user.email}
            </p>
            <p>
              <strong>Status:</strong>{' '}
              <span
                className={
                  kycDetails.status === KYCStatus.PENDING
                    ? 'text-yellow-600'
                    : kycDetails.status === KYCStatus.APPROVED
                      ? 'text-green-600'
                      : 'text-red-600'
                }
              >
                {kycDetails.status}
              </span>
            </p>
            <p>
              {kycDetails.status === KYCStatus.REJECTED && (
                <p>
                  <strong>Rejection Reason:</strong>{' '}
                  <span className="text-red-600">
                    {kycDetails.remarks || 'No remarks provided'}
                  </span>
                </p>
              )}
            </p>

            <p>
              <strong>Created At:</strong>{' '}
              {new Date(kycDetails.createdAt).toLocaleString()}
            </p>
            <p>
              <strong>Updated At:</strong>{' '}
              {new Date(kycDetails.updatedAt).toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Document Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>
              <strong>File ID:</strong> {kycDetails.file.id}
            </p>
            <div>
              <strong>Document Preview:</strong>
              <img
                src={kycDetails.file.url}
                alt="Document Preview"
                className="mt-2 max-w-xs rounded-md border"
              />
            </div>
            <p>
              <strong>File URL:</strong>{' '}
              <a
                href={kycDetails.file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 underline"
              >
                View Document
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

export default UserKYCDetails
