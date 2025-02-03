import { createContext, useContext } from "react";
import { usePersistedState } from "../hooks/usePersistState";
import { api } from "../libs/axiosInstance";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

interface Session {
  token: string;
  user: User;
}

interface registerParams {
  name: string;
  email: string;
  password: string;
}

interface loginParams {
  email: string;
  password: string;
}

interface AuthContextData {
  session: Session | null;
  register: (params: registerParams) => Promise<void>;
  login: (params: loginParams) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [session, setSession] = usePersistedState<Session | null>(
    "session",
    null
  );

  const register = async (registerData: registerParams): Promise<any> => {
    try {
      const res = await api.post("/auth/register", registerData);

      if (res.status !== 201) {
        throw new Error(res.data.message || "Error al registrar el usuario");
      }

      const res2 = await api.post("/auth/login", {
        email: registerData.email,
        password: registerData.password,
      });

      if (res2.status !== 201) {
        throw new Error(res2.data.message || "Error al iniciar sesión");
      }

      setSession(res2.data);

      return res.data;
    } catch (error) {
      console.error("Error en register:", error);
      throw error;
    }
  };

  const login = async (loginData: loginParams): Promise<any> => {
    try {
      const res = await api.post("/auth/login", loginData);

      if (res.status !== 201) {
        throw new Error(res.data.message || "Error al iniciar sesión");
      }
      setSession(res.data);
      return res.data;
    } catch (error) {
      console.error("Error en login:", error);
      throw error;
    }
  };

  const logout = () => {
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ session, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return context;
};
