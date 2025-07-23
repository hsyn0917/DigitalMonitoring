import { QLQC30Answers } from '../types';

interface Scales {
  [key: string]: number[];
}

// Define the questions for each scale
const scales: Scales = {
  physicalFunctioning: [1, 2, 3, 4, 5],
  roleFunctioning: [6, 7],
  emotionalFunctioning: [21, 22, 23, 24],
  cognitiveFunctioning: [20, 25],
  socialFunctioning: [26, 27],
  fatigue: [10, 12, 18],
  nauseaVomiting: [14, 15],
  pain: [9, 19],
  dyspnoea: [8],
  insomnia: [11],
  appetiteLoss: [13],
  constipation: [16],
  diarrhoea: [17],
  financialDifficulties: [28],
  globalHealthStatus: [29, 30],
};

const calculateScaleScore = (
  answers: QLQC30Answers,
  itemIDs: number[],
  range: number,
  isFunctional: boolean = false
): number => {
  const items = itemIDs.map(id => answers[`q${id}`]).filter(item => item !== undefined && item !== null);
  if (items.length === 0) return 0;
  
  const rawScore = items.reduce((sum, val) => sum + val, 0) / items.length;

  if (isFunctional) {
    return (1 - (rawScore - 1) / range) * 100;
  }
  return ((rawScore - 1) / range) * 100;
};

export const calculateQLQC30Scores = (answers: QLQC30Answers | undefined) => {
    if (!answers) {
        return {
            physicalFunctioning: 0, roleFunctioning: 0, emotionalFunctioning: 0,
            cognitiveFunctioning: 0, socialFunctioning: 0, globalHealthStatus: 0,
            fatigue: 0, nauseaVomiting: 0, pain: 0, dyspnoea: 0, insomnia: 0,
            appetiteLoss: 0, constipation: 0, diarrhoea: 0, financialDifficulties: 0,
        };
    }
  return {
    // Functional Scales (higher score is better)
    physicalFunctioning: calculateScaleScore(answers, scales.physicalFunctioning, 3, true),
    roleFunctioning: calculateScaleScore(answers, scales.roleFunctioning, 3, true),
    emotionalFunctioning: calculateScaleScore(answers, scales.emotionalFunctioning, 3, true),
    cognitiveFunctioning: calculateScaleScore(answers, scales.cognitiveFunctioning, 3, true),
    socialFunctioning: calculateScaleScore(answers, scales.socialFunctioning, 3, true),

    // Global Health Status / QoL (higher score is better)
    globalHealthStatus: calculateScaleScore(answers, scales.globalHealthStatus, 6, true),

    // Symptom Scales/Items (higher score is worse)
    fatigue: calculateScaleScore(answers, scales.fatigue, 3),
    nauseaVomiting: calculateScaleScore(answers, scales.nauseaVomiting, 3),
    pain: calculateScaleScore(answers, scales.pain, 3),
    dyspnoea: calculateScaleScore(answers, scales.dyspnoea, 3),
    insomnia: calculateScaleScore(answers, scales.insomnia, 3),
    appetiteLoss: calculateScaleScore(answers, scales.appetiteLoss, 3),
    constipation: calculateScaleScore(answers, scales.constipation, 3),
    diarrhoea: calculateScaleScore(answers, scales.diarrhoea, 3),
    financialDifficulties: calculateScaleScore(answers, scales.financialDifficulties, 3),
  };
};
