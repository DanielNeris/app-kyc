import { useAuth } from '@/hooks/use-auth'
import { Navigate } from 'react-router-dom'

interface PublicRouteProps {
  children: React.ReactNode
}

export const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { user } = useAuth()

  if (user) {
    return <Navigate to="/files" replace />
  }

  return <>{children}</>
}
