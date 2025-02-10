import { Link } from "wouter";
import { useAuth } from "../context/AuthContext";

export const Header = () => {
  const { logout, session } = useAuth();
  return (
    <div className="navbar bg-base-100 shadow-sm px-8">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/vendedor" asChild>
                <a>Vender</a>
              </Link>
            </li>
            <li>
              <Link to="/productos" asChild>
                <a>Productos</a>
              </Link>
            </li>
            <li>
              <Link to="/carrito" asChild>
                <a>Carrito</a>
              </Link>
            </li>
          </ul>
        </div>
        <Link to="/" asChild>
          <a className="text-lg font-bold">Marketplace</a>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/vendedor" asChild>
              <a>Vender</a>
            </Link>
          </li>
          <li>
            <Link to="/productos" asChild>
              <a>Productos</a>
            </Link>
          </li>
          <li>
            <Link to="/carrito" asChild>
              <a>Carrito</a>
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {session ? (
          <>
            <Link to="/perfil" asChild>
              <a className="btn">Mi perfil</a>
            </Link>
            <button className="btn btn-square" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/register" asChild>
              <a className="btn">Register</a>
            </Link>
            <Link to="/login" asChild>
              <a className="btn">Login</a>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
