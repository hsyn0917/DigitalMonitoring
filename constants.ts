
import { Symptom } from './types';

export const DEFAULT_MEDICATIONS: string[] = [
  "特になし",
  "オシメルチニブ (タグリッソ)",
];

export const DEFAULT_SYMPTOMS: Symptom[] = [
  "下痢",
  "発疹・乾燥肌",
  "爪の変化",
  "口内炎",
  "吐き気・嘔吐",
  "倦怠感",
  "食欲不振",
  "便秘",
  "手足のしびれ",
  "痛み",
  "不眠",
  "気分の落ち込み",
  "その他",
];

export const CTCAE_GRADES: { [key: number]: { title: string; description: string } } = {
  1: {
    title: 'Grade 1 (軽症)',
    description: '症状は軽い。日常生活に支障はない。',
  },
  2: {
    title: 'Grade 2 (中等症)',
    description: '身の回りのことは自分でできるが、日常生活（仕事、家事など）には支障がある。',
  },
  3: {
    title: 'Grade 3 (重症)',
    description: '身の回りのこと（着替え、入浴、食事など）が自分で十分にできない。',
  },
  4: {
    title: 'Grade 4 (生命を脅かす重篤な状態)',
    description: '生命を脅かす状態で、緊急の処置が必要。すぐに医療機関に連絡してください。',
  },
};
