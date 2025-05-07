
import React from "react";

interface EstimLogoProps {
  className?: string;
  size?: number;
}

const EstimLogo: React.FC<EstimLogoProps> = ({ className, size = 80 }) => {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Cercle extérieur */}
          <circle cx="50" cy="50" r="48" fill="#212121" stroke="#FFEB3B" strokeWidth="4" />
          
          {/* Lettre E stylisée */}
          <path
            d="M30 30H70M30 50H60M30 70H70"
            stroke="#4CAF50"
            strokeWidth="8"
            strokeLinecap="round"
          />
          
          {/* Point sur le S */}
          <circle cx="50" cy="30" r="6" fill="#FFEB3B" />
          <circle cx="50" cy="70" r="6" fill="#FFEB3B" />
          
          {/* Lettres ESTIM au bas du logo */}
          <text
            x="50"
            y="94"
            fontFamily="Arial, sans-serif"
            fontSize="12"
            fontWeight="bold"
            fill="#FFFFFF"
            textAnchor="middle"
          >
            ESTIM
          </text>
        </svg>
      </div>
    </div>
  );
};

export default EstimLogo;
