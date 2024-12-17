import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';

const KYCForm = () => {
  return (
    <DashboardLayout>
      <div className="animate-slide-in">
        <h1 className="text-2xl font-bold text-text-primary mb-6">KYC Form</h1>
        {/* KYC form will be implemented in the next step */}
        <p className="text-gray-600">KYC form coming soon...</p>
      </div>
    </DashboardLayout>
  );
};

export default KYCForm;