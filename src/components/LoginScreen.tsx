import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Mail, Phone } from "lucide-react";
import logo from "figma:asset/c4070c3b71508581008ad50cb65e0420447654b0.png";

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  return (
    <div className="flex flex-col items-center justify-between h-full px-6 py-12 bg-gradient-to-b from-background to-secondary/30">
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-sm">
        <div className="text-center mb-12">
          <img src={logo} alt="réntahán - Community's Shared Garage" className="w-48 h-48 mx-auto" />
        </div>

        <div className="w-full space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Email address"
              className="h-12 bg-white border-border rounded-xl"
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder="Password"
              className="h-12 bg-white border-border rounded-xl"
            />
          </div>
          <Button
            onClick={onLogin}
            className="w-full h-12 bg-primary hover:bg-primary/90 rounded-xl shadow-sm"
          >
            Sign In
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-background text-muted-foreground">or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={onLogin}
              className="h-12 rounded-xl border-border bg-white"
            >
              <Mail className="mr-2 h-4 w-4" />
              Google
            </Button>
            <Button
              variant="outline"
              onClick={onLogin}
              className="h-12 rounded-xl border-border bg-white"
            >
              <Phone className="mr-2 h-4 w-4" />
              Phone
            </Button>
          </div>

          <p className="text-center text-muted-foreground mt-6">
            Don't have an account?{" "}
            <button onClick={onLogin} className="text-primary">
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}