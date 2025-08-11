import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch("/src/data.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((r) => r.id === parseInt(id));
        setRecipe(found);
      })
      .catch((err) => console.error("Error loading recipe:", err));
  }, [id]);

  if (!recipe) {
    return <p className="p-6 text-center">Loading recipe...</p>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Link
        to="/"
        className="inline-block mb-4 text-green-500 hover:text-green-700"
      >
        ← Back to Home
      </Link>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-64 object-cover rounded-lg"
        />
        <h1 className="text-3xl font-bold mt-4">{recipe.title}</h1>
        <p className="text-gray-600 mt-2">{recipe.summary}</p>

        {recipe.ingredients && (
          <div className="mt-4 bg-green-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold">Ingredients</h2>
            <ul className="list-disc list-inside">
              {recipe.ingredients.map((ing, i) => (
                <li key={i}>{ing}</li>
              ))}
            </ul>
          </div>
        )}

        {recipe.instructions && (
          <div className="mt-4 bg-green-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold">Instructions</h2>
            <ol className="list-decimal list-inside space-y-2">
              {recipe.instructions.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}
