import { useCallback } from 'react';
import { useStore } from '@/stores/userStore';
import type { UserSlice } from '@/stores/userStore';

/**
 * Custom hook for authentication operations
 * Provides a clean interface to interact with user authentication state
 */
export const useAuth = () => {
  // Get state from store
  const user = useStore((state: UserSlice) => state.user);
  const loading = useStore((state: UserSlice) => state.loading);
  const error = useStore((state: UserSlice) => state.error);
  const { login, logout } = useStore((state: UserSlice) => state.actions);

  // Memoized login function
  const handleLogin = useCallback(
    async (credentials: { email: string; password: string }) => {
      await login(credentials);
    },
    [login]
  );

  // Memoized logout function
  const handleLogout = useCallback(() => {
    logout();
    // Clear localStorage on logout
    window.localStorage.removeItem('user');
  }, [logout]);

  // Derived state
  const isAuthenticated = Boolean(user);
  const isLoading = loading;
  const authError = error;

  // User profile helpers
  const getUserDisplayName = useCallback(() => {
    if (!user) return '';
    return `${user.firstName} ${user.lastName}`.trim() || user.email;
  }, [user]);

  const getUserInitials = useCallback(() => {
    if (!user) return '';
    if (user.firstName && user.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    }
    return user.email[0]?.toUpperCase() ?? '';
  }, [user]);

  return {
    // State
    user,
    isAuthenticated,
    isLoading,
    error: authError,
    
    // Actions
    login: handleLogin,
    logout: handleLogout,
    
    // Helpers
    getUserDisplayName,
    getUserInitials,
  };
};

/**
 * Custom hook for user profile operations
 * Focuses specifically on user profile data and operations
 */
export const useUserProfile = () => {
  const user = useStore((state: UserSlice) => state.user);

  const isProfileComplete = useCallback(() => {
    if (!user) return false;
    
    const requiredFields: (keyof typeof user)[] = ['firstName', 'lastName', 'age', 'gender'];
    return requiredFields.every(field => {
      const value = user[field];
      return value !== '' && value !== 0;
    });
  }, [user]);

  const getProfileCompletionPercentage = useCallback(() => {
    if (!user) return 0;
    
    const allFields = ['firstName', 'lastName', 'age', 'gender', 'photoUrl'];
    const completedFields = allFields.filter(field => {
      const value = user[field as keyof typeof user];
      return value !== null && value !== undefined && value !== '';
    });
    
    return Math.round((completedFields.length / allFields.length) * 100);
  }, [user]);

  return {
    user,
    isProfileComplete: isProfileComplete(),
    profileCompletionPercentage: getProfileCompletionPercentage(),
  };
};

/**
 * Custom hook for checking user permissions/status
 */
export const useUserStatus = () => {
  const user = useStore((state: UserSlice) => state.user);

  return {
    isActive: user?.isActive ?? false,
    isVerified: user?.isVerified ?? false,
    canPerformActions: Boolean(user?.isActive && user?.isVerified),
  };
};

/**
 * Custom hook that provides access only to user actions
 * Use this when you only need to perform actions without accessing state
 */
export const useUserActions = () => {
  const { login, logout } = useStore((state: UserSlice) => state.actions);

  // Memoized login function with enhanced error handling
  const handleLogin = useCallback(
    async (credentials: { email: string; password: string }) => {
      try {
        await login(credentials);
        return { success: true, error: null };
      } catch (error) {
        return { 
          success: false, 
          error: error instanceof Error ? error.message : 'Login failed' 
        };
      }
    },
    [login]
  );

  // Memoized logout function with cleanup
  const handleLogout = useCallback(() => {
    logout();
    // Clear localStorage on logout
    window.localStorage.removeItem('user');
  }, [logout]);

  return {
    login: handleLogin,
    logout: handleLogout,
  };
};
