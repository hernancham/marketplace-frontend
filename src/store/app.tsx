import { useCartStore } from "../store/cartStore1";

const Cart = () => {
  const {
    items,
    total,
    removeFromCart,
    clearCart,
    updateQuantity,
    getWhatsAppMessage,
  } = useCartStore();

  const phoneNumber = "5491123456789"; // Reemplaza con el número del vendedor
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${getWhatsAppMessage()}`;

  return (
    <div>
      <h2>🛒 Carrito de Compras</h2>
      {items.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <>
          {items.map((item) => (
            <div key={item.id}>
              <h4>{item.titulo}</h4>
              <p>Precio: ${item.precio.toFixed(2)}</p>
              <p>Cantidad: {item.cantidad}</p>
              <button
                onClick={() => updateQuantity(item.id, item.cantidad - 1)}
              >
                -
              </button>
              <button
                onClick={() => updateQuantity(item.id, item.cantidad + 1)}
              >
                +
              </button>
              <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
            </div>
          ))}
          <h3>Total: ${total.toFixed(2)}</h3>
          <button onClick={clearCart}>🗑 Vaciar carrito</button>

          {/* BOTÓN PARA ENVIAR POR WHATSAPP */}
          <a
            href={whatsappURL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              backgroundColor: "#25D366",
              color: "white",
              padding: "10px 15px",
              borderRadius: "5px",
              textDecoration: "none",
              marginTop: "10px",
              fontSize: "16px",
            }}
          >
            📲 Enviar pedido por WhatsApp
          </a>
        </>
      )}
    </div>
  );
};

export default Cart;
