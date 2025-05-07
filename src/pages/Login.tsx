
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import EstimLogo from "@/components/EstimLogo";
import { Eye, EyeOff } from "lucide-react";

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
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-estim-green/10 to-estim-yellow/10">
      {/* Éléments décoratifs animés */}
      <div className="absolute pointer-events-none inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-40 h-40 rounded-full bg-estim-green/20 animate-float" style={{ animationDelay: "0s" }} />
        <div className="absolute bottom-20 right-20 w-32 h-32 rounded-full bg-estim-yellow/20 animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-estim-green/10 animate-float" style={{ animationDelay: "1s" }} />
      </div>

      <div className="w-full max-w-md px-4 z-10 relative">
        <div className="text-center mb-8 animate-slide-up">
          <div className="mx-auto mb-5 animate-scale-up">
            <EstimLogo size={100} className="mx-auto" />
          </div>
          <h1 className="text-3xl font-bold text-estim-green">ESTIM GESTION</h1>
          <p className="text-muted-foreground mt-2">
            Portail de gestion scolaire
          </p>
        </div>

        <Card className="animate-fade-in border border-estim-green/20 shadow-lg shadow-estim-green/5">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Connexion</CardTitle>
            <CardDescription className="text-center">
              Entrez vos identifiants pour accéder au système
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="exemple@estim.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="transition-all duration-200 focus:border-estim-green focus:ring-estim-green/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">Mot de passe</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="transition-all duration-200 focus:border-estim-green focus:ring-estim-green/20 pr-10"
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
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full bg-estim-green hover:bg-estim-green/90 text-white transition-all duration-300 hover:shadow-md" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Connexion en cours...
                  </span>
                ) : "Se connecter"}
              </Button>
            </CardFooter>
          </form>
        </Card>
        
        <div className="mt-6 text-center text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <p>Utilisateurs de démonstration:</p>
          <div className="mt-1 p-2 bg-estim-black/5 rounded-md">
            <p className="text-estim-black/70">admin@estim.edu / admin123</p>
            <p className="text-estim-black/70">gestionnaire@estim.edu / gest123</p>
            <p className="text-estim-black/70">agent@estim.edu / agent123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
