export type MonsterType = 
  | 'Bête'
  | 'Bête Mythique'
  | 'Artificiel'
  | 'Bête Spirituelle'
  | 'Non-mort'
  | 'Mécanique'
  | 'Spirtituel'
  | 'Dragonique'
  | 'Humanoïde'
  | 'Divin'
  | 'Outremonde'
  | 'Amorphe';

export type MonsterClass = 1 | 2 | 3 | 4 | 5 | 6;

export type LootRarity = 1 | 2 | 3 | 4;

export interface Talent {
  nom: string;
  niveauRequis: number; // Niveau minimum pour débloquer ce talent
}

export interface Loot {
  nom: string;
  rarete: LootRarity;
  description?: string;
  percentage?: number; // Pourcentage spécifique de drop, sur 100 (optionnel)
  percentageMin?: number; // Pourcentage min de drop (optionnel)
}

export interface MonsterStats {
    Vitalité: number;
    Agilité: number;
    Mentalité: number;
    Force: number;
}

export interface Monster {
  id: string;
  nom: string;
  type: MonsterType;
  classe: MonsterClass;
  modificateurPV: [ number, number];
  modificateurDEF?: number;
  stats: MonsterStats;
  talents: Talent[];
  butins: Loot[];
  description?: string;
  experience: number; // XP donné par ce monstre (à définir plus tard)
}

export interface MonsterWithLevel extends Monster {
  niveau: number;
  pv: number;
  experience: number; // XP donné par ce monstre à ce niveau
  talentsActifs: Talent[]; // Talents disponibles au niveau actuel
  dropChances: { // Chances de drop par rareté au niveau actuel
    rarete1: number;
    rarete2: number;
    rarete3: number;
    rarete4: number;
  };
}

// Fonction pour calculer les PV au niveau 1 (identique pour toutes les classes)
export const calculateLevel1HP = (vitalite: number): number => {
  return Math.floor(vitalite * 0.3);
};

// Fonction pour calculer le modificateur de DEF basé sur la Vitalité
// Formule: 2.25 / (Vitalité * 0.1)
// Min: 0.3, Max: 0.8
export const calculateDEFModifier = (vitalite: number): number => {
  const rawValue = 2.25 / (vitalite * 0.1);
  return Math.max(0.3, Math.min(0.8, rawValue));
};

// Fonction pour calculer la moyenne d'instances aléatoires entre 1 et max
const averageRoll = (instances: number, max: number): number => {
  // Moyenne d'un dé entre 1 et max est (1 + max) / 2
  return Math.ceil(instances * ((1 + max) / 2));
};

