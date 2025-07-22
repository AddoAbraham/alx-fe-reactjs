import { useParams, Link } from "react-router-dom";
import { useRecipeStore } from "../stores/recipeStore";
import EditRecipeForm from "./EditRecipeForm";
import DeleteRecipeButton from "./DeleteRecipeButton";

const RecipeDetails = () => {
  const { id } = useParams();
  const numericId = Number(id);

  const recipe = useRecipeStore((state) =>
    state.recipes.find((r) => r.id === numericId)
  );

  const favorites = useRecipeStore((state) => state.favorites);
  const addFavorite = useRecipeStore((state) => state.addFavorite);
  const removeFavorite = useRecipeStore((state) => state.removeFavorite);

  const isFavorite = favorites.includes(numericId);

  if (isNaN(numericId)) return <p>Invalid recipe ID.</p>;
  if (!recipe) return <p>Recipe not found.</p>;

  return (
    <div>
      <Link to="/">← Back to Recipes</Link>
      <h2>{recipe.title}</h2>
      <p>{recipe.description}</p>

      <button
        onClick={() =>
          isFavorite ? removeFavorite(recipe.id) : addFavorite(recipe.id)
        }
      >
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>

      <EditRecipeForm recipe={recipe} />
      <DeleteRecipeButton recipeId={recipe.id} />
    </div>
  );
};

export default RecipeDetails;
