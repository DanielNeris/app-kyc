import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import AuthLayout from "../components/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <AuthLayout 
      title="Welcome Back" 
      subtitle="Enter your credentials to continue"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full"
          />
        </div>
        <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
          Sign In
        </Button>
      </form>
    </AuthLayout>
  );
};

export default Login;