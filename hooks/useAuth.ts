import { useAuthStore } from '../store/authStore';
import { LoginCredentials, RegisterData, OTPVerification } from '../types/user';
import apiClient from '../lib/api';

export function useAuth() {
  const {
    user,
    token,
    isAuthenticated,
    isLoading,
    setAuth,
    logout,
    updateUser,
    setLoading,
  } = useAuthStore();

  const login = async (credentials: LoginCredentials) => {
    try {
      setLoading(true);
      const response = await apiClient.post('/auth/login', credentials);
      setAuth(response);
      return { success: true };
    } catch (error) {
      setLoading(false);
      return { success: false, error };
    }
  };

  const register = async (data: RegisterData) => {
    try {
      setLoading(true);
      const response = await apiClient.post('/auth/register', data);
      setAuth(response);
      return { success: true };
    } catch (error) {
      setLoading(false);
      return { success: false, error };
    }
  };

  const verifyOTP = async (data: OTPVerification) => {
    try {
      setLoading(true);
      const response = await apiClient.post('/auth/verify-otp', data);
      setAuth(response);
      return { success: true };
    } catch (error) {
      setLoading(false);
      return { success: false, error };
    }
  };

  const logoutUser = async () => {
    try {
      await apiClient.post('/auth/logout');
    } catch (error) {
      // Ignore error on logout
    } finally {
      logout();
    }
  };

  const updateProfile = async (userData: Partial<typeof user>) => {
    try {
      setLoading(true);
      const response = await apiClient.put('/auth/profile', userData);
      updateUser(response);
      return { success: true };
    } catch (error) {
      setLoading(false);
      return { success: false, error };
    }
  };

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    register,
    verifyOTP,
    logout: logoutUser,
    updateProfile,
  };
}
