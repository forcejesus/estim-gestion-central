
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import EstimLogo from "@/components/EstimLogo";

const Index = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  
  useEffect(() => {
    if (!isLoading) {
      if (user) {
        navigate("/");
      } else {
        navigate("/login");
      }
    }
  }, [navigate, user, isLoading]);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-estim-green/10 to-estim-yellow/10 animated-gradient">
      <div className="mb-6 animate-scale-up">
        <EstimLogo size={120} />
      </div>
      <h1 className="text-3xl font-bold text-estim-green animate-slide-up">ESTIM GESTION</h1>
      <p className="mt-2 text-muted-foreground animate-fade-in">Redirection en cours...</p>
      <div className="mt-8 animate-pulse">
        <div className="w-16 h-1 bg-estim-green rounded-full mx-auto"></div>
      </div>
    </div>
  );
};

export default Index;