// Formules de calcul de PV par classe
// Pour les classes 1 et 2 : nouvelle formule basée sur le niveau 1 + jets aléatoires
// modPV[0] = dé à lancer, modPV[1] = bonus fixe à partir du niveau 17
// Pour les classes 3-6 : anciennes formules (à confirmer)
export const HP_FORMULAS: Record<MonsterClass, (niveau: number, modPV: [number, number], vitalite: number) => number> = {
  1: (niveau, modPV, vitalite) => {
    const level1HP = calculateLevel1HP(vitalite);
    if (niveau === 1) return level1HP;
    
    if (niveau <= 16) {
      // Niv2-16: PV niveau 1 + (niveau - 1) jets entre 1 et modPV[0]
      const additionalHP = averageRoll(niveau - 1, modPV[0]) + niveau*5;
      return level1HP + additionalHP;
    } else {
      // Niv17-20: PV niveau 1 + 15 jets + (21 - niveau) jets + bonus fixe modPV[1]
      const baseRolls = averageRoll(15, modPV[0]);
      const extraRolls = averageRoll((niveau - 16), modPV[0]);
      const fixedBonus = modPV[1] + niveau*5; // Bonus fixe pour niveau 17+
      return level1HP + baseRolls + extraRolls + fixedBonus;
    }
  },
  2: (niveau, modPV, vitalite) => {
    const level1HP = calculateLevel1HP(vitalite);
    if (niveau === 1) return level1HP;
    
    if (niveau <= 16) {
      // Niv2-16: PV niveau 1 + (niveau - 1) jets entre 1 et modPV[0]
      const additionalHP = averageRoll(niveau - 1, modPV[0]) + niveau*5;
      return level1HP + additionalHP;
    } else {
      // Niv17-20: PV niveau 1 + 15 jets + (niveau - 16) jets supplémentaires + bonus fixe modPV[1]
      const baseRolls = averageRoll(15, modPV[0]);
      const extraRolls = averageRoll(niveau - 16, modPV[0]);
      const fixedBonus = modPV[1] + niveau*5; // Bonus fixe pour niveau 17+
      return level1HP + baseRolls + extraRolls + fixedBonus;
    }
  },
  // Classe 3
  3: (niveau, modPV, vitalite) => {
    const level1HP = calculateLevel1HP(vitalite);
    if (niveau === 1) return level1HP;
    
    if (niveau <= 10) {
      // Niv2-10: PV niveau 1 + (niveau - 1) jets
      const additionalHP = averageRoll(niveau - 1, modPV[0]) + niveau*5;
      console.log(additionalHP)
      return level1HP + additionalHP;
    } else if (niveau <= 16) {
      // Niv11-16: PV niveau 1 + 9 jets + (niveau - 10) jets + modPV[1]
      const baseRolls = averageRoll(9, modPV[0]);
      const extraRolls = averageRoll(niveau - 10, modPV[0]);
      const fixedBonus = modPV[1] + niveau*5;
      console.log(baseRolls, extraRolls)
      return level1HP + baseRolls + extraRolls + fixedBonus;
    } else {
      // Niv17-20: PV niveau 1 + 15 jets + (niveau - 16) jets + 2*modPV[1]
      const baseRolls = averageRoll(15, modPV[0]);
      const extraRolls = averageRoll(niveau - 16, modPV[0]);
      const fixedBonus = 1.5 * modPV[1] + niveau*5;
      console.log(baseRolls, extraRolls)
      return level1HP + baseRolls + extraRolls + fixedBonus;
    }
  },
  // Classe 4
  4: (niveau, modPV, vitalite) => {
    const level1HP = calculateLevel1HP(vitalite);
    if (niveau === 1) return level1HP;
    
    if (niveau <= 10) {
      // Niv2-10: PV niveau 1 + (niveau - 1) jets
      const additionalHP = averageRoll(niveau - 1, modPV[0]) + niveau*5;
      return level1HP + additionalHP;
    } else if (niveau <= 16) {
      // Niv11-16: PV niveau 1 + 9 jets + (niveau - 10) jets + modPV[1]
      const baseRolls = averageRoll(9, modPV[0]);
      const extraRolls = averageRoll(niveau - 10, modPV[0]);
      const fixedBonus = modPV[1] + niveau*5;
      return level1HP + baseRolls + extraRolls + fixedBonus;
    } else {
      // Niv17-20: PV niveau 1 + 15 jets + (niveau - 16) jets + 2*modPV[1]
      const baseRolls = averageRoll(15, modPV[0]);
      const extraRolls = averageRoll(niveau - 16, modPV[0]);
      const fixedBonus = 1.5 * modPV[1] + niveau*5;
      return level1HP + baseRolls + extraRolls + fixedBonus;
    }
  },
  // Classe 5
  5: (niveau, modPV, vitalite) => {
    const level1HP = calculateLevel1HP(vitalite);
    if (niveau === 1) return level1HP;
    
    if (niveau <= 10) {
      // Niv2-10: PV niveau 1 + (niveau - 1) jets
      const additionalHP = averageRoll(niveau - 1, modPV[0]) + niveau*5;
      return level1HP + additionalHP;
    } else if (niveau <= 16) {
      // Niv11-16: PV niveau 1 + 9 jets + (niveau - 10) jets + 2*modPV[1]
      const baseRolls = averageRoll(9, modPV[0]);
      const extraRolls = averageRoll(niveau - 10, modPV[0]);
      const fixedBonus = 1.5 * modPV[1] + niveau*5;
      return level1HP + baseRolls + extraRolls + fixedBonus;
    } else {
      // Niv17-20: PV niveau 1 + 15 jets + 2*(niveau - 16) jets + 2*modPV[1]
      const baseRolls = averageRoll(15, modPV[0]);
      const extraRolls = averageRoll(2 * (niveau - 16), modPV[0]);
      const fixedBonus = 3 * modPV[1] + niveau*5;
      return level1HP + baseRolls + extraRolls + fixedBonus;
    }
  },
  // Classe 6
  6: (niveau, modPV, vitalite) => {
    const level1HP = calculateLevel1HP(vitalite);
    if (niveau === 1) return level1HP;
    
    if (niveau <= 10) {
      // Niv2-10: PV niveau 1 + (niveau - 1) jets + modPV[1]
      const additionalHP = averageRoll(niveau - 1, modPV[0]);
      const fixedBonus = 2 * modPV[1] + niveau*5;
      return level1HP + additionalHP + fixedBonus;
    } else if (niveau <= 16) {
      // Niv11-16: PV niveau 1 + 9 jets + 2*(niveau - 10) jets + 2*modPV[1]
      const baseRolls = averageRoll(9, modPV[0]);
      const extraRolls = averageRoll(2 * (niveau - 10), modPV[0]);
      const fixedBonus =  3 * modPV[1] + niveau*5;
      return level1HP + baseRolls + extraRolls + fixedBonus;
    } else {
      // Niv17-20: PV niveau 1 + 20 jets + 2*(niveau - 16) jets + 2*modPV[1]
      const baseRolls = averageRoll(20, modPV[0]);
      const extraRolls = averageRoll(2 * (niveau - 16), modPV[0]);
      const fixedBonus = 5 * modPV[1] + niveau*5;
      return level1HP + baseRolls + extraRolls + fixedBonus;
    }
  },
};

