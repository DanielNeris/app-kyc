import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useToast } from '@/hooks/use-toast'
import { AlertCircle, CheckCircle, Users, XCircle } from 'lucide-react'

type KYCStatus = 'PENDING' | 'APPROVED' | 'REJECTED'

interface KYCData {
  id: number
  fullName: string
  email: string
  status: KYCStatus
  remarks: string
}

const mockKYCs: KYCData[] = [
  {
    id: 1,
    fullName: 'João Silva',
    email: 'joao@example.com',
    status: 'PENDING',
    remarks: '',
  },
  {
    id: 2,
    fullName: 'Maria Santos',
    email: 'maria@example.com',
    status: 'APPROVED',
    remarks: '',
  },
]

const AdminDashboard = () => {
  const toast = useToast()
  const [remarks, setRemarks] = useState('')

  const stats = {
    total: mockKYCs.length,
    pending: mockKYCs.filter(kyc => kyc.status === 'PENDING').length,
    approved: mockKYCs.filter(kyc => kyc.status === 'APPROVED').length,
    rejected: mockKYCs.filter(kyc => kyc.status === 'REJECTED').length,
  }

  const handleStatusChange = async (id: number, newStatus: KYCStatus) => {
    try {
      console.log(`Changing status for KYC ${id} to ${newStatus}`)
      console.log('Remarks:', remarks)

      toast.success({
        title: 'Status Atualizado',
        description: 'O status do KYC foi atualizado com sucesso.',
      })

      setRemarks('')
    } catch (error) {
      toast.error({
        title: 'Erro',
        description: 'Ocorreu um erro ao atualizar o status.',
      })
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 p-4 animate-fade-in max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Admin</h1>
          <span className="text-sm text-gray-500">
            Última atualização: {new Date().toLocaleString()}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Usuários
              </CardTitle>
              <Users className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-gray-500 mt-1">Usuários registrados</p>
            </CardContent>
          </Card>

          <Card className="bg-white hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
              <AlertCircle className="h-5 w-5 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pending}</div>
              <p className="text-xs text-gray-500 mt-1">Aguardando análise</p>
            </CardContent>
          </Card>

          <Card className="bg-white hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Aprovados</CardTitle>
              <CheckCircle className="h-5 w-5 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.approved}</div>
              <p className="text-xs text-gray-500 mt-1">KYCs aprovados</p>
            </CardContent>
          </Card>

          <Card className="bg-white hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rejeitados</CardTitle>
              <XCircle className="h-5 w-5 text-error" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.rejected}</div>
              <p className="text-xs text-gray-500 mt-1">KYCs rejeitados</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-xl">Submissões KYC</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold">Nome</TableHead>
                    <TableHead className="font-semibold">Email</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockKYCs.map(kyc => (
                    <TableRow key={kyc.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">
                        {kyc.fullName}
                      </TableCell>
                      <TableCell>{kyc.email}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {kyc.status === 'PENDING' && (
                            <span className="flex items-center gap-1 text-warning">
                              <AlertCircle className="h-4 w-4" />
                              <span className="text-sm">Pendente</span>
                            </span>
                          )}
                          {kyc.status === 'APPROVED' && (
                            <span className="flex items-center gap-1 text-success">
                              <CheckCircle className="h-4 w-4" />
                              <span className="text-sm">Aprovado</span>
                            </span>
                          )}
                          {kyc.status === 'REJECTED' && (
                            <span className="flex items-center gap-1 text-error">
                              <XCircle className="h-4 w-4" />
                              <span className="text-sm">Rejeitado</span>
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {kyc.status === 'PENDING' && (
                          <div className="flex flex-col gap-2">
                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={() =>
                                  handleStatusChange(kyc.id, 'APPROVED')
                                }
                                className="px-3 py-1 bg-success text-white rounded-md hover:bg-success/80 text-sm font-medium transition-colors"
                              >
                                Aprovar
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  handleStatusChange(kyc.id, 'REJECTED')
                                }
                                className="px-3 py-1 bg-error text-white rounded-md hover:bg-error/80 text-sm font-medium transition-colors"
                              >
                                Rejeitar
                              </button>
                            </div>
                            <textarea
                              placeholder="Observações (opcional)"
                              className="w-full p-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                              value={remarks}
                              onChange={e => setRemarks(e.target.value)}
                              rows={2}
                            />
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

export default AdminDashboard
