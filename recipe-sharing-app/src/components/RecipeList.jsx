import React from "react";
import { Link } from "react-router-dom";
import { useRecipeStore } from "../stores/recipeStore";

const RecipeList = () => {
  const filteredRecipes = useRecipeStore((state) => state.filteredRecipes);
  const favorites = useRecipeStore((state) => state.favorites);
  const addFavorite = useRecipeStore((state) => state.addFavorite);
  const removeFavorite = useRecipeStore((state) => state.removeFavorite);

  const isFavorite = (id) => favorites.includes(id);

  return (
    <div>
      <h2>Recipe List</h2>
      {filteredRecipes.length === 0 ? (
        <p>No recipes found. Try adjusting your search or add a new recipe!</p>
      ) : (
        filteredRecipes.map((recipe) => (
          <div
            key={recipe.id}
            style={{
              border: "1px solid #ccc",
              marginBottom: "15px",
              padding: "10px",
              borderRadius: "6px",
            }}
          >
            <h3>
              <Link
                to={`/recipe/${recipe.id}`}
                style={{ textDecoration: "none", color: "#333" }}
              >
                {recipe.title}
              </Link>
            </h3>
            <p>{recipe.description}</p>
            <button
              onClick={() =>
                isFavorite(recipe.id)
                  ? removeFavorite(recipe.id)
                  : addFavorite(recipe.id)
              }
              style={{
                marginTop: "10px",
                padding: "5px 10px",
                backgroundColor: isFavorite(recipe.id) ? "#ffcdd2" : "#c8e6c9",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              {isFavorite(recipe.id)
                ? "Remove from Favorites"
                : "Add to Favorites"}
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeList;
