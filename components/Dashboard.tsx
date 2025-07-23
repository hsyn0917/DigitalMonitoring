
import React from 'react';
import type { Patient } from '../types';
import { QOLTracker } from './QOLTracker';
import { SymptomHistory } from './SymptomHistory';
import { GeminiCareTips } from './GeminiCareTips';
import { PlusIcon } from './Icons';
import { calculateQLQC30Scores } from '../utils/scoring';

interface PatientDashboardProps {
  patient: Patient;
  onLogEventClick: () => void;
  onLogQOLClick: () => void;
}

export const PatientDashboard: React.FC<PatientDashboardProps> = ({ patient, onLogEventClick, onLogQOLClick }) => {
  const { adverseEvents, qlqc30Records, name, medication } = patient;
  
  const latestQolRecord = qlqc30Records.length > 0 ? qlqc30Records[0] : null;
  const latestQolScore = latestQolRecord ? calculateQLQC30Scores(latestQolRecord.answers).globalHealthStatus : null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-slate-700">{name}さんのダッシュボード</h2>
        <div className="flex items-stretch gap-3">
           <button
            onClick={onLogEventClick}
            className="flex-1 sm:flex-none justify-center flex items-center gap-2 px-4 py-2 bg-rose-600 text-white font-semibold rounded-lg shadow-md hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition-all duration-200"
          >
            <PlusIcon className="w-5 h-5" />
            症状を報告する
          </button>
          <button
            onClick={onLogQOLClick}
            className="flex-1 sm:flex-none justify-center flex items-center gap-2 px-4 py-2 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-200"
          >
            <PlusIcon className="w-5 h-5" />
            QOLを記録
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <QOLTracker records={qlqc30Records} />
        </div>
        <div className="lg:col-span-1">
          <GeminiCareTips medication={medication} qolScore={latestQolScore} adverseEvents={adverseEvents} />
        </div>
        <div className="lg:col-span-3">
          <SymptomHistory events={adverseEvents} />
        </div>
      </div>
    </div>
  );
};
