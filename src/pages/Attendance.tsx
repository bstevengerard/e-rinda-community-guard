import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { apiService } from "@/lib/api";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Home,
  Loader2,
} from "lucide-react";
import logo from "@/assets/erinda-logo.png";

interface AttendanceData {
  [key: number]: {
    status: string;
    hours: number;
    check_in_time?: string;
    check_out_time?: string;
    notes?: string;
  };
}

interface StaffMember {
  user_id: string;
  username: string;
  full_name: string;
  attendance: AttendanceData;
}

const Attendance = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [attendanceData, setAttendanceData] = useState<AttendanceData>({});
  const [staffAttendance, setStaffAttendance] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [staffLoading, setStaffLoading] = useState(false);

  const userRole = user?.role || "UMUNYERONDO";

  // Fetch attendance data for current user
  useEffect(() => {
    const fetchAttendanceData = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const data = await apiService.getMonthlyAttendance(
          user.id,
          currentMonth.getFullYear(),
          currentMonth.getMonth() + 1
        );
        setAttendanceData(data);
      } catch (error) {
        console.error('Failed to fetch attendance data:', error);
        toast({
          title: "Ikosa",
          description: "Ntibishobotse kubona amahazo yawe",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, [currentMonth, user, toast]);

  // Fetch staff attendance data for coordinators
  useEffect(() => {
    const fetchStaffAttendance = async () => {
      if (!user || !["CELL_COORDINATOR", "VILLAGE_COORDINATOR", "SECTOR_COORDINATOR", "SUPER_ADMIN"].includes(userRole)) {
        return;
      }

      try {
        setStaffLoading(true);
        const data = await apiService.getStaffMonthlyAttendance(
          currentMonth.getFullYear(),
          currentMonth.getMonth() + 1
        );
        setStaffAttendance(data);
      } catch (error) {
        console.error('Failed to fetch staff attendance:', error);
        toast({
          title: "Ikosa",
          description: "Ntibishobotse kubona amahazo y'abakozi",
          variant: "destructive",
        });
      } finally {
        setStaffLoading(false);
      }
    };

    fetchStaffAttendance();
  }, [currentMonth, user, userRole, toast]);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    return days;
  };

  const getAttendanceStatus = (day: number) => {
    return attendanceData[day];
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "present":
        return "bg-accent/20 text-accent border-accent/30";
      case "absent":
        return "bg-destructive/20 text-destructive border-destructive/30";
      case "leave":
        return "bg-secondary text-secondary-foreground border-secondary";
      default:
        return "bg-muted text-muted-foreground border-muted";
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case "present":
        return <CheckCircle className="w-3 h-3" />;
      case "absent":
        return <XCircle className="w-3 h-3" />;
      case "leave":
        return <Clock className="w-3 h-3" />;
      default:
        return null;
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const handleAttendanceUpdate = async (staffId: string, day: number, status: string) => {
    try {
      const attendanceDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);

      const attendanceData = {
        user_id: staffId,
        date: attendanceDate.toISOString().split('T')[0], // YYYY-MM-DD format
        status: status,
        shift: "day",
        approved_by: user?.id,
      };

      await apiService.createAttendance(attendanceData);

      toast({
        title: "Byemejwe",
        description: `Ihazo ry'umunsi wa ${day} ryavuguruwe`,
      });

      // Refresh staff attendance data
      const data = await apiService.getStaffMonthlyAttendance(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + 1
      );
      setStaffAttendance(data);

    } catch (error) {
      console.error('Failed to update attendance:', error);
      toast({
        title: "Ikosa",
        description: "Ntibishobotse kuvugurura ihazo",
        variant: "destructive",
      });
    }
  };

  const monthNames = [
    "Mutarama", "Gashyantare", "Werurwe", "Mata", "Gicurasi", "Kamena",
    "Nyakanga", "Kanama", "Nzeli", "Ukwakira", "Ugushyingo", "Ukuboza"
  ];

  const daysOfWeek = ["Kuwambere", "Kuwa kabiri", "Kuwa Gatatu", "Kuwa Kane", "Kuwa Gatanu", "Kuwa Gatandatu", "Ku Cyumweru"];

  const totalPresent = Object.values(attendanceData).filter(day => day.status === "present").length;
  const totalAbsent = Object.values(attendanceData).filter(day => day.status === "absent").length;
  const totalLeave = Object.values(attendanceData).filter(day => day.status === "leave").length;
  const totalDays = Object.keys(attendanceData).length;
  const attendancePercentage = totalDays > 0 ? Math.round((totalPresent / totalDays) * 100) : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Kurinda amahazo...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm" className="gap-2">
                <Home className="w-4 h-4" />
                Subira ku Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="font-heading font-bold text-xl text-foreground">Amahazo y'Ukwezi</h1>
              <p className="text-sm text-muted-foreground">
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
              <img src={logo} alt="E-Rinda Logo" className="h-6 w-6 object-contain" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8">
          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="font-heading text-2xl font-bold text-foreground">{totalPresent}</p>
                <p className="text-sm text-muted-foreground">Iminsi Yakoze</p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-destructive/20 flex items-center justify-center">
                <XCircle className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <p className="font-heading text-2xl font-bold text-foreground">{totalAbsent}</p>
                <p className="text-sm text-muted-foreground">Iminsi Yabuze</p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-secondary/50 flex items-center justify-center">
                <Clock className="w-6 h-6 text-secondary-foreground" />
              </div>
              <div>
                <p className="font-heading text-2xl font-bold text-foreground">{totalLeave}</p>
                <p className="text-sm text-muted-foreground">Ikiruhuko</p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-heading text-2xl font-bold text-foreground">{attendancePercentage}%</p>
                <p className="text-sm text-muted-foreground">Amahazo</p>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar */}
        <div className="bg-card rounded-xl p-6 border border-border">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading font-semibold text-lg text-foreground">
              Kalendari y'Amahazo
            </h2>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateMonth('prev')}
                className="gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                Mbere
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateMonth('next')}
                className="gap-1"
              >
                Nyuma
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Days of week header */}
            {daysOfWeek.map((day) => (
              <div key={day} className="text-center py-3 text-sm font-medium text-muted-foreground">
                {day}
              </div>
            ))}

            {/* Calendar days */}
            {getDaysInMonth(currentMonth).map((day, index) => {
              if (day === null) {
                return <div key={index} className="aspect-square" />;
              }

              const attendance = getAttendanceStatus(day);
              const isToday = new Date().toDateString() === new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day).toDateString();

              return (
                <div
                  key={index}
                  className={`aspect-square rounded-lg border p-2 flex flex-col items-center justify-center text-sm font-medium transition-all hover:shadow-md ${
                    getStatusColor(attendance?.status)
                  } ${isToday ? 'ring-2 ring-primary' : ''}`}
                >
                  <span className="mb-1">{day}</span>
                  {attendance && (
                    <div className="flex items-center gap-1">
                      {getStatusIcon(attendance.status)}
                      {attendance.hours > 0 && (
                        <span className="text-xs">{attendance.hours}h</span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-6 mt-6 pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-accent/20 border border-accent/30" />
              <span className="text-sm text-muted-foreground">Yakoze</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-destructive/20 border border-destructive/30" />
              <span className="text-sm text-muted-foreground">Yabuze</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-secondary border border-secondary" />
              <span className="text-sm text-muted-foreground">Ikiruhuko</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-muted border border-muted" />
              <span className="text-sm text-muted-foreground">Ntiyakoze</span>
            </div>
          </div>
        </div>

        {/* Attendance Recording for Coordinators */}
        {["CELL_COORDINATOR", "VILLAGE_COORDINATOR", "SECTOR_COORDINATOR", "SUPER_ADMIN"].includes(userRole) && (
          <div className="bg-card rounded-xl p-6 border border-border mt-6">
            <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
              Kwandika Amahazo y'Abakozi
            </h3>
            {staffLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin" />
                <span className="ml-2">Kurinda amahazo y'abakozi...</span>
              </div>
            ) : (
              <div className="space-y-4">
                {staffAttendance.map((staff) => (
                  <div key={staff.user_id} className="flex items-center justify-between p-4 rounded-lg border border-border">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                        <span className="text-sm font-medium text-accent">
                          {staff.full_name.split(' ').map((n: string) => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{staff.full_name}</p>
                        <p className="text-sm text-muted-foreground">{staff.username}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        onClick={() => handleAttendanceUpdate(staff.user_id, new Date().getDate(), "present")}
                      >
                        <CheckCircle className="w-4 h-4" />
                        Yakoze
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        onClick={() => handleAttendanceUpdate(staff.user_id, new Date().getDate(), "absent")}
                      >
                        <XCircle className="w-4 h-4" />
                        Yabuze
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        onClick={() => handleAttendanceUpdate(staff.user_id, new Date().getDate(), "leave")}
                      >
                        <Clock className="w-4 h-4" />
                        Ikiruhuko
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Recent Attendance Records */}
        <div className="bg-card rounded-xl p-6 border border-border mt-6">
          <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
            Ibikorwa Biheruka
          </h3>
          <div className="space-y-3">
            {Object.entries(attendanceData)
              .sort(([a], [b]) => parseInt(b) - parseInt(a))
              .slice(0, 5)
              .map(([day, data]) => {
                const dateObj = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), parseInt(day));
                const formattedDate = dateObj.toLocaleDateString('rw-RW', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                });

                return (
                  <div key={day} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        data.status === 'present' ? 'bg-accent/20 text-accent' :
                        data.status === 'absent' ? 'bg-destructive/20 text-destructive' :
                        'bg-secondary text-secondary-foreground'
                      }`}>
                        {getStatusIcon(data.status)}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{formattedDate}</p>
                        <p className="text-sm text-muted-foreground">
                          {data.status === 'present' ? `Yakoze amasaha ${data.hours}` :
                           data.status === 'absent' ? 'Yabuze' :
                           'Ikiruhuko'}
                        </p>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      data.status === 'present' ? 'bg-accent/20 text-accent' :
                      data.status === 'absent' ? 'bg-destructive/20 text-destructive' :
                      'bg-secondary text-secondary-foreground'
                    }`}>
                      {data.status === 'present' ? 'Yakoze' :
                       data.status === 'absent' ? 'Yabuze' :
                       'Ikiruhuko'}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Attendance;
