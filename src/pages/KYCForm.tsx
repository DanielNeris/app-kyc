import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle, XCircle } from "lucide-react";

const formSchema = z.object({
  fullName: z.string().min(3, "Nome completo é obrigatório"),
  email: z.string().email("Email inválido"),
  document: z.instanceof(File).optional(),
});

type FormData = z.infer<typeof formSchema>;

const KYCForm = () => {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      // Mock API call - replace with actual API integration
      console.log("Form submitted:", data);
      toast({
        title: "KYC Enviado",
        description: "Seus documentos foram enviados para análise.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Ocorreu um erro ao enviar o KYC.",
      });
    }
  };

  // Mock status - replace with actual API data
  const kycStatus = "PENDING"; // Can be: PENDING, APPROVED, REJECTED
  const adminRemarks = ""; // Only shown when status is REJECTED

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto p-4 space-y-6 animate-fade-in">
        <Card>
          <CardHeader>
            <CardTitle>Envio de Documentos KYC</CardTitle>
          </CardHeader>
          <CardContent>
            {kycStatus && (
              <div className="mb-6">
                <div className="flex items-center gap-2 p-4 rounded-lg bg-gray-50">
                  {kycStatus === "PENDING" && (
                    <>
                      <AlertCircle className="text-warning" />
                      <span>Em análise</span>
                    </>
                  )}
                  {kycStatus === "APPROVED" && (
                    <>
                      <CheckCircle className="text-success" />
                      <span>Aprovado</span>
                    </>
                  )}
                  {kycStatus === "REJECTED" && (
                    <>
                      <XCircle className="text-error" />
                      <div>
                        <span>Rejeitado</span>
                        {adminRemarks && (
                          <p className="text-sm text-gray-600 mt-1">{adminRemarks}</p>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Nome Completo
                </label>
                <input
                  {...register("fullName")}
                  className="w-full p-2 border rounded-md"
                  placeholder="Digite seu nome completo"
                />
                {errors.fullName && (
                  <p className="text-sm text-error mt-1">{errors.fullName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  {...register("email")}
                  type="email"
                  className="w-full p-2 border rounded-md"
                  placeholder="Digite seu email"
                />
                {errors.email && (
                  <p className="text-sm text-error mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Documento
                </label>
                <div className="flex gap-4">
                  <input
                    {...register("document")}
                    type="file"
                    accept="image/*,.pdf"
                    className="w-full p-2 border rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      // Implement camera capture functionality
                      console.log("Open camera");
                    }}
                    className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80"
                  >
                    Câmera
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/80"
              >
                Enviar
              </button>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default KYCForm;