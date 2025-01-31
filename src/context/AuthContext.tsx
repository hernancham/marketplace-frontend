import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { navigate } from "wouter/use-browser-location";

// Definir el tipo de usuario
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
}

// Definir el contexto
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Crear el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return context;
};

// **Proveedor del contexto**
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  // Mutación para el login
  const { mutate } = useMutation({
    mutationFn: async (values: { email: string; password: string }) => {
      const response = await axios.post(
        "https://marketplace-backend-icya.onrender.com/api/v1/auth/login",
        values
      );
      return response.data;
    },
    onSuccess: async (data) => {
      localStorage.setItem("token", data.token);
      setToken(data.token); // Actualiza el token en el estado
      await refetchUser(); // Obtiene la información del usuario después del login
      navigate("/");
    },
    onError: () => {
      alert("Error al iniciar sesión.");
    },
  });

  // Función para obtener el perfil del usuario
  const fetchProfile = async () => {
    if (!token) throw new Error("No hay token");

    const response = await axios.get(
      "https://marketplace-backend-icya.onrender.com/api/v1/auth/profile",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data;
  };

  // Query para obtener el usuario autenticado
  const {
    data,
    refetch: refetchUser,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
    enabled: !!token, // Solo ejecuta si hay token
  });

  useEffect(() => {
    if (isSuccess) {
      setUser(data);
    }
    if (isError) {
      setUser(null);
      localStorage.removeItem("token");
    }
  }, [isSuccess, isError, data]);

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    navigate("/login");
  };

  const login = async (email: string, password: string) => {
    await mutate({ email, password });
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
