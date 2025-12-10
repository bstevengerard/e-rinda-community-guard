import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Calendar,
  FileText,
  Clock,
  Users,
  Bell,
  LogOut,
  Menu,
  X,
  Home,
  User,
  Settings,
  ChevronRight,
  Shield,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";
import logo from "@/assets/erinda-logo.png";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    toast({
      title: "Gusohoka Byagenze Neza",
      description: "Murakoze gukoresha E-Rinda MIS",
    });
    navigate("/login");
  };

  const menuItems = [
    { icon: <Home className="w-5 h-5" />, label: "Ahabanza", href: "/dashboard", active: true },
    { icon: <Calendar className="w-5 h-5" />, label: "Amahazo", href: "/dashboard/attendance" },
    { icon: <Clock className="w-5 h-5" />, label: "Ikiruhuko", href: "/dashboard/leave" },
    { icon: <FileText className="w-5 h-5" />, label: "Raporo", href: "/dashboard/reports" },
    { icon: <Users className="w-5 h-5" />, label: "Abakozi", href: "/dashboard/staff" },
    { icon: <Bell className="w-5 h-5" />, label: "Amatangazo", href: "/dashboard/announcements" },
    { icon: <User className="w-5 h-5" />, label: "Porofayile", href: "/dashboard/profile" },
    { icon: <Settings className="w-5 h-5" />, label: "Igenamiterere", href: "/dashboard/settings" },
  ];

  const stats = [
    { 
      icon: <Calendar className="w-6 h-6" />, 
      value: "22", 
      label: "Iminsi Yakoze", 
      color: "bg-accent/20 text-accent" 
    },
    { 
      icon: <Clock className="w-6 h-6" />, 
      value: "3", 
      label: "Ikiruhuko Cyasabwe", 
      color: "bg-secondary/50 text-secondary-foreground" 
    },
    { 
      icon: <FileText className="w-6 h-6" />, 
      value: "5", 
      label: "Raporo Zatanzwe", 
      color: "bg-military/20 text-military" 
    },
    { 
      icon: <CheckCircle className="w-6 h-6" />, 
      value: "95%", 
      label: "Amahazo", 
      color: "bg-primary/20 text-primary" 
    },
  ];

  const recentActivities = [
    { title: "Ihazo ry'uyu munsi ryemejwe", time: "Hashize amasaha 2", status: "success" },
    { title: "Ikiruhuko cyasabwe", time: "Hashize umunsi 1", status: "pending" },
    { title: "Raporo y'ikibazo yatanzwe", time: "Hashize iminsi 2", status: "success" },
    { title: "Itangazo rishya ryashyizwe", time: "Hashize iminsi 3", status: "info" },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-sidebar transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <img src={logo} alt="E-Rinda Logo" className="h-10 w-10 object-contain" />
            <div>
              <h1 className="font-heading font-bold text-lg text-sidebar-foreground">E-Rinda</h1>
              <p className="text-xs text-sidebar-foreground/60">MIS Dashboard</p>
            </div>
          </div>
          <button
            className="lg:hidden text-sidebar-foreground"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* User Info */}
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-sidebar-accent flex items-center justify-center">
              <User className="w-6 h-6 text-sidebar-foreground" />
            </div>
            <div>
              <p className="font-medium text-sidebar-foreground">Jean UWIMANA</p>
              <p className="text-sm text-sidebar-foreground/60">UMUNYERONDO</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                item.active
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
              {item.active && <ChevronRight className="w-4 h-4 ml-auto" />}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-sidebar-border">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sidebar-foreground/80 hover:bg-destructive/20 hover:text-destructive transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Gusohoka</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-72">
        {/* Top Header */}
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                className="lg:hidden text-foreground"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h1 className="font-heading font-bold text-xl text-foreground">Murakaza Neza</h1>
                <p className="text-sm text-muted-foreground">Ukwezi kwa Ukuboza, 2024</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 rounded-full hover:bg-muted transition-colors">
                <Bell className="w-5 h-5 text-foreground" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
              </button>
              <div className="hidden sm:flex items-center gap-3 pl-4 border-l border-border">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                  <Shield className="w-5 h-5 text-accent-foreground" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-6 border border-border hover:shadow-md transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center mb-4`}>
                  {stat.icon}
                </div>
                <p className="font-heading text-3xl font-bold text-foreground mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Main Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Calendar Preview */}
            <div className="lg:col-span-2 bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading font-semibold text-lg text-foreground">
                  Amahazo y'Ukwezi
                </h2>
                <Link to="/dashboard/attendance">
                  <Button variant="ghost" size="sm" className="gap-2">
                    Reba Byose
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
              
              {/* Simple Calendar Grid */}
              <div className="grid grid-cols-7 gap-2 text-center">
                {["Ku", "Mb", "Gt", "Ka", "Ga", "Gat", "Cyu"].map((day) => (
                  <div key={day} className="text-xs font-medium text-muted-foreground py-2">
                    {day}
                  </div>
                ))}
                {[...Array(31)].map((_, i) => {
                  const isWorked = i < 22;
                  const isLeave = i === 15 || i === 16;
                  return (
                    <div
                      key={i}
                      className={`aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition-colors ${
                        isLeave
                          ? "bg-secondary text-secondary-foreground"
                          : isWorked
                          ? "bg-accent/20 text-accent"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {i + 1}
                    </div>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="flex items-center gap-6 mt-6 pt-4 border-t border-border">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-accent/20" />
                  <span className="text-sm text-muted-foreground">Yakoze</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-secondary" />
                  <span className="text-sm text-muted-foreground">Ikiruhuko</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-muted" />
                  <span className="text-sm text-muted-foreground">Ntiyakoze</span>
                </div>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <h2 className="font-heading font-semibold text-lg text-foreground mb-6">
                Ibikorwa Biheruka
              </h2>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        activity.status === "success"
                          ? "bg-accent/20 text-accent"
                          : activity.status === "pending"
                          ? "bg-secondary text-secondary-foreground"
                          : "bg-primary/20 text-primary"
                      }`}
                    >
                      {activity.status === "success" ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : activity.status === "pending" ? (
                        <Clock className="w-4 h-4" />
                      ) : (
                        <Bell className="w-4 h-4" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {activity.title}
                      </p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <Link to="/dashboard/attendance">
              <div className="bg-card rounded-xl p-6 border border-border hover:border-accent hover:shadow-md transition-all duration-300 text-center group">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent group-hover:text-accent-foreground transition-all">
                  <Calendar className="w-7 h-7 text-accent group-hover:text-accent-foreground" />
                </div>
                <p className="font-medium text-foreground">Amahazo</p>
              </div>
            </Link>
            <Link to="/dashboard/leave">
              <div className="bg-card rounded-xl p-6 border border-border hover:border-accent hover:shadow-md transition-all duration-300 text-center group">
                <div className="w-14 h-14 rounded-xl bg-secondary/50 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent group-hover:text-accent-foreground transition-all">
                  <Clock className="w-7 h-7 text-secondary-foreground group-hover:text-accent-foreground" />
                </div>
                <p className="font-medium text-foreground">Saba Ikiruhuko</p>
              </div>
            </Link>
            <Link to="/dashboard/reports">
              <div className="bg-card rounded-xl p-6 border border-border hover:border-accent hover:shadow-md transition-all duration-300 text-center group">
                <div className="w-14 h-14 rounded-xl bg-military/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent group-hover:text-accent-foreground transition-all">
                  <FileText className="w-7 h-7 text-military group-hover:text-accent-foreground" />
                </div>
                <p className="font-medium text-foreground">Tanga Raporo</p>
              </div>
            </Link>
            <Link to="/dashboard/staff">
              <div className="bg-card rounded-xl p-6 border border-border hover:border-accent hover:shadow-md transition-all duration-300 text-center group">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent group-hover:text-accent-foreground transition-all">
                  <Users className="w-7 h-7 text-primary group-hover:text-accent-foreground" />
                </div>
                <p className="font-medium text-foreground">Abakozi</p>
              </div>
            </Link>
          </div>
        </main>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-dark/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
