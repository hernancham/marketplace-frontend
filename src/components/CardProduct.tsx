import { Product } from "../types/producto";
import { useCartStore } from "../store/cartStore";
import WaIcon from "../components/iconos/wa";

interface CardProductProps {
  producto: Product;
}

export const CardProduct = ({ producto }: CardProductProps) => {
  const { addToCart } = useCartStore();

  return (
    <div className="space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <a href="#" className="overflow-hidden rounded">
        <img
          className="mx-auto h-44 w-44"
          src={producto.imageUrl}
          alt={producto.titulo}
        />
      </a>
      <div>
        <a
          href="#"
          className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
        >
          {producto.titulo}
        </a>
        <p className="mt-2 text-base font-normal text-gray-500 dark:text-gray-400">
          {producto.descripcion}
        </p>
      </div>
      <div>
        <p className="text-lg font-bold text-gray-900 dark:text-white">
          S/{producto.precio} soles
        </p>
        <p className="text-lg font-bold leading-tight text-sky-600 dark:text-sky-500">
          {producto.stock} en stock
        </p>
        <p>Por {producto.seller.name}</p>
        <p>{producto.seller.phone}</p>
      </div>
      <div className="mt-6 flex items-center gap-2.5">
        <a
          href={`https://api.whatsapp.com/send?phone=51${producto.seller.phone}&text=${producto.titulo}`}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
        >
          <WaIcon className="size-6" />
        </a>
        <div
          id="favourites-tooltip-1"
          role="tooltip"
          className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
        >
          Agregar a favoritos
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        <button
          type="button"
          onClick={() =>
            addToCart({
              id: producto.id,
              titulo: producto.titulo,
              imageUrl: producto.imageUrl,
              precio: Number(producto.precio),
              cantidad: 1,
            })
          }
          className="inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium  text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          <svg
            className="-ms-2 me-2 h-5 w-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4"
            />
          </svg>
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
};
