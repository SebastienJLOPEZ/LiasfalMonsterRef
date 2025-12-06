import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800">
      <main className="container mx-auto px-4 py-16">
        {/* En-tête */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-amber-400 via-purple-400 to-amber-400 bg-clip-text text-transparent">
            Livre de Référence de Liasfal
          </h1>
          <p className="text-xl text-slate-300">
            Votre guide complet pour le monde de Liasfal
          </p>
        </div>

        {/* Cartes de navigation */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Carte Bestiaire */}
          <Link href="/monsters">
            <div className="group bg-gradient-to-br from-amber-900/50 to-slate-800/70 backdrop-blur-sm rounded-2xl p-8 border-2 border-amber-700/50 hover:border-amber-500 transition-all duration-300 cursor-pointer hover:scale-105 shadow-2xl hover:shadow-amber-500/30">
              <div className="mb-4">
                <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-amber-500/30 transition-colors">
                  <span className="text-4xl">🐉</span>
                </div>
                <h2 className="text-3xl font-bold text-amber-400 mb-3">
                  Bestiaire
                </h2>
                <p className="text-slate-300 mb-4">
                  Explorez tous les monstres de Liasfal, organisés par type et classe.
                </p>
              </div>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>✦ Navigation par type de créature</li>
                <li>✦ Classification par classe (1-6)</li>
                <li>✦ Statistiques détaillées</li>
                <li>✦ Talents et capacités</li>
              </ul>
              <div className="mt-6 text-amber-400 font-medium group-hover:text-amber-300 flex items-center gap-2">
                Voir le bestiaire
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </Link>

          {/* Carte Calculateur */}
          <Link href="/calculator">
            <div className="group bg-gradient-to-br from-purple-900/50 to-slate-800/70 backdrop-blur-sm rounded-2xl p-8 border-2 border-purple-700/50 hover:border-purple-500 transition-all duration-300 cursor-pointer hover:scale-105 shadow-2xl hover:shadow-purple-500/30">
              <div className="mb-4">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-500/30 transition-colors">
                  <span className="text-4xl">⚔️</span>
                </div>
                <h2 className="text-3xl font-bold text-purple-400 mb-3">
                  Calculateur
                </h2>
                <p className="text-slate-300 mb-4">
                  Calculez les PV et consultez les talents d&apos;un monstre selon son niveau.
                </p>
              </div>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>✦ Sélection de monstre</li>
                <li>✦ Calcul de PV par niveau</li>
                <li>✦ Formules spécifiques par classe</li>
                <li>✦ Affichage des talents</li>
              </ul>
              <div className="mt-6 text-purple-400 font-medium group-hover:text-purple-300 flex items-center gap-2">
                Ouvrir le calculateur
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Informations supplémentaires */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
            <p className="text-slate-400 mb-2">
              <span className="text-amber-400 font-bold">Formules de PV par classe:</span>
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-slate-300">
              <div>Classe 1: (8 + mod) × niveau</div>
              <div>Classe 2: (10 + mod) × niveau</div>
              <div>Classe 3: (12 + mod) × niveau</div>
              <div>Classe 4: (15 + mod) × niveau</div>
              <div>Classe 5: (20 + mod) × niveau</div>
              <div>Classe 6: (25 + mod) × niveau</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
