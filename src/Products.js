import React from "react";
import "./Products.css";

const Products = ({ data, favorites, toggleFavorite }) => {
  if (!data || !Array.isArray(data)) {
    return <p>No products available</p>;
  }

  return (
    <div className="products">
      {data.map((item) => {
        const isFavorite = favorites.some((fav) => fav.idMeal === item.recipe.idMeal);
        return (
          <div key={item.recipe.idMeal} className="product-item">
            <img
              src={item.recipe.strMealThumb || "https://via.placeholder.com/200"}
              alt={item.recipe.strMeal || "Recipe image"}
            />
            <h3>{item.recipe.strMeal}</h3>
            <p>Category: {item.recipe.strCategory}</p>
            <a
              href={item.recipe.strSource || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Recipe
            </a>
            <button onClick={() => toggleFavorite(item.recipe)}>
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Products;
