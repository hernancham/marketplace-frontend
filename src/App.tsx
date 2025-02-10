import { Route, Switch } from "wouter";
import { lazy } from "react";
import { Page } from "./components/Page";

// Layouts
import { Layout } from "./components/Layout";
/* import LayoutGeneral from "./components/LayoutGeneral";
import LayoutSeller from "./components/LayoutSeller"; */

// Lazy loading para optimizar carga
const NotFound = lazy(() => import("./pages/NotFound"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Home = lazy(() => import("./pages/Home"));
const Profile = lazy(() => import("./pages/Profile"));
const Vender = lazy(() => import("./pages/Vender"));
const Productos = lazy(() => import("./pages/Productos"));
const Cart = lazy(() => import("./pages/Cart"));
/*
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Checkout = lazy(() => import("./pages/Checkout"));

const Orders = lazy(() => import("./pages/Orders"));

// Rutas para vendedores
/* const SellerDashboard = lazy(() => import("./pages/seller/Dashboard"));
const SellerProducts = lazy(() => import("./pages/seller/Products"));
const SellerOrders = lazy(() => import("./pages/seller/Orders")); */

// Definir rutas con Layouts según el rol
const App = () => {
  return (
    <Switch>
      {/* Rutas sin Layout (Ejemplo: Login y Registro) */}
      <Route path="/login">
        <Page page={Login} />
      </Route>
      <Route path="/register">
        <Page page={Register} />
      </Route>

      {/* Rutas públicas con LayoutGeneral */}
      <Route path="/">
        <Page layout={Layout} page={Home} />
      </Route>

      <Route path="/productos">
        <Page layout={Layout} page={Productos} />
      </Route>
      <Route path="/producto/:id"></Route>
      <Route path="/carrito">
        <Page layout={Layout} page={Cart} />
      </Route>
      <Route path="/checkout"></Route>

      {/* Rutas protegidas para compradores */}
      <Route path="/perfil">
        <Page layout={Layout} page={Profile} />
      </Route>
      <Route path="/mis-pedidos"></Route>

      {/* Rutas protegidas para vendedores */}
      <Route path="/vendedor">
        <Page layout={Layout} page={Vender} />
      </Route>
      <Route path="/vendedor/productos"></Route>
      <Route path="/vendedor/pedidos"></Route>
      <Route path="/vendedor/ventas"></Route>

      {/* Ruta 404 */}
      <Route component={NotFound} />
    </Switch>
  );
};

export default App;
