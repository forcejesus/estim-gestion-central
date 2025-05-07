
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
    <div className="min-h-screen flex items-stretch bg-white">
      {/* Colonne gauche avec couleur d'arrière-plan et texte de bienvenue */}
      <div className="hidden md:flex md:w-1/3 lg:w-2/5 bg-estim-green flex-col justify-between p-10 text-white">
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center gap-3">
            <EstimLogo size={40} className="bg-white rounded-full p-1" />
            <h2 className="text-xl font-bold">ESTIM GESTION</h2>
          </div>
          
          <div className="space-y-4 mt-16 animate-slide-up">
            <h1 className="text-4xl font-bold">Bienvenue</h1>
            <p className="opacity-90">
              au portail de gestion de l'École Supérieure des Technologies de l'Informatique et du Management
            </p>
          </div>
        </div>

        <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
          {/* Logo illustration */}
          <div className="flex justify-center">
            <div className="grid grid-cols-2 gap-2 w-48 h-48 opacity-80">
              <div className="border-2 border-white/30 rounded-lg flex items-center justify-center">
                <svg className="w-10 h-10 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div className="border-2 border-white/30 rounded-lg flex items-center justify-center">
                <svg className="w-10 h-10 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
              <div className="border-2 border-white/30 rounded-lg flex items-center justify-center">
                <svg className="w-10 h-10 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <div className="border-2 border-white/30 rounded-lg flex items-center justify-center">
                <svg className="w-10 h-10 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          <p className="text-sm text-white/70 mt-6 text-center">
            Un système de gestion complet basé sur React
          </p>
        </div>
      </div>

      {/* Colonne droite avec le formulaire de connexion */}
      <div className="w-full md:w-2/3 lg:w-3/5 flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md animate-scale-up">
          <div className="mb-8 text-center md:text-left">
            <div className="md:hidden mb-6">
              <div className="flex items-center justify-center gap-3">
                <EstimLogo size={35} />
                <h2 className="text-lg font-bold text-estim-green">ESTIM GESTION</h2>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Connexion</h1>
            <p className="text-gray-600">
              Email: admin@estim.edu | Mot de passe: admin123
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">* Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="exemple@estim.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-gray-300 focus:border-estim-green focus:ring-estim-green/20 rounded-md"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">* Mot de passe</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-gray-300 focus:border-estim-green focus:ring-estim-green/20 rounded-md"
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

            <Button 
              type="submit" 
              className="w-full bg-estim-green hover:bg-estim-green/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Se connecter...
                </span>
              ) : "Se connecter"}
            </Button>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>Utilisateurs de démonstration:</p>
              <div className="mt-1 p-2 bg-estim-black/5 rounded-md">
                <p className="text-estim-black/70">admin@estim.edu / admin123</p>
                <p className="text-estim-black/70">gestionnaire@estim.edu / gest123</p>
                <p className="text-estim-black/70">agent@estim.edu / agent123</p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
