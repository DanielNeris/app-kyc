import { useRef, useState } from 'react'

export function useCamera() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [image, setImage] = useState<string | null>(null)

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      })
      setStream(mediaStream)
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
    } catch (error) {
      console.error('Error starting camera:', error)
      throw new Error('Unable to access the camera.')
    }
  }

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
      setStream(null)
    }
  }

  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas')
      canvas.width = videoRef.current.videoWidth
      canvas.height = videoRef.current.videoHeight
      const context = canvas.getContext('2d')

      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)
        const imageUrl = canvas.toDataURL('image/png')
        setImage(imageUrl)
        stopCamera() // Stop the camera stream after capturing
      }
    }
  }

  return { videoRef, image, startCamera, stopCamera, captureImage }
}
