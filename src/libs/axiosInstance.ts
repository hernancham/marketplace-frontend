import axios from "axios";
import { getItem } from "../utils/localStorage";
import { Session } from "../context/AuthContext";

// Crear instancia de Axios con configuración base
export const api = axios.create({
  baseURL: "https://marketplace-backend-icya.onrender.com/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar el token en cada solicitud
api.interceptors.request.use(
  (config) => {
    const session: Session = getItem("session"); // Obtener el token del almacenamiento
    if (session) {
      config.headers.Authorization = `Bearer ${session.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
