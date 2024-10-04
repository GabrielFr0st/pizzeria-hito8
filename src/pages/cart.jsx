import React, { useContext, useMemo } from 'react';
import { CartContext } from '../context/cartcontext';
import { UserContext } from '../context/UserContext';

const Cart = () => {
    const { cart, increaseQuantity, decreaseQuantity, removeFromCart } = useContext(CartContext); 
    const { token } = useContext(UserContext);

    const total = useMemo(() => {
        return cart.reduce((sum, pizza) => sum + pizza.price * pizza.quantity, 0);
    }, [cart]);

    const handleCheckout = async () => {
        if (!token) {
            alert("Debes iniciar sesión para realizar la compra.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/checkouts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    cart: cart,
                }),
            });

            if (response.ok) {
                alert("Compra realizada con éxito!");
            } else {
                const errorData = await response.json();
                alert(errorData.message || "Error al procesar la compra.");
            }
        } catch (error) {
            console.error("Error durante la compra:", error);
            alert("Error en la conexión con el servidor.");
        }
    };

    return (
        <div id="cart" className="cart-container">
            {cart.length > 0 ? (
                cart.map(({ id, name, price, quantity }) => (
                    <div key={id} className="cart-item">
                        <h3>{name}</h3>
                        <p>Precio: ${price}</p>
                        <p>Cantidad: {quantity}</p>
                        <button className="btn btn-outline-success" onClick={() => increaseQuantity(id)}>+</button>
                        <button className="btn btn-outline-danger" onClick={() => decreaseQuantity(id)}>-</button>
                        <button className="btn btn-outline-danger" onClick={() => removeFromCart(id)}>Eliminar</button>
                    </div>
                ))
            ) : (
                <p>No tienes pizzas en el carrito aún.</p>
            )}
            <p><strong>Total:</strong> ${total.toLocaleString()}</p>
            <button className="btn btn-primary" onClick={handleCheckout} disabled={!token}>Pagar</button>
        </div>
    );
};

export default Cart;
