import { Monster } from '@/types/monster';

// EXEMPLE DE FORMAT - À compléter avec les bonnes valeurs
export const MONSTERS_DATA: Monster[] = [
  // Bête - Classe 1
  {
    id: 'bete-1-1',
    nom: 'Loup',
    type: 'Bête',
    classe: 1,
    modificateurPV: [6, 10], // [dé à lancer, bonus fixe niveau 17+]
    stats: { 
      Vitalité: 35,  // Utilisé pour calculer PV niveau 1: 40 * 0.3 = 12
      Agilité: 60, 
      Mentalité: 25, 
      Force: 50 
    },
    talents: [
      { nom: 'Odorat aiguisé', niveauRequis: 1 },
      { nom: 'Tactique de meute', niveauRequis: 3 },
      { nom: 'Course rapide', niveauRequis: 5 },
      { nom: 'Morsure féroce', niveauRequis: 10 },
    ],
    butins: [
      { nom: 'Peau de loup', rarete: 1, description: 'Fourrure commune' },
      { nom: 'Croc de loup', rarete: 2, description: 'Dent acérée' },
      { nom: 'Cœur de loup alpha', rarete: 3, description: 'Cœur d\'un chef de meute' },
    ],
    experience: 10,
  },
  {
    id: 'bete-1-2',
    nom: 'Aigle géant',
    type: 'Bête',
    classe: 1,
    modificateurPV: [5, 8],
    stats: { 
      Vitalité: 35,  // 35 * 0.3 = 10.5 → 10 PV au niveau 1
      Agilité: 17, 
      Mentalité: 14, 
      Force: 13 
    },
    talents: [
      { nom: 'Vol', niveauRequis: 1 },
      { nom: 'Vision perçante', niveauRequis: 1 },
      { nom: 'Piqué', niveauRequis: 5 },
      { nom: 'Maîtrise aérienne', niveauRequis: 12 },
    ],
    butins: [
      { nom: 'Plume d\'aigle', rarete: 1 },
      { nom: 'Griffe d\'aigle', rarete: 2 },
      { nom: 'Œil d\'aigle magique', rarete: 4, description: 'Confère une vision supérieure' },
    ],
    experience: 10,
  },

  // Bête - Classe 2
  {
    id: 'bete-2-1',
    nom: 'Tigre à dents de sabre',
    type: 'Bête',
    classe: 2,
    modificateurPV: [8, 12],
    stats: { 
      Vitalité: 50,  // 50 * 0.3 = 15 PV au niveau 1
      Agilité: 14, 
      Mentalité: 12, 
      Force: 18 
    },
    talents: [
      { nom: 'Bond', niveauRequis: 1 },
      { nom: 'Morsure perforante', niveauRequis: 1 },
      { nom: 'Camouflage', niveauRequis: 4 },
      { nom: 'Traqueur', niveauRequis: 7 },
      { nom: 'Rage du prédateur', niveauRequis: 15 },
    ],
    butins: [
      { nom: 'Fourrure de tigre', rarete: 2 },
      { nom: 'Dent de sabre', rarete: 3, description: 'Grande canine acérée' },
      { nom: 'Essence de prédateur', rarete: 4, description: 'Essence pure de chasseur' },
    ],
    experience: 20,
  },

  {
    id: 'artificiel-2-1',
    nom: "Attrapeur",
    type: 'Artificiel',
    classe: 2,
    modificateurPV: [4, 20],
    stats: {
      Vitalité: 20,
      Agilité: 70,
      Mentalité: 25,
      Force: 20

    },
    talents: [
      { nom: "Double Action", niveauRequis: 1 },
      { nom: "Lancer d'épine", niveauRequis: 1 },
      { nom: "Griffure", niveauRequis: 1 },
      { nom: "Corps de Pique", niveauRequis: 10 },
    ],
    butins: [
      { nom: "Passe Ascenseur", rarete: 4, description: "Permet de monter dans les ascenseurs automatiques.", percentage: 25 },
    ],
    experience: 38,
  },
  {
    id: 'artificiel-3-1',
    nom: "Chimère Incomplète",
    type: 'Artificiel',
    classe: 3,
    modificateurPV: [10, 80],
    stats: {
      Vitalité: 50,
      Agilité: 30,
      Mentalité: 30,
      Force: 80

    },
    talents: [
      { nom: "Coup de Griffe", niveauRequis: 1 },
      { nom: "Coup de Corne", niveauRequis: 1 },
      { nom: "Souffle", niveauRequis: 1 },
      { nom: "Vol", niveauRequis: 7 },
      { nom: "Rugissement Terrifiant", niveauRequis: 9 },
      { nom: "Oeil Pétrifiant", niveauRequis: 12 },
      { nom: "Évolution", niveauRequis: 15 },
    ],
    butins: [
      { nom: "Passe Ascenseur", rarete: 4, description: "Permet de monter dans les ascenseurs automatiques.", percentage: 25 },
    ],
    experience: 150,
  },
  {
    id: 'artificiel-5-1',
    nom: "Chimère",
    type: 'Artificiel',
    classe: 5,
    modificateurPV: [20, 160],
    stats: {
      Vitalité: 70,
      Agilité: 55,
      Mentalité: 45,
      Force: 90

    },
    talents: [
      { nom: "Coup de Griffe", niveauRequis: 1 },
      { nom: "Coup de Corne", niveauRequis: 1 },
      { nom: "Souffle", niveauRequis: 1 },
      { nom: "Vol", niveauRequis: 1 },
      { nom: "Rugissement Terrifiant", niveauRequis: 7 },
      { nom: "Oeil Pétrifiant", niveauRequis: 9 },
      { nom: "Triple Action", niveauRequis: 12 },
      { nom: "Explosion du Noyau", niveauRequis: 15 },
    ],
    butins: [
      { nom: "Passe Ascenseur", rarete: 4, description: "Permet de monter dans les ascenseurs automatiques.", percentage: 25 },
    ],
    experience: 250,
  },
];
