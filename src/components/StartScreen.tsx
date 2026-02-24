import { useEffect } from "react";
import logo from "figma:asset/c4070c3b71508581008ad50cb65e0420447654b0.png";

interface StartScreenProps {
  onComplete: () => void;
}

export function StartScreen({ onComplete }: StartScreenProps) {
  useEffect(() => {
    // Auto-navigate to login after 2 seconds
    const timer = setTimeout(() => {
      onComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="h-full flex items-center justify-center bg-gradient-to-b from-background to-secondary/30 px-6">
      <div className="w-full max-w-sm flex items-center justify-center">
        <img 
          src={logo} 
          alt="réntahán - Community's Shared Garage" 
          className="w-full h-auto max-w-xs object-contain"
        />
      </div>
    </div>
  );
}
