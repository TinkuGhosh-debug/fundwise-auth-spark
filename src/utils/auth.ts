
// JWT Authentication utilities
interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthResponse {
  token: string;
  user: User;
}

// Simulate API calls (replace with real API endpoints)
const API_BASE = '/api/auth';

export const authService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock authentication logic
    if (email === 'demo@fundwise.com' && password === 'password123') {
      const mockResponse: AuthResponse = {
        token: 'mock-jwt-token-' + Date.now(),
        user: {
          id: '1',
          email: email,
          name: 'Demo User'
        }
      };
      
      // Store token in localStorage
      localStorage.setItem('auth_token', mockResponse.token);
      localStorage.setItem('user', JSON.stringify(mockResponse.user));
      
      return mockResponse;
    }
    
    throw new Error('Invalid credentials');
  },

  signup: async (email: string, password: string, name: string): Promise<AuthResponse> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock signup logic
    const mockResponse: AuthResponse = {
      token: 'mock-jwt-token-' + Date.now(),
      user: {
        id: Date.now().toString(),
        email: email,
        name: name
      }
    };
    
    // Store token in localStorage
    localStorage.setItem('auth_token', mockResponse.token);
    localStorage.setItem('user', JSON.stringify(mockResponse.user));
    
    return mockResponse;
  },

  logout: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  },

  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
    return null;
  },

  getToken: (): string | null => {
    return localStorage.getItem('auth_token');
  },

  isAuthenticated: (): boolean => {
    const token = localStorage.getItem('auth_token');
    return !!token;
  }
};
