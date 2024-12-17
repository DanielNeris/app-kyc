## **Frontend - KYC System**

### **Overview:**
This project is a frontend for a KYC (Know Your Customer) system that allows users to submit their KYC details and admins to manage the KYC process. It includes a dashboard with KPIs for admins to monitor the KYC statuses, and user pages to manage their information and document uploads.

### **Features:**
- **User Authentication:**
  - Login and registration for users and admins
  - Role-based access control (Admin, User)
  
- **KYC Management:**
  - Users can submit their KYC details and upload ID documents
  - Users can see the status of their KYC (pending, approved, rejected)
  - Admins can approve/reject KYC submissions
  
- **Admin Dashboard:**
  - View all users' KYC status in a table format
  - See KPIs like total users, approved, rejected, and pending submissions
  - Apply filters to search and filter KYC statuses

### **Setup Instructions:**

1. **Clone the repository:**
   ```bash
   git clone https://github.com/danielneris/app-kyc-api.git
   cd app-kyc
   ```

2. **Install dependencies:**
  Install the required dependencies using npm or yarn:


3. **Environment variables:**
  Create a `.env` file in the root of the project and define the following variables:
   Update the `.env` file with your configuration:
   ```env
    VITE_API_URL=http://localhost:3333
   ```

4. **Start the development server:**
  This will start the development server at `http://localhost:5173`.

### **Assumptions:**
- This application assumes the backend API is running and accessible at the URL specified in the `.env` file.
- Admins and users have separate login credentials, and the system uses JWT tokens for authentication.
- The KYC statuses are updated through the backend API and shown accordingly in the frontend.

### **Trade-offs:**
- The frontend uses Vue 3 for its reactivity and component structure.
- For simplicity, we used a basic form validation approach on the client side.
- We have used Radix UI for the select component and TailwindCSS for styling, focusing on flexibility and responsiveness.
- The dashboard is a simple table with filters, and the user page is a form with file uploads.