import * as Dialog from '@radix-ui/react-dialog'
import { Button } from '@/components/ui/button'

interface ModalProps {
  open: boolean
  onClose: () => void
  onCapture: () => void
  videoRef: React.RefObject<HTMLVideoElement>
}

const ModalCamera = ({ open, onClose, onCapture, videoRef }: ModalProps) => (
  <Dialog.Root open={open} onOpenChange={onClose}>
    <Dialog.Content className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Capture Image</h3>
        <video ref={videoRef} autoPlay className="w-full rounded-md" />
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              onCapture()
              onClose() // Close the modal after capturing
            }}
          >
            Capture
          </Button>
        </div>
      </div>
    </Dialog.Content>
  </Dialog.Root>
)

export default ModalCamera
