'use client';

import { useState, useEffect } from 'react';
import AstroForm from '@/components/AstroForm';
import RecipeList from '@/components/RecipeList';
import Loader from '@/components/Loader';

export default function Page() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('astrofood-recipes');
    if (stored) setRecipes(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('astrofood-recipes', JSON.stringify(recipes));
  }, [recipes]);

  const generateRecipe = async ({ zodiac, mealType, language, state }) => {
    setLoading(true);
    try {
      const res = await fetch('/api/chefai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ zodiac, mealType, language, state }),
      });
      const data = await res.json();
      setRecipes((prev) => [...prev, { id: Date.now(), ...data }]);
    } catch (err) {
      console.error('Erreur API:', err);
    } finally {
      setLoading(false);
    }
  };

  const resetRecipes = () => {
    setRecipes([]);
    localStorage.removeItem('astrofood-recipes');
  };

  const addToCart = (recipe) => {
    setCart((prev) => [...prev, recipe]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white p-6">
      <header className="text-center mb-8">
        <h1 className="text-5xl font-extrabold text-yellow-400 drop-shadow-lg">🌟 AstroFood PremiumGold</h1>
        <p className="mt-2 text-indigo-200">Cosmic recipes tailored by the stars</p>
      </header>

      <AstroForm onGenerate={generateRecipe} />

      <div className="flex justify-center gap-4 mb-10">
        <button
          onClick={resetRecipes}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded shadow-lg transition"
        >
          🧹 Réinitialiser
        </button>
      </div>

      {loading ? <Loader /> : <RecipeList recipes={recipes} onAddToCart={addToCart} />}
    </div>
  );
}
