import React from "react";
import { useContext } from "react";
import { CartContext } from "../context/cartcontext";

const PizzaCard = ({ pizza }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="card">
      <img src={pizza.img} alt={pizza.name} />
      <h3 className="card-title">{pizza.name}</h3>
      <p className="card-text">
        <strong>Ingredientes:</strong> {pizza.ingredients.join(", ")}
      </p>
      <p className="card-text">
        <strong>Precio:</strong> ${pizza.price}
      </p>
      <button className="btn btn-primary" onClick={() => addToCart(pizza)}>Añadir al carrito</button>
    </div>
  );
};

export default PizzaCard;
