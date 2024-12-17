import { useAuth } from '@/hooks/use-auth'
import { Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

interface ProtectedRouteProps {
  children: React.ReactNode
  requireAdmin?: boolean
}

const ProtectedRoute = ({
  children,
  requireAdmin = false,
}: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth() // Verifica se o usuário está carregando
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    if (!isLoading) {
      setIsInitialized(true)
    }
  }, [isLoading])

  if (!isInitialized) {
    // Exibe um loading enquanto a autenticação está carregando
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-gray-500">Loading...</p>
      </div>
    )
  }

  if (!user) {
    // Redireciona para login se não houver usuário
    return <Navigate to="/login" replace />
  }

  if (requireAdmin && user.role !== 'admin') {
    // Redireciona para "/kyc" se o usuário não for admin
    return <Navigate to="/kyc" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
