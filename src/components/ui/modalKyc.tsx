import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

interface ModalKycProps {
  open: boolean
  onClose: () => void
  onSubmit: (inputValue: string) => void
  title: string
  placeholder?: string
  buttonLabel?: string
}

const ModalKyc: React.FC<ModalKycProps> = ({
  open,
  onClose,
  onSubmit,
  title,
  placeholder = 'Enter remarks...',
  buttonLabel = 'Submit',
}) => {
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = () => {
    if (inputValue.trim()) {
      onSubmit(inputValue)
      setInputValue('')
      onClose()
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
        {/* Content */}
        <Dialog.Content className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <Dialog.Title className="text-xl font-semibold text-gray-800">
                {title}
              </Dialog.Title>
              <Dialog.Close asChild>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Close Modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </Dialog.Close>
            </div>

            {/* Input Field */}
            <div className="mb-6">
              <label
                htmlFor="remarks"
                className="block text-sm font-medium mb-2"
              >
                Remarks
              </label>
              <input
                id="remarks"
                type="text"
                value={inputValue}
                placeholder={placeholder}
                onChange={e => setInputValue(e.target.value)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-300 outline-none"
              />
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!inputValue.trim()} // Disable if input is empty
                className={`${
                  !inputValue.trim()
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                {buttonLabel}
              </Button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default ModalKyc
