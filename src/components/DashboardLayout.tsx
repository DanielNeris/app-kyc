import { useAuth } from '@/hooks/use-auth'
import { useNavigate } from 'react-router-dom'
import { LogOut, User, Home } from 'lucide-react'

interface DashboardLayoutProps {
  children: React.ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="flex items-center space-x-2 text-gray-800 hover:text-indigo-600 transition-colors"
              >
                <Home className="w-5 h-5" />
                <span className="font-bold text-lg">KYC System</span>
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-red-500 text-white px-3 py-1.5 rounded-md hover:bg-red-600 transition"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</main>
    </div>
  )
}

export default DashboardLayout
