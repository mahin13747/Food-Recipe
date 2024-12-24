// import React from "react";
// import Products from "./Products";

// const Favorites = ({ favorites, toggleFavorite }) => {
//   return (
//     <div className="favorites">
//       <h1>Your Favorites</h1>
//       {favorites.length > 0 ? (
//         <Products
//           data={favorites.map((meal) => ({ recipe: meal }))}
//           favorites={favorites}
//           toggleFavorite={toggleFavorite}
//         />
//       ) : (
//         <p>No favorites added yet!</p>
//       )}
//     </div>
//   );
// };

// export default Favorites;

import React from "react";
import Products from "./Products";

const Favorites = ({ favorites, toggleFavorite }) => {
  return (
    <div className="favorites">
      <h1>Your Favorites</h1>
      {favorites.length > 0 ? (
        <Products
          data={favorites.map((meal) => ({ recipe: meal }))}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
        />
      ) : (
        <p>No favorites added yet!</p>
      )}
    </div>
  );
};

export default Favorites;
