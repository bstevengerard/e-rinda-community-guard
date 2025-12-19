const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

interface LoginData {
  username: string;
  password: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
  full_name?: string;
  national_id?: string;
  date_of_birth?: string;
  phone_number?: string;
  role?: string;
  district?: string;
  sector?: string;
  cell?: string;
  village?: string;
}

interface AuthResponse {
  access_token: string;
  token_type: string;
}

interface User {
  id: string;
  username: string;
  email: string;
  full_name?: string;
  role: string;
  // Add other user fields as needed
}

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

interface CreateAttendanceData {
  user_id: string;
  date: string;
  status: string;
  shift: string;
  approved_by?: string;
}

class ApiService {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('access_token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  async login(data: LoginData): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Login failed');
    }

    return response.json();
  }

  async register(data: RegisterData): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Registration failed');
    }

    return response.json();
  }

  async getCurrentUser(): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: 'GET',
      headers: {
        ...this.getAuthHeaders(),
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to get user');
    }

    return response.json();
  }

  async getDashboardData(): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/dashboard`, {
      method: 'GET',
      headers: {
        ...this.getAuthHeaders(),
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to get dashboard data');
    }

    return response.json();
  }

  async getMonthlyAttendance(userId: string, year: number, month: number): Promise<AttendanceData> {
    const response = await fetch(`${API_BASE_URL}/attendance/monthly/${userId}/${year}/${month}`, {
      method: 'GET',
      headers: {
        ...this.getAuthHeaders(),
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to get monthly attendance');
    }

    return response.json();
  }

  async getStaffMonthlyAttendance(year: number, month: number): Promise<StaffMember[]> {
    const response = await fetch(`${API_BASE_URL}/attendance/staff/monthly/${year}/${month}`, {
      method: 'GET',
      headers: {
        ...this.getAuthHeaders(),
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to get staff monthly attendance');
    }

    return response.json();
  }

  async createAttendance(data: CreateAttendanceData): Promise<any> {
    // Transform frontend data to match backend expectations
    const backendData = {
      userId: data.user_id,
      remarks: data.status, // Use status as remarks for now
    };

    const response = await fetch(`${API_BASE_URL}/api/attendance/checkin`, {
      method: 'POST',
      headers: {
        ...this.getAuthHeaders(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(backendData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to create attendance');
    }

    return response.json();
  }
 
  // Add other API methods as needed
}

export const apiService = new ApiService();
export type { LoginData, RegisterData, AuthResponse, User, AttendanceData, StaffMember, CreateAttendanceData };
