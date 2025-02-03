import axios from "axios";

// Crear instancia de Axios con configuración base
export const api = axios.create({
  baseURL: "https://marketplace-backend-icya.onrender.com/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar el token en cada solicitud
/* api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Obtener el token del almacenamiento
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
 */
