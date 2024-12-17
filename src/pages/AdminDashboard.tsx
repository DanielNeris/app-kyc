import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, CheckCircle, Users, XCircle } from "lucide-react";

// Mock data - replace with actual API data
const mockKYCs = [
  {
    id: 1,
    fullName: "João Silva",
    email: "joao@example.com",
    status: "PENDING",
    remarks: "",
  },
  {
    id: 2,
    fullName: "Maria Santos",
    email: "maria@example.com",
    status: "APPROVED",
    remarks: "",
  },
];

const AdminDashboard = () => {
  const { toast } = useToast();
  const [remarks, setRemarks] = useState("");

  // Mock stats - replace with actual API data
  const stats = {
    total: mockKYCs.length,
    pending: mockKYCs.filter((kyc) => kyc.status === "PENDING").length,
    approved: mockKYCs.filter((kyc) => kyc.status === "APPROVED").length,
    rejected: mockKYCs.filter((kyc) => kyc.status === "REJECTED").length,
  };

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      // Mock API call - replace with actual API integration
      console.log(`Changing status for KYC ${id} to ${newStatus}`);
      console.log("Remarks:", remarks);
      
      toast({
        title: "Status Atualizado",
        description: "O status do KYC foi atualizado com sucesso.",
      });
      
      setRemarks("");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Ocorreu um erro ao atualizar o status.",
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 p-4 animate-fade-in">
        <h1 className="text-2xl font-bold">Dashboard Admin</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Usuários</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
              <AlertCircle className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pending}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Aprovados</CardTitle>
              <CheckCircle className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.approved}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rejeitados</CardTitle>
              <XCircle className="h-4 w-4 text-error" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.rejected}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Submissões KYC</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockKYCs.map((kyc) => (
                  <TableRow key={kyc.id}>
                    <TableCell>{kyc.fullName}</TableCell>
                    <TableCell>{kyc.email}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {kyc.status === "PENDING" && (
                          <span className="flex items-center gap-1 text-warning">
                            <AlertCircle className="h-4 w-4" />
                            Pendente
                          </span>
                        )}
                        {kyc.status === "APPROVED" && (
                          <span className="flex items-center gap-1 text-success">
                            <CheckCircle className="h-4 w-4" />
                            Aprovado
                          </span>
                        )}
                        {kyc.status === "REJECTED" && (
                          <span className="flex items-center gap-1 text-error">
                            <XCircle className="h-4 w-4" />
                            Rejeitado
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {kyc.status === "PENDING" && (
                        <div className="flex flex-col gap-2">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleStatusChange(kyc.id, "APPROVED")}
                              className="px-2 py-1 bg-success text-white rounded-md hover:bg-success/80 text-sm"
                            >
                              Aprovar
                            </button>
                            <button
                              onClick={() => handleStatusChange(kyc.id, "REJECTED")}
                              className="px-2 py-1 bg-error text-white rounded-md hover:bg-error/80 text-sm"
                            >
                              Rejeitar
                            </button>
                          </div>
                          <textarea
                            placeholder="Observações (opcional)"
                            className="w-full p-2 text-sm border rounded-md"
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                          />
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;