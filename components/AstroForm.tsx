'use client';

import { useState } from 'react';

export default function AstroForm({onGenerate}) {
  const [zodiac, setZodiac] = useState('Leo');
  const [mealType, setMealType] = useState('breakfast');
  const [language, setLanguage] = useState('English');
  const [state, setState] = useState('detox');

  const stateLabels = {
    English: {
      detox: 'Detox',
      'boosted energy': 'Boosted Energy',
      'metabolic balance': 'Metabolic Balance',
      'immune support': 'Immune Support',
      'stress relief': 'Stress Relief',
      équilibre: 'Balance',
    },
    Français: {
      detox: 'Détox',
      'boosted energy': 'Énergie renforcée',
      'metabolic balance': 'Équilibre métabolique',
      'immune support': 'Soutien immunitaire',
      'stress relief': 'Anti-stress',
      équilibre: 'Équilibre',
    },
    العربية: {
      detox: 'إزالة السموم',
      'boosted energy': 'تعزيز الطاقة',
      'metabolic balance': 'التوازن الأيضي',
      'immune support': 'دعم المناعة',
      'stress relief': 'تخفيف التوتر',
      équilibre: 'التوازن العام',
    },
  };

  const handleSubmit = () => {
    onGenerate({ zodiac, mealType, language, state });
  };

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
      <select value={zodiac} onChange={(e) => setZodiac(e.target.value)} className="p-2 rounded text-black">
        {Object.keys(stateLabels.English).map((sign) => (
          <option key={sign} value={sign}>{sign}</option>
        ))}
      </select>
      <select value={state} onChange={(e) => setState(e.target.value)} className="p-2 rounded text-black">
        {Object.entries(stateLabels[language]).map(([key, label]) => (
          <option key={key} value={key}>{label}</option>
        ))}
      </select>
      <select value={mealType} onChange={(e) => setMealType(e.target.value)} className="p-2 rounded text-black">
        {['breakfast','lunch','dinner','snack','dessert'].map((type) => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>
      <select value={language} onChange={(e) => setLanguage(e.target.value)} className="p-2 rounded text-black">
        <option value="English">English</option>
        <option value="Français">Français</option>
        <option value="العربية">العربية</option>
      </select>
      <button
        onClick={handleSubmit}
        className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded shadow-lg transition"
      >
        🔮 Générer
      </button>
    </div>
  );
}
