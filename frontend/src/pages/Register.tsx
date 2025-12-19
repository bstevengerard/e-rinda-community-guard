import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Eye, EyeOff, Shield, UserPlus, ChevronDown, ArrowLeft,
  User, Mail, CreditCard, Calendar, Phone, MapPin, Lock, CheckCircle
} from "lucide-react";
import logo from "@/assets/erinda-logo.png";
import heroBg from "@/assets/hero-bg.jpg";

const DISTRICTS = ["Kicukiro", "Nyarugenge", "Gasabo"];
const ROLES = [
  { value: "UMUNYERONDO", label: "Umunyerondo" },
  { value: "VILLAGE_COORDINATOR", label: "Village Coordinator" },
  { value: "CELL_COORDINATOR", label: "Cell Coordinator" },
  { value: "SECTOR_COORDINATOR", label: "Sector Coordinator" },
];

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { register } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
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

    try {
      await register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        full_name: formData.fullName,
        national_id: formData.idNumber,
        date_of_birth: formData.dateOfBirth,
        phone_number: formData.telephone,
        role: formData.role,
        district: formData.district,
        sector: formData.sector,
        cell: formData.cell,
        village: formData.village,
      });

      toast({
        title: "Kwiyandikisha Byagenze Neza!",
        description: "Konti yawe yaremwe. Urakaza neza.",
      });
      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "Ikosa",
        description: error.message || "Hari ikosa ryabaye. Ongera ugerageze.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const steps = [
    { number: 1, title: "Amakuru y'Umuntu", icon: <User className="w-4 h-4" /> },
    { number: 2, title: "Aho Ukorera", icon: <MapPin className="w-4 h-4" /> },
    { number: 3, title: "Ijambo ry'Ibanga", icon: <Lock className="w-4 h-4" /> },
  ];

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div 
        className="hidden lg:flex lg:w-2/5 relative bg-cover bg-center sticky top-0 h-screen"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 hero-gradient opacity-90" />
        <div className="absolute inset-0 pattern-grid opacity-5" />
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-48 h-48 bg-accent/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-military/10 rounded-full blur-3xl animate-float-slow" />
        
        <div className="relative z-10 flex flex-col items-center justify-center w-full p-10">
          <div className="relative mb-8">
            <img 
              src={logo} 
              alt="E-Rinda Logo" 
              className="h-28 w-28 object-contain drop-shadow-2xl animate-float"
            />
            <div className="absolute inset-0 bg-accent/20 rounded-full blur-2xl -z-10 animate-pulse-slow" />
          </div>
          
          <h1 className="font-heading text-4xl md:text-5xl font-black text-primary-foreground mb-4 text-center tracking-tight">
            E-Rinda <span className="text-gradient-gold">MIS</span>
          </h1>
          <p className="text-primary-foreground/80 text-center max-w-sm mb-10">
            Iyandikishe kugirango winjire muri sisitemu yo gucunga umutekano w'umuryango
          </p>

          {/* Progress Steps */}
          <div className="w-full max-w-xs">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center mb-4 last:mb-0">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold transition-all duration-300 ${
                  currentStep >= step.number 
                    ? 'bg-accent text-accent-foreground shadow-gold' 
                    : 'bg-primary-foreground/20 text-primary-foreground/60'
                }`}>
                  {currentStep > step.number ? <CheckCircle className="w-5 h-5" /> : step.number}
                </div>
                <div className="ml-4 flex-1">
                  <p className={`font-medium text-sm ${
                    currentStep >= step.number ? 'text-primary-foreground' : 'text-primary-foreground/60'
                  }`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`absolute left-5 mt-12 w-0.5 h-4 transition-colors ${
                    currentStep > step.number ? 'bg-accent' : 'bg-primary-foreground/20'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-3/5 bg-background py-8 px-4 sm:px-8 overflow-y-auto relative">
        <div className="absolute inset-0 pattern-dots opacity-20" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        
        <div className="max-w-2xl mx-auto relative z-10">
          {/* Back button */}
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Subira Ahabanza</span>
          </Link>

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
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 mb-4 shadow-soft">
              <UserPlus className="w-8 h-8 text-accent" />
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Iyandikishe <span className="text-gradient">Konti Nshya</span>
            </h2>
            <p className="text-muted-foreground">
              Intambwe ya {currentStep} muri 3 • {steps[currentStep - 1].title}
            </p>
          </div>

          {/* Mobile Steps Indicator */}
          <div className="flex items-center justify-center gap-2 mb-8 lg:hidden">
            {steps.map((step) => (
              <div 
                key={step.number}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentStep >= step.number ? 'bg-accent w-8' : 'bg-muted'
                }`}
              />
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-5 animate-fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground font-semibold flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      Imeyili (Email)
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="example@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Full Name */}
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-foreground font-semibold">
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
                    <Label htmlFor="idNumber" className="text-foreground font-semibold flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-muted-foreground" />
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
                    <Label htmlFor="dateOfBirth" className="text-foreground font-semibold flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
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
                    <Label htmlFor="telephone" className="text-foreground font-semibold flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
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

                {/* Role Selection */}
                <div className="space-y-2">
                  <Label htmlFor="role" className="text-foreground font-semibold">
                    Uruhare mu Murimo (Role)
                  </Label>
                  <div className="relative">
                    <select
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      required
                      className="flex h-12 w-full rounded-xl border-2 border-border bg-background px-4 py-3 text-base appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary hover:border-primary/50 transition-all duration-200"
                    >
                      <option value="">Hitamo uruhare</option>
                      {ROLES.map((role) => (
                        <option key={role.value} value={role.value}>{role.label}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Location Information */}
            {currentStep === 2 && (
              <div className="space-y-5 animate-fade-in">
                <div className="p-4 rounded-xl bg-accent/10 border border-accent/20 mb-6">
                  <p className="text-sm text-accent-foreground flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Andika aho ukorera neza kugirango tukubone vuba
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* District */}
                  <div className="space-y-2">
                    <Label htmlFor="district" className="text-foreground font-semibold">
                      Akarere
                    </Label>
                    <div className="relative">
                      <select
                        id="district"
                        name="district"
                        value={formData.district}
                        onChange={handleChange}
                        required
                        className="flex h-12 w-full rounded-xl border-2 border-border bg-background px-4 py-3 text-base appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary hover:border-primary/50 transition-all duration-200"
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
                    <Label htmlFor="sector" className="text-foreground font-semibold">
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
                    <Label htmlFor="cell" className="text-foreground font-semibold">
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
                    <Label htmlFor="village" className="text-foreground font-semibold">
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
            )}

            {/* Step 3: Password */}
            {currentStep === 3 && (
              <div className="space-y-5 animate-fade-in">
                <div className="p-4 rounded-xl bg-military/10 border border-military/20 mb-6">
                  <p className="text-sm text-foreground flex items-center gap-2">
                    <Shield className="w-4 h-4 text-military" />
                    Ijambo ry'ibanga rigomba kuba rifite nibura inyuguti 6
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Password */}
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-foreground font-semibold flex items-center gap-2">
                      <Lock className="w-4 h-4 text-muted-foreground" />
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
                        className="pr-12"
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
                    <Label htmlFor="confirmPassword" className="text-foreground font-semibold">
                      Emeza Ijambo ry'Ibanga
                    </Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Emeza ijambo ry'ibanga"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      minLength={6}
                    />
                  </div>
                </div>

                {/* Password match indicator */}
                {formData.password && formData.confirmPassword && (
                  <div className={`p-3 rounded-lg flex items-center gap-2 ${
                    formData.password === formData.confirmPassword 
                      ? 'bg-success/10 text-success' 
                      : 'bg-destructive/10 text-destructive'
                  }`}>
                    {formData.password === formData.confirmPassword ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">Amagambo y'ibanga arahura</span>
                      </>
                    ) : (
                      <>
                        <Shield className="w-4 h-4" />
                        <span className="text-sm font-medium">Amagambo y'ibanga ntabwo ahura</span>
                      </>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-border">
              {currentStep > 1 ? (
                <Button type="button" variant="outline" onClick={prevStep} className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Inyuma
                </Button>
              ) : (
                <div />
              )}

              {currentStep < 3 ? (
                <Button type="button" variant="gold" onClick={nextStep} className="gap-2">
                  Komeza
                  <ChevronDown className="w-4 h-4 -rotate-90" />
                </Button>
              ) : (
                <Button 
                  type="submit" 
                  variant="hero" 
                  className="gap-2 min-w-[180px]"
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
              )}
            </div>
          </form>

          {/* Login Link */}
          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              Usanzwe ufite konti?{" "}
              <Link to="/login" className="text-accent font-bold hover:underline">
                Injira hano
              </Link>
            </p>
          </div>

          {/* Security badge */}
          <div className="mt-8 flex items-center justify-center gap-2 text-muted-foreground pb-8">
            <Shield className="w-4 h-4" />
            <span className="text-xs">Amakuru yawe arinzwe neza</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;