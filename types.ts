export interface AdverseEvent {
  id: string;
  date: string;
  symptom: string;
  grade: number; // 1 to 4 (CTCAE Grade)
  notes?: string;
}

export type QLQC30Answers = {
  [key: string]: number;
};

export interface QLQC30Record {
  id: string;
  date: string;
  answers: QLQC30Answers;
}

export interface Patient {
  id:string;
  name: string;
  medication: string;
  adverseEvents: AdverseEvent[];
  qlqc30Records: QLQC30Record[];
}

export type Symptom = string;

export interface QLQC30Question {
    id: string;
    sectionHeader?: string;
    question: string;
    note?: string;
    options: { value: number; label: string }[];
    type: 'functional/symptom' | 'gqh';
}