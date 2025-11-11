import RecipeCard from'@/components/RecipeCard';

const exportToPDF = async () => {
  const html2pdf = (await import('html2pdf.js')).default;

  const element = document.getElementById('recipe-container');
  if (!element) return;
  html2pdf().from(element).save();
};


 export default function RecipeCard({ recipe, onAddToCart }) {
  const zodiacColors = {
    Aries: 'border-red-500',
    Taurus: 'border-green-600',
    Gemini: 'border-yellow-400',
    Cancer: 'border-blue-400',
    Leo: 'border-yellow-500',
    Virgo: 'border-emerald-500',
    Libra: 'border-pink-400',
    Scorpio: 'border-red-600',
    Sagittarius: 'border-orange-500',
    Capricorn: 'border-gray-600',
    Aquarius: 'border-cyan-400',
    Pisces: 'border-teal-400',
  };

  const borderColor = zodiacColors[recipe.zodiac] || 'border-white';
  const isRTL = recipe.language === 'العربية';

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`border-4 ${borderColor} rounded-lg p-4 shadow-lg bg-white text-black dark:bg-zinc-900 dark:text-white`}
    >
      <h2 className="text-xl font-bold mb-2">{recipe.title}</h2>
      <p className="text-sm mb-2">
        <strong>{isRTL ? 'المكونات' : 'Ingredients'}:</strong> {recipe.ingredients}
      </p>
      <p className="text-sm mb-4">
        <strong>{isRTL ? 'التحضير' : 'Instructions'}:</strong> {recipe.instructions}
      </p>
      <button
        onClick={() => onAddToCart?.(recipe)}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-1 px-3 rounded"
      >
        {isRTL ? 'أضف إلى السلة' : 'Add to Cart'}
      </button>
    </div>
  );
}
