import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LayoutDashboard, Lock, ArrowRight } from "lucide-react";
import { showSuccess, showError } from "../utils/toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      localStorage.setItem("isAuthenticated", "true");
      showSuccess("Welcome back!");
      navigate("/");
    } else {
      showError("Please enter both email and password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-3xl" />
      
      <Card className="w-full max-w-md border-none shadow-2xl bg-white/80 backdrop-blur-xl relative z-10">
        <CardHeader className="space-y-2 text-center pt-8">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary rounded-2xl shadow-lg shadow-primary/30 rotate-3 hover:rotate-0 transition-transform duration-300">
              <LayoutDashboard className="w-10 h-10 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-extrabold tracking-tight text-slate-900">
            Campaign Tracker
          </CardTitle>
          <CardDescription className="text-slate-500 text-base">
            Sign in to manage your marketing universe
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-8">
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold text-slate-700">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="admin@example.com" 
                className="h-12 bg-slate-50/50 border-slate-200 focus:ring-primary/20 rounded-xl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-semibold text-slate-700">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••"
                className="h-12 bg-slate-50/50 border-slate-200 focus:ring-primary/20 rounded-xl"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
            <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-lg shadow-primary/20 transition-all hover:translate-y-[-1px] active:translate-y-[1px]">
              <Lock className="w-4 h-4 mr-2" />
              Sign In
              <ArrowRight className="w-4 h-4 ml-auto" />
            </Button>
          </form>
          <div className="mt-8 p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Demo Access</p>
            <p className="text-sm text-slate-600">Use any email and password to explore</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;