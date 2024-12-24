import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Products from "./Products";
import Favorites from "./Favorites";
import "./App.css";

const App = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [theme, setTheme] = useState("light"); // Theme state
  const resultsPerPage = 5;

  useEffect(() => {
    fetchRecipes("Arrabiata");
  }, []);

  const fetchRecipes = async (query) => {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData(result.meals || []);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      fetchRecipes(search);
      setCurrentPage(1);
    }
  };

  const toggleFavorite = (recipe) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.find((fav) => fav.idMeal === recipe.idMeal);
      if (isFavorite) {
        return prevFavorites.filter((fav) => fav.idMeal !== recipe.idMeal);
      }
      return [...prevFavorites, recipe];
    });
  };

  // Pagination logic
  const indexOfLastRecipe = currentPage * resultsPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - resultsPerPage;
  const currentRecipes = data.slice(indexOfFirstRecipe, indexOfLastRecipe);
  const totalPages = Math.ceil(data.length / resultsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Dark mode toggle
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <Router>
      <div className={`app ${theme}`}>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/favorites">Favorites</Link>
          <button onClick={toggleTheme}>Toggle Dark Mode</button>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1>Recipe Finder</h1>
                <form onSubmit={handleSearch} className="search-form">
                  <input
                    type="text"
                    placeholder="Search for a recipe..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <button type="submit">Search</button>
                </form>
                {error && <p className="error">Error: {error}</p>}
                <h2>Search Results</h2>
                {currentRecipes.length > 0 ? (
                  <Products
                    data={currentRecipes.map((meal) => ({ recipe: meal }))}
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                  />
                ) : (
                  <p>No recipes found. Try a different search term!</p>
                )}
                {/* Pagination */}
                <div className="pagination">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => handlePageChange(index + 1)}
                      className={currentPage === index + 1 ? 'active' : ''}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </>
            }
          />
          <Route
            path="/favorites"
            element={<Favorites favorites={favorites} toggleFavorite={toggleFavorite} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
