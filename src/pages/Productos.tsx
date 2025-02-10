import { CardProduct } from "../components/CardProduct";
import { api } from "../libs/axiosInstance";
import { Products } from "../types/producto";
import { useEffect, useState } from "react";

export default function Productos() {
  const [productos, setProductos] = useState<Products>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await api.get<Products>("/products");
        setProductos(response.data);
      } catch (error) {
        setError("Error al cargar los productos");
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  return (
    <div className="min-h-screen bg-base-200 p-8 flex flex-col justify-center items-center">
      <h2 className="text-5xl font-bold mb-32 text-gray-900 dark:text-white">
        Productos
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {loading && <p>Cargando productos...</p>}
        {error && <p>{error}</p>}
        {productos.map((prod, i) => (
          <CardProduct key={i} producto={prod} />
        ))}
      </div>
    </div>
  );
}
