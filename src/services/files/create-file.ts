import { STORAGE_KEYS } from '@/constants/storageKeys'
import httpClient from '@/services/httpClient'

export async function createFile(file: File) {
  try {
    const formData = new FormData()
    formData.append('file', file)

    const response = await httpClient.post('/files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
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
