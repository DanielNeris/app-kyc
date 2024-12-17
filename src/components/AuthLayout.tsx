interface AuthLayoutProps {
  children: React.ReactNode
  title: string
  subtitle?: string
}

const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 animate-fade-in">
        <h1 className="text-3xl font-bold text-center text-text-primary mb-2">
          {title}
        </h1>
        {subtitle && (
          <p className="text-center text-gray-600 mb-6">{subtitle}</p>
        )}
        {children}
      </div>
    </div>
  )
}

export default AuthLayout
