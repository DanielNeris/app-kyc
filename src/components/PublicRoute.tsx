import { useAuth } from '@/hooks/use-auth'
import { Navigate } from 'react-router-dom'

interface PublicRouteProps {
  children: React.ReactNode
}

export const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { user } = useAuth()

  if (user) {
    if (user.role === 'admin') {
      return <Navigate to="/dashboard" replace />
    }
    return <Navigate to="/user-profile" replace />
  }

  return <>{children}</>
}
