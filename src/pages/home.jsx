import React, { useState, useEffect, useContext } from "react";
import PizzaCard from "../components/cardpizza";
import { CartContext } from "../context/cartcontext";

const Home = () => {
  const [pizzas, setPizzas] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch("http://localhost:5000/api/pizzas")
      .then((response) => response.json())
      .then((data) => setPizzas(data))
      .catch((error) => console.error("Error fetching pizzas:", error));
  }, []);

  return (
    <div className="pizza-container">
      {pizzas.map((pizza) => (
        <PizzaCard key={pizza.id} pizza={pizza} addToCart={addToCart} />
      ))}
    </div>
  );
};

export default Home;
