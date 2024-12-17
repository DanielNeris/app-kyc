import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/hooks/use-toast'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { UploadCloud, Camera } from 'lucide-react'
import Modal from '@/components/ui/modal'
import { useCamera } from '@/hooks/use-camera'
import { ALLOWED_FILE_TYPES } from '@/constants/allowedFilesTypes'
import { useAuth } from '@/hooks/use-auth'

const kycSchema = z
  .object({
    fullName: z.string().min(3, 'Full name is required'),
    email: z.string().email('Invalid email'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    confirmPassword: z
      .string()
      .min(6, 'Password confirmation must be at least 6 characters long'),
    document: z
      .union([z.instanceof(FileList), z.string()])
      .refine(
        value =>
          typeof value === 'string' ||
          (value instanceof FileList &&
            ALLOWED_FILE_TYPES.includes(value[0]?.type)),
        {
          message: `Only files of type ${ALLOWED_FILE_TYPES.join(', ')} are allowed.`,
        }
      ),
  })
  .refine(data => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords must match',
  })

type KYCFormValues = z.infer<typeof kycSchema>

const KYCForm = () => {
  const toast = useToast()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isUsingCamera, setIsUsingCamera] = useState(false)

  const { register, isLoading } = useAuth()

  const { videoRef, image, startCamera, stopCamera, captureImage } = useCamera()

  const form = useForm<KYCFormValues>({
    resolver: zodResolver(kycSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      document: '',
    },
  })

  const onSubmit = async (data: KYCFormValues) => {
    const { fullName, email, password, confirmPassword } = data
    const documentData = isUsingCamera && image ? image : data.document[0]

    await register({
      fullName,
      email,
      password,
      confirmPassword,
      role: 'user',
      document: documentData,
    })
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-lg px-6 py-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          KYC Document Submission
        </h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="example@email.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="document"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Document Source</FormLabel>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant={!isUsingCamera ? 'default' : 'outline'}
                      onClick={() => {
                        setIsUsingCamera(false)
                        field.onChange('')
                      }}
                    >
                      Upload File
                    </Button>
                    <Button
                      type="button"
                      variant={isUsingCamera ? 'default' : 'outline'}
                      onClick={() => {
                        setIsUsingCamera(true)
                        setIsModalOpen(true)
                        startCamera()
                      }}
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      Use Camera
                    </Button>
                  </div>

                  {!isUsingCamera ? (
                    <FormControl>
                      <Input
                        type="file"
                        accept=".jpg, .jpeg, .png, .pdf"
                        onChange={e => field.onChange(e.target.files)}
                      />
                    </FormControl>
                  ) : (
                    image && (
                      <div className="mt-4">
                        <p className="text-sm font-semibold mb-2">
                          Captured Image:
                        </p>
                        <img
                          src={image}
                          alt="Captured"
                          className="w-full rounded-md"
                        />
                      </div>
                    )
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <Modal
              open={isModalOpen}
              onClose={() => {
                setIsModalOpen(false)
                stopCamera()
              }}
              onCapture={() => {
                captureImage()
                setIsModalOpen(false)
              }}
              videoRef={videoRef}
            />

            <Button
              type="submit"
              className="w-full bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!form.formState.isValid}
            >
              <UploadCloud className="w-4 h-4 mr-2" />
              Submit KYC
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default KYCForm
