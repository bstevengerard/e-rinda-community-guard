import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Shield, UserPlus, ChevronDown } from "lucide-react";
import logo from "@/assets/erinda-logo.png";
import heroBg from "@/assets/hero-bg.jpg";

const DISTRICTS = ["Kicukiro", "Nyarugenge", "Gasabo"];
const ROLES = ["UMUNYERONDO", "COORDINATOR"];

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    idNumber: "",
    dateOfBirth: "",
    role: "",
    telephone: "",
    district: "",
    sector: "",
    cell: "",
    village: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Ikosa",
        description: "Amagambo y'ibanga ntabwo ahura",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate registration - In production, this would connect to Lovable Cloud
    setTimeout(() => {
      toast({
        title: "Kwiyandikisha Byagenze Neza!",
        description: "Konti yawe yaremwe. Injira ubu.",
      });
      navigate("/login");
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div 
        className="hidden lg:flex lg:w-2/5 relative bg-cover bg-center sticky top-0 h-screen"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 hero-gradient opacity-90" />
        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12">
          <img 
            src={logo} 
            alt="E-Rinda Logo" 
            className="h-28 w-28 object-contain mb-6 animate-float"
          />
          <h1 className="font-heading text-4xl font-bold text-primary-foreground mb-4 text-center">
            E-Rinda MIS
          </h1>
          <p className="text-primary-foreground/80 text-center max-w-sm">
            Iyandikishe kugirango winjire muri sisitemu yo gucunga umutekano w'umuryango
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-3/5 bg-background py-8 px-4 sm:px-8 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          {/* Mobile Logo */}
          <div className="flex flex-col items-center mb-6 lg:hidden">
            <img 
              src={logo} 
              alt="E-Rinda Logo" 
              className="h-16 w-16 object-contain mb-3"
            />
            <h1 className="font-heading text-2xl font-bold text-primary">E-Rinda MIS</h1>
          </div>

          {/* Form Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/20 mb-4">
              <UserPlus className="w-7 h-7 text-accent" />
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Iyandikishe Konti Nshya
            </h2>
            <p className="text-muted-foreground text-sm">
              Uzuza amakuru akurikira kugirango wiyandikishe
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="font-heading font-semibold text-foreground border-b border-border pb-2">
                Amakuru y'Umuntu
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-foreground font-medium">
                    Amazina Yombi
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="Andika amazina yawe yombi"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* ID Number */}
                <div className="space-y-2">
                  <Label htmlFor="idNumber" className="text-foreground font-medium">
                    Irangamuntu
                  </Label>
                  <Input
                    id="idNumber"
                    name="idNumber"
                    type="text"
                    placeholder="1199880012345678"
                    maxLength={16}
                    value={formData.idNumber}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Date of Birth */}
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth" className="text-foreground font-medium">
                    Itariki y'Amavuko
                  </Label>
                  <Input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Telephone */}
                <div className="space-y-2">
                  <Label htmlFor="telephone" className="text-foreground font-medium">
                    Nimero ya Telefone
                  </Label>
                  <Input
                    id="telephone"
                    name="telephone"
                    type="tel"
                    placeholder="0788123456"
                    value={formData.telephone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Role Selection */}
            <div className="space-y-4">
              <h3 className="font-heading font-semibold text-foreground border-b border-border pb-2">
                Uruhare mu Murimo
              </h3>
              
              <div className="space-y-2">
                <Label htmlFor="role" className="text-foreground font-medium">
                  Role
                </Label>
                <div className="relative">
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                    className="flex h-12 w-full rounded-lg border-2 border-border bg-card px-4 py-3 text-base appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary hover:border-primary/50 transition-all duration-200"
                  >
                    <option value="">Hitamo uruhare</option>
                    {ROLES.map((role) => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Location Information */}
            <div className="space-y-4">
              <h3 className="font-heading font-semibold text-foreground border-b border-border pb-2">
                Aho Ukorera
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* District */}
                <div className="space-y-2">
                  <Label htmlFor="district" className="text-foreground font-medium">
                    Akarere
                  </Label>
                  <div className="relative">
                    <select
                      id="district"
                      name="district"
                      value={formData.district}
                      onChange={handleChange}
                      required
                      className="flex h-12 w-full rounded-lg border-2 border-border bg-card px-4 py-3 text-base appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary hover:border-primary/50 transition-all duration-200"
                    >
                      <option value="">Hitamo akarere</option>
                      {DISTRICTS.map((district) => (
                        <option key={district} value={district}>{district}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                  </div>
                </div>

                {/* Sector */}
                <div className="space-y-2">
                  <Label htmlFor="sector" className="text-foreground font-medium">
                    Umurenge
                  </Label>
                  <Input
                    id="sector"
                    name="sector"
                    type="text"
                    placeholder="Andika umurenge"
                    value={formData.sector}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Cell */}
                <div className="space-y-2">
                  <Label htmlFor="cell" className="text-foreground font-medium">
                    Akagali
                  </Label>
                  <Input
                    id="cell"
                    name="cell"
                    type="text"
                    placeholder="Andika akagali"
                    value={formData.cell}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Village */}
                <div className="space-y-2">
                  <Label htmlFor="village" className="text-foreground font-medium">
                    Umudugudu
                  </Label>
                  <Input
                    id="village"
                    name="village"
                    type="text"
                    placeholder="Andika umudugudu"
                    value={formData.village}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Password Section */}
            <div className="space-y-4">
              <h3 className="font-heading font-semibold text-foreground border-b border-border pb-2">
                Ijambo ry'Ibanga
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-foreground font-medium">
                    Ijambo ry'Ibanga
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
                      minLength={6}
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

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-foreground font-medium">
                    Emeza Ijambo ry'Ibanga
                  </Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Andika ijambo ry'ibanga"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    minLength={6}
                  />
                </div>
              </div>
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
                  Iyandikisha...
                </span>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  Iyandikishe
                </>
              )}
            </Button>
          </form>

          {/* Login Link */}
          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              Usanzwe ufite konti?{" "}
              <Link to="/login" className="text-accent font-semibold hover:underline">
                Injira hano
              </Link>
            </p>
          </div>

          {/* Back to Home */}
          <div className="mt-6 text-center pb-8">
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

export default Register;
