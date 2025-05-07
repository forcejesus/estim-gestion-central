
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  useEffect(() => {
    if (user) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [navigate, user]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/20">
      <p>Redirection...</p>
    </div>
  );
};

export default Index;
