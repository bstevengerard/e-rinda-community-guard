import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { 
  Shield, Users, Calendar, FileText, Clock, Award, 
  CheckCircle, ArrowRight, Star, ChevronRight, 
  MapPin, Phone, Briefcase, Eye
} from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import logo from "@/assets/erinda-logo.png";

const Index = () => {
  const features = [
    {
      icon: <Calendar className="w-7 h-7" />,
      title: "Gukurikirana Amahazo",
      description: "Kugenzura amahazo y'abanyerondo buri munsi no ku mezi yose ku buryo bworoshye.",
    },
    {
      icon: <FileText className="w-7 h-7" />,
      title: "Raporo z'Ibibazo",
      description: "Gutanga raporo z'ibibazo byose bibaye mu murimo n'amafoto.",
    },
    {
      icon: <Clock className="w-7 h-7" />,
      title: "Gusaba Ikiruhuko",
      description: "Gusaba no kwemeza ikiruhuko ku buryo bwihuse kandi bworoshye.",
    },
    {
      icon: <Users className="w-7 h-7" />,
      title: "Gucunga Abakozi",
      description: "Kumenya aho abanyerondo bakorera no gukorana neza.",
    },
    {
      icon: <Eye className="w-7 h-7" />,
      title: "Amatangazo",
      description: "Kubona amatangazo y'amasaha y'akazi no kumenya ukorera hehe.",
    },
    {
      icon: <Briefcase className="w-7 h-7" />,
      title: "Ubuyobozi",
      description: "Gutuma coordinators bacunga neza abanyerondo babo bose.",
    },
  ];

  const stats = [
    { value: "5,000+", label: "Abanyerondo", icon: <Users className="w-5 h-5" /> },
    { value: "30", label: "Uturere", icon: <MapPin className="w-5 h-5" /> },
    { value: "416", label: "Imirenge", icon: <Shield className="w-5 h-5" /> },
    { value: "24/7", label: "Umutekano", icon: <Clock className="w-5 h-5" /> },
  ];

  const roles = [
    {
      title: "Umunyerondo",
      description: "Kureba amahazo, gusaba ikiruhuko, no gutanga raporo z'ibibazo.",
      color: "bg-secondary/20 border-secondary/50",
    },
    {
      title: "Village Coordinator",
      description: "Gucunga abanyerondo b'umudugudu no kureba raporo zabo.",
      color: "bg-military/20 border-military/50",
    },
    {
      title: "Cell Coordinator",
      description: "Kwemeza amahazo, gucunga ikiruhuko, no kongeramo abakozi bashya.",
      color: "bg-primary/20 border-primary/50",
    },
    {
      title: "Sector Coordinator",
      description: "Gukora amatangazo no gucunga coordinators bose b'umurenge.",
      color: "bg-accent/20 border-accent/50",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBg})` }}
        >
          <div className="absolute inset-0 hero-gradient opacity-90" />
        </div>

        {/* Animated Patterns */}
        <div className="absolute inset-0 pattern-grid opacity-5" />
        <div className="absolute inset-0 pattern-dots opacity-5" />

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-military/10 rounded-full blur-3xl animate-float-slow" />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 pt-32 pb-20">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-accent/20 backdrop-blur-md border border-accent/30 rounded-full px-6 py-2.5 mb-8 animate-fade-in shadow-gold">
              <Shield className="w-4 h-4 text-accent" />
              <span className="text-accent text-sm font-semibold tracking-wide">Sisitemu y'Umutekano w'Umuryango</span>
            </div>

            {/* Logo */}
            <div className="flex justify-center mb-10 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="relative">
                <img 
                  src={logo} 
                  alt="E-Rinda Logo" 
                  className="h-36 w-36 object-contain drop-shadow-2xl animate-float"
                />
                <div className="absolute inset-0 bg-accent/20 rounded-full blur-2xl -z-10 animate-pulse-slow" />
              </div>
            </div>

            {/* Title */}
            <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-primary-foreground mb-6 animate-fade-in tracking-tight" style={{ animationDelay: '0.2s' }}>
              E-Rinda <span className="text-gradient-gold">MIS</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl lg:text-3xl text-primary-foreground/85 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in font-light" style={{ animationDelay: '0.3s' }}>
              Sisitemu igezweho yo gucunga abanyerondo mu Rwanda. 
              <span className="block mt-2 font-medium">Twubaka umutekano w'umuryango twese hamwe.</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Link to="/register">
                <Button variant="hero" size="xl" className="gap-3 min-w-[220px]">
                  Iyandikishe Ubu
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="xl" className="border-2 border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 hover:border-primary-foreground/60 min-w-[220px]">
                  Injira muri Konti
                </Button>
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex items-center justify-center gap-8 mt-12 animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <div className="flex items-center gap-2 text-primary-foreground/70">
                <CheckCircle className="w-5 h-5 text-accent" />
                <span className="text-sm">Byizewe n'abakoresha 5000+</span>
              </div>
              <div className="flex items-center gap-2 text-primary-foreground/70">
                <Shield className="w-5 h-5 text-accent" />
                <span className="text-sm">Sisitemu yoroshye</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-8 h-14 rounded-full border-2 border-primary-foreground/40 flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-accent rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 pattern-diagonal opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center animate-fade-in group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/20 text-accent mb-4 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300">
                  {stat.icon}
                </div>
                <p className="font-heading text-4xl md:text-5xl font-bold text-accent mb-2">
                  {stat.value}
                </p>
                <p className="text-primary-foreground/80 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background relative">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-20">
            <span className="inline-flex items-center gap-2 px-5 py-2 bg-accent/15 text-accent rounded-full text-sm font-semibold mb-6">
              <Star className="w-4 h-4" />
              Ibyiza Byacu
            </span>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Serivisi <span className="text-gradient">Zikomeye</span>
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
              E-Rinda MIS itanga serivisi zose zikenewe mu gucunga umutekano w'umuryango ku buryo bwiza
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group card-interactive p-8 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center text-accent mb-6 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300 shadow-soft">
                  {feature.icon}
                </div>
                <h3 className="font-heading font-bold text-xl text-foreground mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section className="py-24 bg-muted/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-5 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6">
              <Users className="w-4 h-4" />
              Uruhare rw'Abakoresha
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
              Buri Wese Afite <span className="text-gradient">Uruhare Rwe</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              E-Rinda MIS ifasha buri mukoresha gukora akazi ke ku buryo bwiza
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roles.map((role, index) => (
              <div 
                key={index}
                className={`p-6 rounded-2xl border-2 ${role.color} hover-lift backdrop-blur-sm animate-fade-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="font-heading font-bold text-lg text-foreground mb-3">{role.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{role.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div className="order-2 lg:order-1">
              <span className="inline-flex items-center gap-2 px-5 py-2 bg-accent/15 text-accent rounded-full text-sm font-semibold mb-6">
                <Shield className="w-4 h-4" />
                Abo Turibo
              </span>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                Twubaka Umutekano <span className="text-gradient">w'Umuryango</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                E-Rinda MIS ni sisitemu igezweho yateguwe kubera abanyerondo b'u Rwanda. 
                Tuzana uburyo bushya bwo gukurikirana, gucunga no gutanga raporo ku murimo 
                w'umutekano w'umuryango ku buryo bworoshye kandi bwizewe.
              </p>

              <ul className="space-y-4 mb-10">
                {[
                  "Gukurikirana amahazo ku buryo bworoshye",
                  "Gutanga raporo z'ibibazo byihutirwa hamwe n'amafoto",
                  "Gusaba no kwemeza ikiruhuko vuba",
                  "Kumenya abakozi bakorera mu gace kanyu",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-4 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-accent" />
                    </div>
                    <span className="text-foreground font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              <Link to="/register">
                <Button variant="gold" size="lg" className="gap-3">
                  Tangira Ubu
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>

            {/* Visual */}
            <div className="relative order-1 lg:order-2">
              <div className="relative rounded-3xl overflow-hidden shadow-xl">
                <img 
                  src={heroBg} 
                  alt="Abanyerondo" 
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/20 to-transparent" />
              </div>
              
              {/* Floating Card */}
              <div className="absolute -bottom-8 -left-8 bg-card p-6 rounded-2xl shadow-xl border border-border max-w-xs animate-float-slow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center shadow-gold">
                    <Award className="w-7 h-7 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-foreground text-lg">Sisitemu Ikomeye</p>
                    <p className="text-sm text-muted-foreground">Yizewe n'abakoresha benshi</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground font-medium">5.0</span>
                </div>
              </div>

              {/* Stats Card */}
              <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground p-5 rounded-2xl shadow-xl">
                <p className="font-heading text-3xl font-bold text-accent">5K+</p>
                <p className="text-sm text-primary-foreground/80">Abakoresha</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 pattern-grid opacity-5" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-military/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
              Witeguye <span className="text-gradient-gold">Gutangira?</span>
            </h2>
            <p className="text-xl md:text-2xl text-primary-foreground/80 mb-12 leading-relaxed">
              Iyandikishe ubu kugirango winjire muri sisitemu ya E-Rinda MIS utangire gukora ku buryo bwiza.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register">
                <Button variant="hero" size="xl" className="gap-3 min-w-[220px]">
                  Iyandikishe Gratis
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="xl" className="border-2 border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 min-w-[220px]">
                  <Phone className="w-5 h-5 mr-2" />
                  Twandikire
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;