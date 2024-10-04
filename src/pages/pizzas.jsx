import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../context/cartcontext";
import { useParams } from "react-router-dom"; // Importar useParams

const Pizza = () => {
  const { id } = useParams(); // Obtener el ID de la pizza desde la URL
  const [pizza, setPizza] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    // Usar el ID obtenido para hacer la petición a la API
    fetch(`http://localhost:5000/api/pizzas/${id}`)
      .then((response) => response.json())
      .then((data) => setPizza(data))
      .catch((error) => console.error("Error fetching pizza:", error));
  }, [id]); // Asegurar que el useEffect depende del ID de la pizza

  if (!pizza) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = () => {
    const pizzaToAdd = {
      id: pizza.id,
      name: pizza.name,
      price: pizza.price,
      quantity: 1,
      image: pizza.img
    };
    addToCart(pizzaToAdd);
  };

  return (
    <div className="pizza-details card">
      <img src={pizza.img} alt={pizza.name} className="card-img-top" />
      <div className="card-body">
        <h2 className="card-title">{pizza.name}</h2>
        <p className="card-text">{pizza.desc}</p>
        <p><strong>Precio:</strong> ${pizza.price}</p>
        <p><strong>Ingredientes:</strong> {pizza.ingredients.join(", ")}</p>
        <button className="btn btn-primary" onClick={handleAddToCart}>Añadir al carrito</button>
      </div>
    </div>
  );
};

const PizzaCart = () => {
  const { cart } = useContext(CartContext);

  return (
    <div className="cart-container">
      <h3>Carrito de Pizzas</h3>
      {cart.length > 0 ? (
        <ul>
          {cart.map((item) => (
            <li key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-img" />
              <div>
                <p>{item.name}</p>
                <p>Cantidad: {item.quantity}</p>
              </div>
              <p>Precio: ${item.price}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No has añadido pizzas al carrito todavía.</p>
      )}
    </div>
  );
};

export { PizzaCart };
export default Pizza;
