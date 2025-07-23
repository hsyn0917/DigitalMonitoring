
import React from 'react';
import type { AdverseEvent } from '../types';
import { Card } from './Card';
import { ClipboardListIcon } from './Icons';

interface SymptomHistoryProps {
  events: AdverseEvent[];
}

const GradeIndicator: React.FC<{ grade: number }> = ({ grade }) => {
    const baseClasses = 'w-4 h-4 rounded-full';
    const colors = [
        'bg-green-400', // Grade 1
        'bg-yellow-400',// Grade 2
        'bg-orange-400',// Grade 3
        'bg-red-500',   // Grade 4
        'bg-red-700',   // Grade 5 (data model might support it)
    ];
    return <div className={`${baseClasses} ${colors[grade - 1] || 'bg-slate-300'}`}></div>;
};

export const SymptomHistory: React.FC<SymptomHistoryProps> = ({ events }) => {
  return (
    <Card>
       <div className="flex items-center mb-4">
        <ClipboardListIcon className="w-6 h-6 text-rose-600 mr-3" />
        <h3 className="text-xl font-bold text-slate-700">症状の記録</h3>
      </div>
      <div className="overflow-x-auto">
        {events.length > 0 ? (
        <table className="w-full text-left">
          <thead className="border-b-2 border-slate-200">
            <tr>
              <th className="p-3 text-sm font-semibold text-slate-500">日付</th>
              <th className="p-3 text-sm font-semibold text-slate-500">症状</th>
              <th className="p-3 text-sm font-semibold text-slate-500">グレード</th>
              <th className="p-3 text-sm font-semibold text-slate-500 hidden sm:table-cell">メモ</th>
            </tr>
          </thead>
          <tbody>
            {events.map(event => (
              <tr key={event.id} className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50">
                <td className="p-3 whitespace-nowrap text-slate-600">{new Date(event.date).toLocaleDateString()}</td>
                <td className="p-3 font-medium text-slate-800">{event.symptom}</td>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <GradeIndicator grade={event.grade} />
                    <span className="text-slate-600 font-medium">G{event.grade}</span>
                  </div>
                </td>
                <td className="p-3 text-slate-500 hidden sm:table-cell max-w-xs truncate" title={event.notes}>{event.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
        ) : (
        <div className="text-center py-16 text-slate-500">
          <p>まだ症状の記録がありません。</p>
          <p className="mt-1">気になる症状があれば報告しましょう。</p>
        </div>
      )}
      </div>
    </Card>
  );
};
