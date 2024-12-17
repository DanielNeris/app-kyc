import httpClient from '@/services/httpClient'

interface CreateKycParams {
  userId: string
  file: File
}

export async function uploadFile({ file, userId }: CreateKycParams) {
  try {
    const formData = new FormData()
    formData.append('file', file)

    const response = await httpClient.post(`/kyc/${userId}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'An error occurred during login'
    )
  }
}
