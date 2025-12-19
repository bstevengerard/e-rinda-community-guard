import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { 
  Shield, Users, Calendar, FileText, Clock, Award, 
  CheckCircle, ArrowRight, Star, ChevronRight 
} from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import logo from "@/assets/erinda-logo.png";

const Index = () => {
  const features = [
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Gukurikirana Amahazo",
      description: "Kugenzura amahazo y'abanyerondo buri munsi no ku mezi yose.",
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Raporo z'Ibibazo",
      description: "Gutanga raporo z'ibibazo byose bibaye mu murimo.",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Gusaba Ikiruhuko",
      description: "Gusaba no kwemeza ikiruhuko ku buryo bworoshye.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Gucunga Abakozi",
      description: "Kumenya aho abanyerondo bakorera no ku buryo bwiza.",
    },
  ];

  const stats = [
    { value: "5,000+", label: "Abanyerondo" },
    { value: "30", label: "Uturere" },
    { value: "416", label: "Imirenge" },
    { value: "24/7", label: "Umutekano" },
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
          <div className="absolute inset-0 hero-gradient opacity-85" />
        </div>

        {/* Pattern Overlay */}
        <div className="absolute inset-0 pattern-grid opacity-10" />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 pt-32 pb-20">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-accent/20 backdrop-blur-sm border border-accent/30 rounded-full px-5 py-2 mb-8 animate-fade-in">
              <Shield className="w-4 h-4 text-accent" />
              <span className="text-accent text-sm font-medium">Sisitemu y'Umutekano w'Umuryango</span>
            </div>

            {/* Logo */}
            <div className="flex justify-center mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <img 
                src={logo} 
                alt="E-Rinda Logo" 
                className="h-32 w-32 object-contain drop-shadow-2xl animate-float"
              />
            </div>

            {/* Title */}
            <h1 className="font-heading text-5xl md:text-7xl font-bold text-primary-foreground mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              E-Rinda MIS
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.3s' }}>
              Sisitemu igezweho yo gucunga abanyerondo mu Rwanda. 
              Twubaka umutekano w'umuryango twese hamwe.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Link to="/register">
                <Button variant="hero" size="xl" className="gap-2">
                  Iyandikishe Ubu
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="xl" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                  Injira muri Konti
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-accent rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <p className="font-heading text-4xl md:text-5xl font-bold text-accent mb-2">
                  {stat.value}
                </p>
                <p className="text-primary-foreground/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background relative">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-accent/20 text-accent rounded-full text-sm font-medium mb-4">
              Ibyiza Byacu
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              Serivisi Zikomeye
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              E-Rinda MIS itanga serivisi zose zikenewe mu gucunga umutekano w'umuryango
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-card border border-border hover:border-accent/50 hover:shadow-lg transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-6 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="font-heading font-semibold text-xl text-foreground mb-3">
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

      {/* About Section */}
      <section className="py-24 bg-muted/50 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div>
              <span className="inline-block px-4 py-1 bg-accent/20 text-accent rounded-full text-sm font-medium mb-4">
                Abo Turibo
              </span>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
                Twubaka Umutekano w'Umuryango
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                E-Rinda MIS ni sisitemu igezweho yateguwe kubera abanyerondo b'u Rwanda. 
                Tuzana uburyo bushya bwo gukurikirana, gucunga no gutanga raporo ku murimo 
                w'umutekano w'umuryango.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  "Gukurikirana amahazo ku buryo bworoshye",
                  "Gutanga raporo z'ibibazo byihutirwa",
                  "Gusaba no kwemeza ikiruhuko",
                  "Kumenya abakozi bakorera mu gace kanyu",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>

              <Link to="/register">
                <Button variant="gold" size="lg" className="gap-2">
                  Tangira Ubu
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>

            {/* Visual */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={heroBg} 
                  alt="Abanyerondo" 
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
              </div>
              {/* Floating Card */}
              <div className="absolute -bottom-8 -left-8 bg-card p-6 rounded-xl shadow-xl border border-border max-w-xs">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                    <Award className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-foreground">Sisitemu Ikomeye</p>
                    <p className="text-sm text-muted-foreground">Yizewe n'abakoresha</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 pattern-grid opacity-10" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Witeguye Gutangira?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
            Iyandikishe ubu kugirango winjire muri sisitemu ya E-Rinda MIS utangire gukora.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register">
              <Button variant="hero" size="xl" className="gap-2">
                Iyandikishe Gratis
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="xl" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                Twandikire
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
