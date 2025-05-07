
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-100 dark:bg-zinc-900">
      <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-10 max-w-md flex flex-col items-center">
        <div className="mb-8 animate-scale-up">
          <EstimLogo size={150} />
        </div>
        <h1 className="text-3xl font-bold text-estim-green animate-slide-up">ESTIM GESTION</h1>
        <p className="mt-4 text-muted-foreground animate-fade-in">Redirection en cours...</p>
        <div className="mt-8 w-full max-w-xs bg-gray-200 h-2 rounded-full overflow-hidden">
          <div className="bg-estim-green h-full animate-pulse" style={{width: '60%'}}></div>
        </div>
      </div>
    </div>
  );
};

export default Index;
