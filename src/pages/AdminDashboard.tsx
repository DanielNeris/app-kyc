import { useCallback, useEffect, useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TablePagination,
} from '@/components/ui/table'
import { AlertCircle, CheckCircle, Users, XCircle } from 'lucide-react'
import { useKYC } from '@/hooks/use-kyc'
import { KYCStatus } from '@/components/enums/kycStatus'
import { useNavigate } from 'react-router-dom'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select'

const PAGE_SIZE = 10

const AdminDashboard = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('')

  const navigate = useNavigate()
  const { kycKpis, kycList, fetchKYCKpis, fetchKYCList } = useKYC()

  const fetchData = useCallback(async () => {
    await fetchKYCKpis()
    await fetchKYCList()
  }, [fetchKYCKpis, fetchKYCList])

  useEffect(() => {
    fetchData()
  }, [])

  const handleRowClick = (kycId: string) => {
    navigate(`/kyc/${kycId}`)
  }

  const filteredData = kycList.filter(kyc => {
    const matchesSearch =
      kyc.user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kyc.user.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus =
      filterStatus === 'all' || filterStatus === ''
        ? true
        : kyc.status === filterStatus

    return matchesSearch && matchesStatus
  })

  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE)
  const currentData = filteredData.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  )

  return (
    <DashboardLayout>
      <div className="space-y-6 p-4 min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <span className="text-sm text-gray-600">
            Last updated: {new Date().toLocaleString()}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white/80 backdrop-blur-md shadow-lg">
            <CardHeader>
              <CardTitle className="text-indigo-600 flex items-center gap-2">
                <Users className="h-5 w-5" />
                Total Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-800">
                {kycKpis.totalUsers}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-md shadow-lg">
            <CardHeader>
              <CardTitle className="text-yellow-600 flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Pending
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-800">
                {kycKpis.pending}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-md shadow-lg">
            <CardHeader>
              <CardTitle className="text-green-600 flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Approved
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-800">
                {kycKpis.approved}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-md shadow-lg">
            <CardHeader>
              <CardTitle className="text-red-600 flex items-center gap-2">
                <XCircle className="h-5 w-5" />
                Rejected
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-800">
                {kycKpis.rejected}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-4 mb-4 justify-end w-full">
          <Input
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <Select onValueChange={value => setFilterStatus(value)}>
            <SelectTrigger className="max-w-xs">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value={KYCStatus.PENDING}>Pending</SelectItem>
              <SelectItem value={KYCStatus.APPROVED}>Approved</SelectItem>
              <SelectItem value={KYCStatus.REJECTED}>Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="bg-white/90 backdrop-blur-md rounded-lg shadow-lg">
          <Table>
            <TableHeader>
              <TableRow className="bg-indigo-600 text-white">
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentData.map(kyc => (
                <TableRow
                  key={kyc.id}
                  onClick={() => handleRowClick(kyc.user.id)}
                  className="hover:bg-indigo-50 cursor-pointer"
                >
                  <TableCell className="font-medium">
                    {kyc.user.fullName}
                  </TableCell>
                  <TableCell>{kyc.user.email}</TableCell>
                  <TableCell>
                    {kyc.status === KYCStatus.PENDING && (
                      <span className="text-yellow-600 font-medium">
                        Pending
                      </span>
                    )}
                    {kyc.status === KYCStatus.APPROVED && (
                      <span className="text-green-600 font-medium">
                        Approved
                      </span>
                    )}
                    {kyc.status === KYCStatus.REJECTED && (
                      <span className="text-red-600 font-medium">Rejected</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </DashboardLayout>
  )
}

export default AdminDashboard
