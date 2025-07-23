import React from 'react';
import type { Patient } from '../types';
import { QLQC30Results } from './QLQC30Results';
import { SymptomHistory } from './SymptomHistory';
import { GeminiCareTips } from './GeminiCareTips';
import { PlusIcon, ClipboardCheckIcon } from './Icons';
import { calculateQLQC30Scores } from '../utils/scoring';


interface PatientDashboardProps {
  patient: Patient;
  onLogEventClick: () => void;
  onStartQLQSurveyClick: () => void;
}

export const PatientDashboard: React.FC<PatientDashboardProps> = ({ patient, onLogEventClick, onStartQLQSurveyClick }) => {
  const { adverseEvents, qlqc30Records, name, medication } = patient;
  
  const lastSurveyDate = qlqc30Records.length > 0 ? new Date(qlqc30Records[0].date) : null;
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const needsSurvey = !lastSurveyDate || lastSurveyDate < sevenDaysAgo;
  
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
            onClick={onStartQLQSurveyClick}
            className="relative flex-1 sm:flex-none justify-center flex items-center gap-2 px-4 py-2 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-200"
          >
            {needsSurvey && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500 border-2 border-white"></span>
              </span>
            )}
            <ClipboardCheckIcon className="w-5 h-5" />
            週次QOLアンケート
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="col-span-1">
          <QLQC30Results records={qlqc30Records} />
        </div>
        <div className="col-span-1">
          <SymptomHistory events={adverseEvents} />
        </div>
        <div className="col-span-1">
          <GeminiCareTips 
            medication={medication} 
            qolScore={latestQolScore} 
            adverseEvents={adverseEvents} 
          />
        </div>
      </div>
    </div>
  );
};