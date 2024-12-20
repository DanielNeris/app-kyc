import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import KYCForm from './pages/KYCForm'
import { ToastProvider } from './contexts/ToastContext'
import { PublicRoute } from './components/PublicRoute'
import { KYCProvider } from './contexts/KycContext'
import KYCDetails from './pages/KYCDetails'
import UserDashboard from './pages/UserDashboard'

const App = () => (
  <>
    <ToastProvider>
      <BrowserRouter>
        <AuthProvider>
          <KYCProvider>
            <Routes>
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                }
              />
              <Route
                path="/kyc"
                element={
                  <PublicRoute>
                    <KYCForm />
                  </PublicRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute requireAdmin>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/kyc/:id"
                element={
                  <ProtectedRoute requireAdmin>
                    <KYCDetails />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/user-profile"
                element={
                  <ProtectedRoute>
                    <UserDashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<Navigate to="/login" replace />} />
            </Routes>
          </KYCProvider>
        </AuthProvider>
      </BrowserRouter>
    </ToastProvider>
  </>
)

export default App
