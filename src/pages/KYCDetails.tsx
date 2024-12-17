import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import DashboardLayout from '@/components/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useKYC, type KYCDetails } from '@/hooks/use-kyc'
import { KYCStatus } from '@/components/enums/kycStatus'
import ModalKyc from '@/components/ui/modalKyc'

const KYCDetailsPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { fetchKYCById, updateKyc } = useKYC()

  const [kycDetails, setKYCDetails] = useState<KYCDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchKYCById(id)
        setKYCDetails(data)
      } catch (error) {
        console.error('Failed to fetch KYC details:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  const handleApprove = async () => {
    await updateKyc({
      kycId: kycDetails.id,
      status: KYCStatus.APPROVED,
      remarks: '',
    })
    const updatedData = await fetchKYCById(id)
    setKYCDetails(updatedData)
  }

  const handleReject = async (inputValue: string) => {
    await updateKyc({
      kycId: kycDetails.id,
      status: KYCStatus.REJECTED,
      remarks: inputValue,
    })
    setIsModalOpen(false)
    const updatedData = await fetchKYCById(id)
    setKYCDetails(updatedData)
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-screen">
          <p className="text-lg font-semibold text-gray-500">Loading...</p>
        </div>
      </DashboardLayout>
    )
  }

  if (!kycDetails) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-screen">
          <p className="text-lg font-semibold text-red-500">
            KYC details not found.
          </p>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            KYC Details
          </h1>
          <Button variant="outline" onClick={() => navigate(-1)}>
            Back to Dashboard
          </Button>
        </div>

        {/* User Information */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle>User Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>
              <strong>Name:</strong> {kycDetails.user.fullName}
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
            {kycDetails.status === KYCStatus.REJECTED && (
              <p>
                <strong>Rejection Reason:</strong>{' '}
                <span className="text-gray-800">
                  {kycDetails.remarks || 'No remarks provided'}
                </span>
              </p>
            )}
            <p>
              <strong>Created At:</strong>{' '}
              {new Date(kycDetails.createdAt).toLocaleString()}
            </p>
          </CardContent>
        </Card>

        {/* Document Information */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle>Document</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>
              <strong>File ID:</strong> {kycDetails.file.id}
            </p>
            <div>
              <strong>Document Preview:</strong>
              <img
                src={kycDetails.file.url}
                alt="Document"
                className="mt-2 w-full max-w-md rounded-md border"
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

        {/* Action Buttons */}
        {kycDetails.status === KYCStatus.PENDING && (
          <div className="flex gap-4">
            <Button
              onClick={handleApprove}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Approve
            </Button>
            <Button
              onClick={() => setIsModalOpen(true)}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Reject
            </Button>
          </div>
        )}
      </div>

      {/* Modal for Rejection */}
      <ModalKyc
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleReject}
        title="Reject KYC"
        placeholder="Enter the reason for rejection..."
        buttonLabel="Confirm Rejection"
      />
    </DashboardLayout>
  )
}

export default KYCDetailsPage
