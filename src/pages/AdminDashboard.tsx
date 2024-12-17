import React from "react";
import DashboardLayout from "../components/DashboardLayout";
import { Card } from "@/components/ui/card";

const AdminDashboard = () => {
  // Mock data - will be replaced with real data later
  const stats = {
    total: 150,
    pending: 45,
    approved: 89,
    rejected: 16,
  };

  return (
    <DashboardLayout>
      <div className="animate-slide-in">
        <h1 className="text-2xl font-bold text-text-primary mb-6">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4">
            <p className="text-sm text-gray-600">Total Users</p>
            <p className="text-2xl font-bold text-text-primary">{stats.total}</p>
          </Card>
          
          <Card className="p-4">
            <p className="text-sm text-gray-600">Pending</p>
            <p className="text-2xl font-bold text-warning">{stats.pending}</p>
          </Card>
          
          <Card className="p-4">
            <p className="text-sm text-gray-600">Approved</p>
            <p className="text-2xl font-bold text-success">{stats.approved}</p>
          </Card>
          
          <Card className="p-4">
            <p className="text-sm text-gray-600">Rejected</p>
            <p className="text-2xl font-bold text-error">{stats.rejected}</p>
          </Card>
        </div>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Recent KYC Submissions</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Name</th>
                  <th className="text-left py-3 px-4">Email</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4">John Doe</td>
                  <td className="py-3 px-4">john@example.com</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 rounded-full text-xs bg-warning/20 text-warning">
                      Pending
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-primary hover:text-primary/80 mr-2">
                      Review
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;