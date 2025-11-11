import RecipeCard from './RecipeCard';

export default function RecipeList({recipes,onAddToCart}) {
  return (
    <div id="recipe-container" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((r) => (
        <RecipeCard key={r.id} recipe={r} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
}
