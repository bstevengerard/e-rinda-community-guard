import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Eye, EyeOff, Shield, LogIn, ArrowLeft, Lock, User } from "lucide-react";
import logo from "@/assets/erinda-logo.png";
import heroBg from "@/assets/hero-bg.jpg";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();
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

    try {
      await login(formData);
      toast({
        title: "Kwinjira Byagenze Neza!",
        description: "Murakaza neza muri E-Rinda MIS",
      });
      navigate("/dashboard");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Amazina cyangwa ijambo ry'ibanga sibyo";

      toast({
        title: "Ikosa",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div 
        className="hidden lg:flex lg:w-1/2 relative bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 hero-gradient opacity-90" />
        <div className="absolute inset-0 pattern-grid opacity-5" />
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-military/10 rounded-full blur-3xl animate-float-slow" />
        
        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12">
          <div className="relative mb-10">
            <img 
              src={logo} 
              alt="E-Rinda Logo" 
              className="h-36 w-36 object-contain drop-shadow-2xl animate-float"
            />
            <div className="absolute inset-0 bg-accent/20 rounded-full blur-2xl -z-10 animate-pulse-slow" />
          </div>
          
          <h1 className="font-heading text-5xl md:text-6xl font-black text-primary-foreground mb-4 text-center tracking-tight">
            E-Rinda <span className="text-gradient-gold">MIS</span>
          </h1>
          <p className="text-primary-foreground/80 text-lg text-center max-w-md leading-relaxed">
            Sisitemu y'uburyo bwiza bwo gukurikirana no gucunga abanyerondo mu Rwanda
          </p>
          
          {/* Features list */}
          <div className="mt-12 space-y-4 text-primary-foreground/70">
            {[
              "Gukurikirana amahazo",
              "Gusaba ikiruhuko",
              "Gutanga raporo z'ibibazo"
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 bg-background relative overflow-hidden">
        {/* Background patterns */}
        <div className="absolute inset-0 pattern-dots opacity-30" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        
        <div className="w-full max-w-md relative z-10">
          {/* Back button */}
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Subira Ahabanza</span>
          </Link>

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
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 mb-6 shadow-soft">
              <LogIn className="w-10 h-10 text-accent" />
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
              Injira muri <span className="text-gradient">Konti</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Uzuza amazina n'ijambo ry'ibanga kugirango winjire
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-foreground font-semibold flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" />
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
                className="h-14 text-base"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground font-semibold flex items-center gap-2">
                <Lock className="w-4 h-4 text-muted-foreground" />
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
                  className="h-14 text-base pr-14"
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <Link 
                to="/forgot-password" 
                className="text-sm text-accent hover:text-accent/80 font-medium transition-colors"
              >
                Wibagiwe ijambo ry'ibanga?
              </Link>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              variant="hero" 
              className="w-full h-14 text-lg" 
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-3">
                  <span className="w-5 h-5 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                  Injira...
                </span>
              ) : (
                <span className="flex items-center gap-3">
                  <LogIn className="w-5 h-5" />
                  Injira
                </span>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-background text-muted-foreground">Cyangwa</span>
            </div>
          </div>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-muted-foreground text-lg">
              Ntabwo ufite konti?{" "}
              <Link to="/register" className="text-accent font-bold hover:underline transition-colors">
                Iyandikishe hano
              </Link>
            </p>
          </div>

          {/* Security badge */}
          <div className="mt-10 flex items-center justify-center gap-2 text-muted-foreground">
            <Shield className="w-4 h-4" />
            <span className="text-xs">Amakuru yawe arinzwe neza</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;