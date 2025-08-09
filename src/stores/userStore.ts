import https from "@/lib/https";
import { getErrorMessage } from "@/lib/utils";
import { create, type StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";

type User = {
  _id: string;
  email: string;
  age: number;
  photoUrl: string;
  firstName: string;
  lastName: string;
  gender: string;
  isActive: boolean;
  isVerified: boolean;
} | null;

export interface UserSlice {
  loading: boolean;
  error: string | null;
  user: User;
  actions: {
    login: (args: { email: string; password: string }) => Promise<void>;
    logout: () => void;
  };
}

export const createUserSlice: StateCreator<UserSlice> = (set) => ({
  user: null,
  loading: false,
  error: null,
  actions: {
    login: async ({ email, password }: { email: string; password: string }) => {
      debugger;
      set({ loading: true, error: null });
      try {
        const response: { data: User } = await https.post("/auth/login", {
          email,
          password,
        });
        window.localStorage.setItem(
          "user",
          JSON.stringify({
            id: response.data?._id,
            email: response.data?.email,
          })
        );
        if (response.data) {
          set({ user: response.data, loading: false });
        } else {
          set({ loading: false });
        }
      } catch (error: unknown) {
        const message = getErrorMessage(error);
        set({ error: message, loading: false });
        console.error("Login failed:", error);
      }
    },
    logout: () => {
      set({ user: null, error: null });
    },
  },
});

// Individual store for user slice
export const useUserStore = create<UserSlice>()(
  devtools(createUserSlice, { name: "user" })
);

// Custom hook to access user actions
export const useUserActions = () => useUserStore((state) => state.actions);

// Export individual stores
export { useUserStore as useStore }; // For backward compatibility
