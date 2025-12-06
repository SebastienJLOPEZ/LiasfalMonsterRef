'use client';

import { useState } from 'react';
import { Monster, MonsterType, MonsterClass, calculateDEFModifier, calculateLevel1HP } from '@/types/monster';
import { MONSTERS_DATA } from '@/data/monsters';

// Grouper les monstres par type puis par classe
function groupMonsters(monsters: Monster[]) {
  const grouped: Record<MonsterType, Record<MonsterClass, Monster[]>> = {} as Record<MonsterType, Record<MonsterClass, Monster[]>>;
  
  monsters.forEach(monster => {
    if (!grouped[monster.type]) {
      grouped[monster.type] = {} as Record<MonsterClass, Monster[]>;
    }
    if (!grouped[monster.type][monster.classe]) {
      grouped[monster.type][monster.classe] = [];
    }
    grouped[monster.type][monster.classe].push(monster);
  });
  
  return grouped;
}

export default function MonstersPage() {
  const groupedMonsters = groupMonsters(MONSTERS_DATA);
  const [selectedType, setSelectedType] = useState<MonsterType | null>(null);
  const monsterTypes = Object.keys(groupedMonsters) as MonsterType[];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-amber-400">
          Bestiaire de Liasfal
        </h1>
        
        {/* Menu de navigation par type */}
        <nav className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 mb-8 sticky top-0 z-10 border border-slate-700">
          <div className="flex flex-wrap gap-2 justify-center">
            {monsterTypes.map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedType === type
                    ? 'bg-amber-500 text-slate-900'
                    : 'bg-slate-700 hover:bg-slate-600 text-white'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </nav>

        {/* Affichage des monstres */}
        <div className="space-y-12">
          {monsterTypes.map(type => {
            // Filtrer si un type est sélectionné
            if (selectedType && selectedType !== type) return null;
            
            const classesByType = groupedMonsters[type];
            const classes = Object.keys(classesByType).sort() as unknown as MonsterClass[];

            return (
              <section 
                key={type} 
                id={type}
                className="scroll-mt-20"
              >
                <h2 className="text-3xl font-bold mb-6 text-amber-300 border-b-2 border-amber-500 pb-2">
                  {type}
                </h2>
                
                {classes.map(classe => {
                  const monsters = classesByType[classe];
                  
                  return (
                    <div key={`${type}-${classe}`} className="mb-8">
                      <h3 className="text-xl font-semibold mb-4 text-slate-300">
                        Classe {classe}
                      </h3>
                      
                      {/* Grille de monstres - max 5 par ligne */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {monsters.map(monster => (
                          <MonsterCard key={monster.id} monster={monster} />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </section>
            );
          })}
        </div>

        {/* Message si aucun monstre */}
        {selectedType && !groupedMonsters[selectedType] && (
          <div className="text-center text-slate-400 py-12">
            Aucun monstre trouvé pour ce type.
          </div>
        )}
      </div>
    </div>
  );
}

// Composant carte de monstre
function MonsterCard({ monster }: { monster: Monster }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div 
      className="bg-slate-800/70 border border-slate-700 rounded-lg p-4 hover:border-amber-500 transition-all cursor-pointer shadow-lg hover:shadow-amber-500/20"
      onClick={() => setShowDetails(!showDetails)}
    >
      <div className="space-y-2">
        <h4 className="font-bold text-lg text-amber-400">{monster.nom}</h4>
        
        <div className="text-sm text-slate-300">
          <p><span className="text-slate-400">Type:</span> {monster.type}</p>
          <p><span className="text-slate-400">Classe:</span> {monster.classe}</p>
        </div>

        <div className="flex gap-2 text-xs">
          <span className="bg-red-900/50 px-2 py-1 rounded border border-red-700">
            PV: {calculateLevel1HP(monster.stats.Vitalité)}
          </span>
          <span className="bg-blue-900/50 px-2 py-1 rounded border border-blue-700">
            DEF: {calculateDEFModifier(monster.stats.Vitalité).toFixed(2)}
          </span>
          <span className="bg-green-900/50 px-2 py-1 rounded border border-green-700">
            Dé : d{monster.modificateurPV[0]}
          </span>
          {monster.modificateurPV[1] !== 0 && (
            <span className="bg-yellow-900/50 px-2 py-1 rounded border border-yellow-700">
              Dé : d{monster.modificateurPV[1]}
            </span>
          )}
        </div>

        {showDetails && (
          <div className="mt-4 pt-4 border-t border-slate-600 space-y-3 text-sm">
            {/* Statistiques */}
            <div>
              <p className="font-semibold text-amber-300 mb-2">Statistiques:</p>
              <div className="grid grid-cols-2 gap-1 text-xs">
                <span>Vitalité: {monster.stats.Vitalité}</span>
                <span>Agilité: {monster.stats.Agilité}</span>
                <span>Mentalité: {monster.stats.Mentalité}</span>
                <span>Force: {monster.stats.Force}</span>
              </div>
            </div>

            {/* Talents */}
            <div>
              <p className="font-semibold text-amber-300 mb-2">Talents:</p>
              <ul className="space-y-1 text-xs">
                {monster.talents.map((talent, idx) => (
                  <li key={idx} className="text-slate-300">• {talent.nom}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
