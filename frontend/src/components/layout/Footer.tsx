import { Link } from "react-router-dom";
import { Shield, Phone, Mail, MapPin, Facebook, Twitter, Youtube } from "lucide-react";
import logo from "@/assets/erinda-logo.png";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src={logo} 
                alt="E-Rinda MIS Logo" 
                className="h-14 w-14 object-contain"
              />
              <div>
                <h3 className="font-heading font-bold text-2xl">E-Rinda</h3>
                <p className="text-sm text-primary-foreground/70">Management Information System</p>
              </div>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Sisitemu y'uburyo bwiza bwo gukurikirana no gucunga abanyerondo mu Rwanda. 
              Twubaka umutekano w'umuryango.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">Amahuza Yihuse</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Ahabanza
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Abo Turibo
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Serivisi Zacu
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Twandikire
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">Serivisi</h4>
            <ul className="space-y-3">
              <li className="text-primary-foreground/80">Gukurikirana Amahazo</li>
              <li className="text-primary-foreground/80">Gusaba Ikiruhuko</li>
              <li className="text-primary-foreground/80">Raporo y'Ibibazo</li>
              <li className="text-primary-foreground/80">Itangazo ry'Amasaha</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">Twandikire</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-primary-foreground/80">
                <MapPin size={18} className="text-accent flex-shrink-0" />
                <span>Kigali, Rwanda</span>
              </li>
              <li className="flex items-center gap-3 text-primary-foreground/80">
                <Phone size={18} className="text-accent flex-shrink-0" />
                <span>+250 788 123 456</span>
              </li>
              <li className="flex items-center gap-3 text-primary-foreground/80">
                <Mail size={18} className="text-accent flex-shrink-0" />
                <span>info@erinda.rw</span>
              </li>
            </ul>
            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-6">
              <a href="#" className="p-2 bg-primary-foreground/10 rounded-full hover:bg-accent hover:text-accent-foreground transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" className="p-2 bg-primary-foreground/10 rounded-full hover:bg-accent hover:text-accent-foreground transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="p-2 bg-primary-foreground/10 rounded-full hover:bg-accent hover:text-accent-foreground transition-all">
                <Youtube size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-primary-foreground/60 text-sm">
            © {new Date().getFullYear()} E-Rinda MIS. Uburenganzira bwose burarinzwe.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-primary-foreground/60 hover:text-accent text-sm transition-colors">
              Amabwiriza y'Ibanga
            </Link>
            <Link to="/terms" className="text-primary-foreground/60 hover:text-accent text-sm transition-colors">
              Amategeko
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
