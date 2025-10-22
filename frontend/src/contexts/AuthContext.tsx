import axiosClient from "@/api/AxiosClient";
import { createContext, type ReactNode, useContext, useEffect, useState } from "react";
import { z } from "zod";

// Schema Zod pentru User
const userSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["ADMIN", "MEMBER", "VIEWER"]),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type User = z.infer<typeof userSchema>;

interface AuthContextType {
  user: User | null;
  login: (data: User) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  // Încearcă să logheze user-ul din localStorage la mount
  useEffect(() => {
    const tryLogin = async () => {
      try {
        const rawUser = localStorage.getItem("devtrack-user");
        if (!rawUser) return;

        const parsedUser = JSON.parse(rawUser);
        const validated = userSchema.safeParse(parsedUser);

        if (validated.success) {
          const validUser = validated.data;
          setUser(validUser);

          // Optional: re-login la server
          try {
            const response = await axiosClient.post("/auth/login", {
              name: validUser.name,
              email: validUser.email,
              role: validUser.role,
              password: validUser.password,
            });

            if (response.status === 200) {
              setUser(response.data);
              localStorage.setItem("devtrack-user", JSON.stringify(response.data));
            }
          } catch (err) {
            console.error("Server login failed:", err);
          }
        } else {
          console.warn("Invalid user in localStorage:", validated.error.format());
          localStorage.removeItem("devtrack-user");
        }
      } catch (error) {
        console.error("AuthProvider error:", error);
      }
    };

    tryLogin();
  }, []);

  // Funcția login pentru formular
  const login = async (data: User) => {
    try {
      const response = await axiosClient.post("/auth/login", {
        name: data.name,
        email: data.email,
        role: data.role,
        password: data.password,
      });

      if (response.status === 200) {
        setUser(response.data);
        localStorage.setItem("devtrack-user", JSON.stringify(response.data));
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("devtrack-user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook custom pentru a folosi contextul
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
