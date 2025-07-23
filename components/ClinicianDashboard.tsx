
import React from 'react';
import type { Patient } from '../types';
import { Card } from './Card';
import { UsersIcon, AlertTriangleIcon } from './Icons';
import { calculateQLQC30Scores } from '../utils/scoring';

interface ClinicianDashboardProps {
  patients: Patient[];
}

const GradeIndicator: React.FC<{ grade: number }> = ({ grade }) => {
    const baseClasses = 'w-4 h-4 rounded-full';
    const colors = [
        'bg-green-400', // Grade 1
        'bg-yellow-400',// Grade 2
        'bg-orange-400',// Grade 3
        'bg-red-500',   // Grade 4
    ];
    return <div className={`${baseClasses} ${colors[grade - 1] || 'bg-slate-300'}`}></div>;
};

export const ClinicianDashboard: React.FC<ClinicianDashboardProps> = ({ patients }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <UsersIcon className="w-7 h-7 text-slate-600" />
        <h2 className="text-2xl font-bold text-slate-700">臨床家向けダッシュボード</h2>
      </div>
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b-2 border-slate-200">
              <tr>
                <th className="p-3 text-sm font-semibold text-slate-500">患者氏名</th>
                <th className="p-3 text-sm font-semibold text-slate-500">主な薬剤</th>
                <th className="p-3 text-sm font-semibold text-slate-500">最新の有害事象</th>
                <th className="p-3 text-sm font-semibold text-slate-500">最新QOLスコア</th>
              </tr>
            </thead>
            <tbody>
              {patients.map(patient => {
                const latestEvent = patient.adverseEvents.length > 0 ? patient.adverseEvents[0] : null;
                const latestQolRecord = patient.qlqc30Records.length > 0 ? patient.qlqc30Records[0] : null;
                
                let latestQolScore: number | null = null;
                if (latestQolRecord) {
                    const scores = calculateQLQC30Scores(latestQolRecord.answers);
                    latestQolScore = scores.globalHealthStatus;
                }

                const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
                const hasHighGradeAlert = patient.adverseEvents.some(
                  event => event.grade >= 3 && new Date(event.date) > sevenDaysAgo
                );

                return (
                  <tr key={patient.id} className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50">
                    <td className="p-3 font-medium text-slate-800">
                      <div className="flex items-center gap-2">
                        {hasHighGradeAlert && (
                           <span title="直近7日以内にGrade3以上の有害事象が報告されています">
                            <AlertTriangleIcon className="w-5 h-5 text-amber-500" />
                           </span>
                        )}
                        {patient.name}
                      </div>
                    </td>
                    <td className="p-3 text-slate-600">{patient.medication}</td>
                    <td className="p-3">
                      {latestEvent ? (
                        <div className="flex items-center gap-3">
                          <GradeIndicator grade={latestEvent.grade} />
                          <div>
                            <p className="font-medium text-slate-700">{latestEvent.symptom}</p>
                            <p className="text-xs text-slate-500">{new Date(latestEvent.date).toLocaleDateString()}</p>
                          </div>
                        </div>
                      ) : (
                        <span className="text-slate-400">記録なし</span>
                      )}
                    </td>
                    <td className="p-3">
                      {latestQolScore !== null ? (
                         <div className="flex items-baseline gap-2">
                           <span className="text-xl font-bold text-teal-600">{latestQolScore.toFixed(0)}</span>
                           <span className="text-sm text-slate-500">/ 100</span>
                         </div>
                      ) : (
                        <span className="text-slate-400">記録なし</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
