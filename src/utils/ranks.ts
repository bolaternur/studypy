export type UserRank = 'F' | 'E' | 'D' | 'C' | 'B' | 'A' | 'S' | 'S+' | 'SS' | 'SS+' | 'SSS' | 'SSS+' | 'GOD' | 'ETERNAL';

export const calculateRank = (level: number): UserRank => {
  if (level >= 101) return 'ETERNAL';
  if (level >= 96) return 'GOD';
  if (level >= 91) return 'SSS+';
  if (level >= 86) return 'SSS';
  if (level >= 81) return 'SS+';
  if (level >= 71) return 'SS';
  if (level >= 61) return 'S+';
  if (level >= 51) return 'S';
  if (level >= 41) return 'A';
  if (level >= 31) return 'B';
  if (level >= 21) return 'C';
  if (level >= 11) return 'D';
  if (level >= 6) return 'E';
  return 'F';
};

/**
 * Ranks read as one continuous climb: muted slate at the bottom, deepening
 * teal through the middle, saturated emerald at the top of the ladder, and
 * finally warm gold — the only place the palette leaves green at all, so
 * reaching it is unmistakable.
 */
export const getRankColor = (rank: UserRank): string => {
  switch (rank) {
    case 'ETERNAL': return 'from-white via-emerald-200 to-teal-100';
    case 'GOD': return 'from-amber-200 via-amber-400 to-amber-600';
    case 'SSS+': return 'from-amber-300 via-emerald-300 to-amber-300';
    case 'SSS': return 'from-emerald-200 to-amber-300';
    case 'SS+': return 'from-emerald-300 to-emerald-500';
    case 'SS': return 'from-emerald-400 to-emerald-600';
    case 'S+': return 'from-emerald-500 to-teal-500';
    case 'S': return 'from-emerald-500 to-teal-600';
    case 'A': return 'from-teal-400 to-teal-600';
    case 'B': return 'from-teal-500 to-teal-700';
    case 'C': return 'from-teal-600 to-teal-800';
    case 'D': return 'from-slate-400 to-teal-700';
    case 'E': return 'from-slate-400 to-slate-600';
    default: return 'from-slate-600 to-slate-800';
  }
};
