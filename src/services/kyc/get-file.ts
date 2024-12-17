import httpClient from '@/services/httpClient'

export const getFileDetails = async (
  shareableLink: string
): Promise<{
  url: string
  views: number
}> => {
  const response = await httpClient.get(shareableLink)

  return response.data
}
