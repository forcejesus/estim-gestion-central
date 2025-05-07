
import React from "react";

interface EstimLogoProps {
  className?: string;
  size?: number;
}

const EstimLogo: React.FC<EstimLogoProps> = ({ className, size = 80 }) => {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <div className="absolute inset-0 flex items-center justify-center">
        <img 
          src="/lovable-uploads/5c48a4ad-c19c-4861-b1cf-ec40b5f9ebfd.png" 
          alt="ESTIM Logo" 
          width={size} 
          height={size}
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default EstimLogo;
