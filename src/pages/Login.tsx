import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Shield, LogIn } from "lucide-react";
import logo from "@/assets/erinda-logo.png";
import heroBg from "@/assets/hero-bg.jpg";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login - In production, this would connect to Lovable Cloud
    setTimeout(() => {
      if (formData.username && formData.password) {
        toast({
          title: "Kwinjira Byagenze Neza!",
          description: "Murakaza neza muri E-Rinda MIS",
        });
        // Navigate to dashboard based on role (placeholder)
        navigate("/dashboard");
      } else {
        toast({
          title: "Ikosa",
          description: "Uzuza amazina n'ijambo ry'ibanga",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div 
        className="hidden lg:flex lg:w-1/2 relative bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 hero-gradient opacity-90" />
        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12">
          <img 
            src={logo} 
            alt="E-Rinda Logo" 
            className="h-32 w-32 object-contain mb-8 animate-float"
          />
          <h1 className="font-heading text-5xl font-bold text-primary-foreground mb-4 text-center">
            E-Rinda MIS
          </h1>
          <p className="text-primary-foreground/80 text-lg text-center max-w-md">
            Sisitemu y'uburyo bwiza bwo gukurikirana no gucunga abanyerondo mu Rwanda
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="flex flex-col items-center mb-8 lg:hidden">
            <img 
              src={logo} 
              alt="E-Rinda Logo" 
              className="h-20 w-20 object-contain mb-4"
            />
            <h1 className="font-heading text-3xl font-bold text-primary">E-Rinda MIS</h1>
          </div>

          {/* Form Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/20 mb-4">
              <LogIn className="w-8 h-8 text-accent" />
            </div>
            <h2 className="font-heading text-3xl font-bold text-foreground mb-2">
              Injira muri Konti
            </h2>
            <p className="text-muted-foreground">
              Uzuza amazina n'ijambo ry'ibanga kugirango winjire
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-foreground font-medium">
                Amazina (Username)
              </Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Andika amazina yawe"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground font-medium">
                Ijambo ry'Ibanga (Password)
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Andika ijambo ry'ibanga"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <Link 
                to="/forgot-password" 
                className="text-sm text-accent hover:underline"
              >
                Wibagiwe ijambo ry'ibanga?
              </Link>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              variant="hero" 
              className="w-full" 
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                  Injira...
                </span>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Injira
                </>
              )}
            </Button>
          </form>

          {/* Register Link */}
          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              Ntabwo ufite konti?{" "}
              <Link to="/register" className="text-accent font-semibold hover:underline">
                Iyandikishe hano
              </Link>
            </p>
          </div>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <Link 
              to="/" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2"
            >
              <Shield className="w-4 h-4" />
              Subira ku Rupapuro rw'Ibanze
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
