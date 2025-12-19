import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { apiService } from "@/lib/api";
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
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  const userRole = user?.role || "UMUNYERONDO";

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await apiService.getDashboardData();
        setDashboardData(data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        toast({
          title: "Ikosa",
          description: "Ntibishoboka kubona amakuru ya dashboard",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [toast]);

  const handleLogout = () => {
    logout();
    toast({
      title: "Gusohoka Byagenze Neza",
      description: "Murakoze gukoresha E-Rinda MIS",
    });
    navigate("/login");
  };

  // Role-based menu items
  const getMenuItems = () => {
    const baseItems = [
      { icon: <Home className="w-5 h-5" />, label: "Ahabanza", href: "/dashboard", active: true },
      { icon: <Calendar className="w-5 h-5" />, label: "Amahazo", href: "/dashboard/attendance" },
      { icon: <Clock className="w-5 h-5" />, label: "Ikiruhuko", href: "/dashboard/leave" },
      {icon: <FileText className="w-5 h-5" />, label: "Raporo", href: "/reports" },
      { icon: <Bell className="w-5 h-5" />, label: "Amatangazo", href: "/dashboard/announcements" },
      { icon: <User className="w-5 h-5" />, label: "Porofayile", href: "/dashboard/profile" },
      { icon: <Settings className="w-5 h-5" />, label: "Igenamiterere", href: "/dashboard/settings" },
    ];

    // Add Staff management for coordinators and above
    if (["VILLAGE_COORDINATOR", "CELL_COORDINATOR", "SECTOR_COORDINATOR", "SUPER_ADMIN"].includes(userRole)) {
      baseItems.splice(4, 0, { icon: <Users className="w-5 h-5" />, label: "Abakozi", href: "/dashboard/staff" });
    }

    return baseItems;
  };

  const menuItems = getMenuItems();

  // Role-based stats
  const getStats = () => {
    const baseStats = [
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

    // Add coordinator-specific stats
    if (["VILLAGE_COORDINATOR", "CELL_COORDINATOR", "SECTOR_COORDINATOR", "SUPER_ADMIN"].includes(userRole)) {
      baseStats.splice(2, 0, {
        icon: <Users className="w-6 h-6" />,
        value: "12",
        label: "Abakozi Bafite",
        color: "bg-primary/20 text-primary"
      });
      baseStats.splice(3, 0, {
        icon: <AlertTriangle className="w-6 h-6" />,
        value: "3",
        label: "Ikiruhuko Cyitezwe",
        color: "bg-destructive/20 text-destructive"
      });
      // Remove one stat to keep it to 4
      baseStats.pop();
    }

    return baseStats;
  };

  const stats = getStats();

  const recentActivities = dashboardData?.recent_activities || [];

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
              <p className="font-medium text-sidebar-foreground">{user?.username || "User"}</p>
              <p className="text-sm text-sidebar-foreground/60">{user?.role || "UMUNYERONDO"}</p>
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
          {loading ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading dashboard data...</p>
              </div>
            </div>
          ) : (
            <>
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
                  const dayNumber = i + 1;
                  const attendanceRecord = dashboardData?.calendar_data?.find(
                    (record) => new Date(record.date).getDate() === dayNumber
                  );
                  const status = attendanceRecord?.status || "absent";
                  const isWorked = status === "present";
                  const isLeave = status === "leave";

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
                      {dayNumber}
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
            <Link to="/reports">
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
            </>
          )}
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
