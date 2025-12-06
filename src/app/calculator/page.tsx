'use client';

import { useState, useMemo } from 'react';
import { Monster, MonsterWithLevel, HP_FORMULAS, calculateDropChances, getActiveTalents, calculateExperience, calculateDEFModifier } from '@/types/monster';
import { MONSTERS_DATA } from '@/data/monsters';

export default function CalculatorPage() {
  const [selectedMonster, setSelectedMonster] = useState<Monster | null>(null);
  const [niveau, setNiveau] = useState<number>(1);

  // Grouper les monstres par type pour faciliter la sélection
  const monstersByType = MONSTERS_DATA.reduce((acc, monster) => {
    if (!acc[monster.type]) {
      acc[monster.type] = [];
    }
    acc[monster.type].push(monster);
    return acc;
  }, {} as Record<string, Monster[]>);

  // Calculer automatiquement dès que le monstre ou le niveau change
  const calculatedMonster = useMemo<MonsterWithLevel | null>(() => {
    if (!selectedMonster) {
      return null;
    }

    const pv = HP_FORMULAS[selectedMonster.classe](
      niveau, 
      selectedMonster.modificateurPV,
      selectedMonster.stats.Vitalité
    );

    const modificateurDEF = calculateDEFModifier(selectedMonster.stats.Vitalité);
    
    const talentsActifs = getActiveTalents(selectedMonster.talents, niveau);
    const dropChances = calculateDropChances(niveau);
    const experience = calculateExperience(niveau, selectedMonster.experience);
    
    return {
      ...selectedMonster,
      niveau,
      pv,
      modificateurDEF,
      experience,
      talentsActifs,
      dropChances,
    };
  }, [selectedMonster, niveau]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-purple-400">
          Calculateur de Monstre
        </h1>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Section de sélection */}
          <div className="bg-slate-800/70 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
            <h2 className="text-2xl font-bold mb-4 text-purple-300">
              Sélection du Monstre
            </h2>

            {/* Sélecteur de monstre par type */}
            <div className="space-y-4">
              <label className="block">
                <span className="text-slate-300 font-medium mb-2 block">
                  Choisir un monstre:
                </span>
                <select
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                  value={selectedMonster?.id || ''}
                  onChange={(e) => {
                    const monster = MONSTERS_DATA.find(m => m.id === e.target.value);
                    setSelectedMonster(monster || null);
                  }}
                >
                  <option value="">-- Sélectionnez un monstre --</option>
                  {Object.entries(monstersByType).map(([type, monsters]) => (
                    <optgroup key={type} label={type}>
                      {monsters.map(monster => (
                        <option key={monster.id} value={monster.id}>
                          {monster.nom} (Classe {monster.classe})
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </label>

              {/* Sélecteur de niveau */}
              {selectedMonster && (
                <label className="block">
                  <span className="text-slate-300 font-medium mb-2 block">
                    Niveau: {niveau}
                  </span>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={niveau}
                    onChange={(e) => setNiveau(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-purple-500"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-1">
                    <span>1</span>
                    <span>20</span>
                  </div>
                </label>
              )}
            </div>
          </div>

          {/* Résultats du calcul */}
          {calculatedMonster && (
            <div className="bg-gradient-to-br from-purple-800/50 to-slate-800/70 backdrop-blur-sm rounded-lg p-6 border-2 border-purple-500 shadow-2xl shadow-purple-500/30">
              <h2 className="text-3xl font-bold mb-6 text-purple-300 text-center">
                {calculatedMonster.nom} - Niveau {calculatedMonster.niveau}
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Colonne gauche - Statistiques */}
                <div className="space-y-4">
                  <div className="bg-slate-900/50 rounded-lg p-4 border border-purple-700/50">
                    <h3 className="text-xl font-bold text-purple-400 mb-3">
                      Informations
                    </h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-slate-400">Type:</span> <span className="text-white font-medium">{calculatedMonster.type}</span></p>
                      <p><span className="text-slate-400">Classe:</span> <span className="text-white font-medium">{calculatedMonster.classe}</span></p>
                      <p><span className="text-slate-400">Niveau:</span> <span className="text-white font-medium">{calculatedMonster.niveau}</span></p>
                    </div>
                  </div>

                  <div className="bg-red-900/30 rounded-lg p-4 border border-red-700">
                    <h3 className="text-2xl font-bold text-red-400 mb-2">
                      Points de Vie
                    </h3>
                    <p className="text-5xl font-bold text-white text-center">
                      {calculatedMonster.pv}
                    </p>
                    {/* <p className="text-xs text-slate-400 text-center mt-2">
                      Formule classe {calculatedMonster.classe}: ({calculatedMonster.classe === 1 ? '{' : calculatedMonster.classe === 2 ? '10' : calculatedMonster.classe === 3 ? '12' : calculatedMonster.classe === 4 ? '15' : calculatedMonster.classe === 5 ? '20' : '25'} + {calculatedMonster.modificateurPV}) × {calculatedMonster.niveau}
                    </p> */}
                  </div>

                  <div className="bg-blue-900/30 rounded-lg p-4 border border-blue-700">
                    <h3 className="text-xl font-bold text-blue-400 mb-2">
                      Défense
                    </h3>
                    <p className="text-lg text-white">
                      Modificateur: {calculatedMonster.modificateurDEF?.toFixed(2)}
                    </p>
                  </div>

                  {/* Statistiques */}
                  <div className="bg-slate-900/50 rounded-lg p-4 border border-purple-700/50">
                    <h3 className="text-xl font-bold text-purple-400 mb-3">
                      Statistiques
                    </h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <StatBlock label="Vitalité" value={calculatedMonster.stats.Vitalité} />
                      <StatBlock label="Agilité" value={calculatedMonster.stats.Agilité} />
                      <StatBlock label="Mentalité" value={calculatedMonster.stats.Mentalité} />
                      <StatBlock label="Force" value={calculatedMonster.stats.Force} />
                    </div>
                  </div>

                  {/* Expérience */}
                  <div className="bg-amber-900/30 rounded-lg p-4 border border-amber-700">
                    <h3 className="text-xl font-bold text-amber-400 mb-2">
                      Expérience
                    </h3>
                    <p className="text-3xl font-bold text-white text-center">
                      {calculatedMonster.experience} XP
                    </p>
                  </div>
                </div>

                {/* Colonne droite - Talents et Butins */}
                <div className="space-y-4">
                  {/* Talents */}
                  <div className="bg-slate-900/50 rounded-lg p-4 border border-purple-700/50">
                    <h3 className="text-xl font-bold text-purple-400 mb-4">
                      Talents Actifs (Niveau {calculatedMonster.niveau})
                    </h3>
                    {calculatedMonster.talentsActifs.length > 0 ? (
                      <ul className="space-y-3">
                        {calculatedMonster.talentsActifs.map((talent, idx) => (
                          <li 
                            key={idx}
                            className="bg-slate-800/70 p-3 rounded-lg border border-slate-600 hover:border-purple-500 transition-colors"
                          >
                            <div className="flex justify-between items-start">
                              <span className="text-white flex-1">{talent.nom}</span>
                              <span className="text-xs text-slate-400 ml-2">Niv. {talent.niveauRequis}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-slate-400 text-sm">Aucun talent disponible à ce niveau</p>
                    )}
                  </div>

                  {/* Chances de butin */}
                  <div className="bg-slate-900/50 rounded-lg p-4 border border-purple-700/50">
                    <h3 className="text-xl font-bold text-purple-400 mb-4">
                      Butins et Chances de Drop
                    </h3>
                    {calculatedMonster.butins.length > 0 ? (
                      <div className="space-y-2">
                        {calculatedMonster.butins.map((butin, idx) => {
                          // Déterminer le pourcentage de drop
                          let dropChance: number;
                          let isFixed = false;
                          
                          if (butin.percentage !== undefined) {
                            // Pourcentage fixe spécifié
                            dropChance = butin.percentage;
                            isFixed = true;
                          } else if (butin.percentageMin !== undefined) {
                            // Pourcentage variable basé sur le niveau
                            // On peut utiliser une formule linéaire ou celle basée sur la rareté
                            const rarityChance = butin.rarete === 1 ? calculatedMonster.dropChances.rarete1 :
                                               butin.rarete === 2 ? calculatedMonster.dropChances.rarete2 :
                                               butin.rarete === 3 ? calculatedMonster.dropChances.rarete3 :
                                               calculatedMonster.dropChances.rarete4;
                            dropChance = Math.max(butin.percentageMin, rarityChance);
                            isFixed = false;
                          } else {
                            // Utiliser le calcul par rareté par défaut
                            dropChance = butin.rarete === 1 ? calculatedMonster.dropChances.rarete1 :
                                       butin.rarete === 2 ? calculatedMonster.dropChances.rarete2 :
                                       butin.rarete === 3 ? calculatedMonster.dropChances.rarete3 :
                                       calculatedMonster.dropChances.rarete4;
                            isFixed = false;
                          }
                          
                          return (
                            <div 
                              key={idx}
                              className={`p-3 rounded-lg border ${
                                butin.rarete === 1 ? 'bg-gray-800/50 border-gray-600' :
                                butin.rarete === 2 ? 'bg-green-900/30 border-green-700' :
                                butin.rarete === 3 ? 'bg-blue-900/30 border-blue-700' :
                                'bg-purple-900/30 border-purple-700'
                              }`}
                            >
                              <div className="flex justify-between items-start mb-1">
                                <span className={`font-medium ${
                                  butin.rarete === 1 ? 'text-gray-300' :
                                  butin.rarete === 2 ? 'text-green-300' :
                                  butin.rarete === 3 ? 'text-blue-300' :
                                  'text-purple-300'
                                }`}>
                                  {butin.nom}
                                </span>
                                <span className="text-xs opacity-75 ml-2">
                                  {butin.rarete === 1 ? '🔹 R1' :
                                   butin.rarete === 2 ? '🔸 R2' :
                                   butin.rarete === 3 ? '💎 R3' :
                                   '⭐ R4'}
                                </span>
                              </div>
                              {butin.description && (
                                <p className="text-xs opacity-75 mb-2">{butin.description}</p>
                              )}
                              <div className="text-xs font-bold">
                                Chance: {dropChance.toFixed(2)}% {isFixed ? '(Fixe)' : `(Niveau ${calculatedMonster.niveau})`}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-slate-400 text-sm">Aucun butin disponible</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Composant pour l'aperçu du monstre
function MonsterPreview({ monster }: { monster: Monster }) {
  return (
    <div className="space-y-3">
      <div className="flex gap-4">
        <div>
          <p className="text-slate-400 text-sm">Type</p>
          <p className="text-white font-medium">{monster.type}</p>
        </div>
        <div>
          <p className="text-slate-400 text-sm">Classe</p>
          <p className="text-white font-medium">{monster.classe}</p>
        </div>
      </div>
      
      <div className="flex gap-4">
        <div className="bg-red-900/30 px-3 py-2 rounded border border-red-700">
          <p className="text-red-400 text-xs">Mod. PV</p>
          <p className="text-white font-bold">[{monster.modificateurPV[0]}, {monster.modificateurPV[1]}]</p>
        </div>
        <div className="bg-blue-900/30 px-3 py-2 rounded border border-blue-700">
          <p className="text-blue-400 text-xs">Mod. DEF</p>
          <p className="text-white font-bold">+{monster.modificateurDEF}</p>
        </div>
      </div>

      <div>
        <p className="text-slate-400 text-sm mb-2">Talents ({monster.talents.length}):</p>
        <ul className="text-sm space-y-1">
          {monster.talents.slice(0, 5).map((talent, idx) => (
            <li key={idx} className="text-slate-300">
              • {talent.nom} <span className="text-xs text-slate-500">(Niv. {talent.niveauRequis})</span>
            </li>
          ))}
          {monster.talents.length > 5 && (
            <li className="text-slate-500 text-xs">... et {monster.talents.length - 5} autres</li>
          )}
        </ul>
      </div>

      {monster.butins.length > 0 && (
        <div>
          <p className="text-slate-400 text-sm mb-2">Butins ({monster.butins.length}):</p>
          <div className="flex flex-wrap gap-1">
            {monster.butins.slice(0, 5).map((butin, idx) => (
              <span 
                key={idx}
                className={`text-xs px-2 py-1 rounded ${
                  butin.rarete === 1 ? 'bg-gray-700 text-gray-300' :
                  butin.rarete === 2 ? 'bg-green-900/50 text-green-300' :
                  butin.rarete === 3 ? 'bg-blue-900/50 text-blue-300' :
                  'bg-purple-900/50 text-purple-300'
                }`}
              >
                {butin.nom}
              </span>
            ))}
            {monster.butins.length > 5 && (
              <span className="text-xs text-slate-500">+{monster.butins.length - 5}</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Composant pour afficher une statistique
function StatBlock({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-slate-800 p-2 rounded text-center">
      <p className="text-slate-400 text-xs uppercase">{label}</p>
      <p className="text-white font-bold text-lg">{value}</p>
    </div>
  );
}
