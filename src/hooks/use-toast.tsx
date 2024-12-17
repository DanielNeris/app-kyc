import { toast as toastifyToast } from 'react-toastify'

interface ToastOptions {
  title: string
  description?: string
}

export const useToast = () => {
  return {
    success: ({ title, description }: ToastOptions) => {
      toastifyToast.success(
        <div>
          <strong>{title}</strong>
          {description && <p>{description}</p>}
        </div>
      )
    },
    error: ({ title, description }: ToastOptions) => {
      toastifyToast.error(
        <div>
          <strong>{title}</strong>
          {description && <p>{description}</p>}
        </div>
      )
    },
    info: ({ title, description }: ToastOptions) => {
      toastifyToast.info(
        <div>
          <strong>{title}</strong>
          {description && <p>{description}</p>}
        </div>
      )
    },
    warning: ({ title, description }: ToastOptions) => {
      toastifyToast.warning(
        <div>
          <strong>{title}</strong>
          {description && <p>{description}</p>}
        </div>
      )
    },
  }
}
