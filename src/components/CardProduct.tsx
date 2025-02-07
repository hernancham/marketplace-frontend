import { Link } from "wouter";
import { Product } from "../types/producto";

interface CardProductProps {
  producto: Product;
}

export const CardProduct = ({ producto }: CardProductProps) => {
  const uAt = new Date(producto.updatedAt);
  const cAt = new Date(producto.createdAt);
  return (
    <div className="card card-compact bg-base-100 w-96 shadow-xl">
      <figure>
        <img src={producto.imageUrl} alt={producto.titulo} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{producto.titulo}</h2>
        <p>{producto.descripcion}</p>
        <p>Precio: S/{producto.precio} soles</p>
        <p>Stock: {producto.stock}</p>
        <p>Publicadoe en: {cAt.toLocaleString()}</p>
        <p>Actulizado en: {uAt.toLocaleString()}</p>
        <p>Publicado por: {producto.seller.name}</p>
        <div className="card-actions justify-end">
          <Link to={"/productos/" + producto.id} asChild>
            <a className="btn btn-secondary">Ver</a>
          </Link>
          <button className="btn btn-primary">Comprar</button>
        </div>
      </div>
    </div>
  );
};