// Fonction pour calculer les chances de drop selon le niveau
// Au niveau 14: 2% pour rareté 4
// Les autres raretés ont des chances plus élevées
export const calculateDropChances = (niveau: number) => {
  // Formule basée sur niveau 14 = 2% pour rareté 4
  // Interpolation linéaire: niveau 1 = ~0.14%, niveau 20 = ~3%
  const baseChanceRarity4 = Math.max(0, Math.min(100, (niveau * 0.143))); // ~2% au niveau 14
  
  return {
    rarete1: Math.min(100, baseChanceRarity4 * 15), // Rareté 1: beaucoup plus fréquent
    rarete2: Math.min(100, baseChanceRarity4 * 7),  // Rareté 2: fréquent
    rarete3: Math.min(100, baseChanceRarity4 * 3),  // Rareté 3: peu fréquent
    rarete4: baseChanceRarity4,                     // Rareté 4: rare
  };
};

// Fonction pour filtrer les talents selon le niveau
export const getActiveTalents = (talents: Talent[], niveau: number): Talent[] => {
  return talents.filter(talent => talent.niveauRequis <= niveau);
};

// Fonction pour déterminer le palier d'expérience basé sur le niveau
// Paliers : 1, 5, 10, 15, 20
const getExperienceTier = (niveau: number): number => {
  if (niveau < 5) return 1;
  if (niveau < 10) return 5;
  if (niveau < 15) return 10;
  if (niveau < 20) return 15;
  return 20;
};

// Fonction pour calculer l'expérience basée sur des paliers
// L'expérience est multipliée par le niveau du palier
export const calculateExperience = (niveau: number, experience: number): number => {
  const tier = getExperienceTier(niveau);
  return experience * tier;
};
