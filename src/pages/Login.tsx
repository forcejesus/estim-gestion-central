
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import EstimLogo from "@/components/EstimLogo";
import { Eye, EyeOff, LogIn, User, Lock } from "lucide-react";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { user, login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    try {
      setIsSubmitting(true);
      await login(email, password);
      toast.success("Connexion réussie");
    } catch (error) {
      toast.error("Email ou mot de passe incorrect");
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-zinc-100 dark:bg-zinc-900">
      {/* Desktop App Header */}
      <div className="h-10 bg-estim-green flex items-center px-4 shadow-md">
        <div className="w-3 h-3 rounded-full bg-red-500 mr-1.5"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500 mr-1.5"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="mx-auto text-white font-medium text-sm">ESTIM Gestion - Connexion</span>
      </div>
      
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden w-full max-w-4xl flex flex-col md:flex-row">
          {/* Logo Section */}
          <div className="w-full md:w-1/2 bg-estim-green p-10 flex flex-col items-center justify-center text-white">
            <div className="mb-8 flex flex-col items-center">
              <EstimLogo size={140} />
              <h1 className="text-3xl font-bold mt-6 text-center">ESTIM GESTION</h1>
              <p className="mt-2 text-center opacity-90 max-w-xs">
                Système de gestion intégré pour l'École Supérieure des Technologies de l'Informatique et du Management
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mt-8 w-full max-w-xs">
              <div className="bg-white/10 p-4 rounded-lg text-center">
                <h3 className="font-semibold">Étudiants</h3>
                <p className="text-2xl font-bold">324</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg text-center">
                <h3 className="font-semibold">Modules</h3>
                <p className="text-2xl font-bold">56</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg text-center">
                <h3 className="font-semibold">Enseignants</h3>
                <p className="text-2xl font-bold">42</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg text-center">
                <h3 className="font-semibold">Livres</h3>
                <p className="text-2xl font-bold">1256</p>
              </div>
            </div>
          </div>
          
          {/* Login Form */}
          <div className="w-full md:w-1/2 p-8 md:p-10">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Connexion</h2>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  Entrez vos identifiants pour accéder au système
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1">
                  <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <User size={18} className="text-gray-400" />
                    </div>
                    <Input
                      id="email"
                      type="email"
                      placeholder="exemple@estim.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="password" className="text-sm font-medium">Mot de passe</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Lock size={18} className="text-gray-400" />
                    </div>
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                
                <div className="pt-2">
                  <Button 
                    type="submit" 
                    className="w-full bg-estim-green hover:bg-estim-green/90 flex items-center justify-center gap-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Se connecter...
                      </div>
                    ) : (
                      <>
                        <LogIn size={18} />
                        Se connecter
                      </>
                    )}
                  </Button>
                </div>
              </form>
              
              <div className="border-t pt-4">
                <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-2">Comptes de démonstration</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm bg-gray-50 dark:bg-zinc-700/50 rounded-lg p-3">
                  <div className="text-center">
                    <p className="font-medium">Admin</p>
                    <p className="text-gray-500 dark:text-gray-400">admin@estim.edu</p>
                    <p className="text-gray-500 dark:text-gray-400">admin123</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium">Gestionnaire</p>
                    <p className="text-gray-500 dark:text-gray-400">gestionnaire@estim.edu</p>
                    <p className="text-gray-500 dark:text-gray-400">gest123</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium">Agent</p>
                    <p className="text-gray-500 dark:text-gray-400">agent@estim.edu</p>
                    <p className="text-gray-500 dark:text-gray-400">agent123</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
