
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { QLQC30Record } from '../types';
import { Card } from './Card';
import { TrendingUpIcon } from './Icons';
import { calculateQLQC30Scores } from '../utils/scoring';

interface QOLTrackerProps {
  records: QLQC30Record[];
}

export const QOLTracker: React.FC<QOLTrackerProps> = ({ records }) => {
  const formattedData = records
    .map(r => ({
      date: new Date(r.date).toLocaleDateString('ja-JP', { month: '2-digit', day: '2-digit' }),
      originalDate: new Date(r.date),
      'QOLスコア': calculateQLQC30Scores(r.answers).globalHealthStatus,
    }))
    .sort((a,b) => a.originalDate.getTime() - b.originalDate.getTime());

  const latestScore = formattedData.length > 0 ? formattedData[formattedData.length - 1]['QOLスコア'] : null;

  return (
    <Card>
      <div className="flex items-center mb-4">
        <TrendingUpIcon className="w-6 h-6 text-teal-600 mr-3" />
        <h3 className="text-xl font-bold text-slate-700">QOL (生活の質) の推移</h3>
      </div>
      {records.length > 0 ? (
         <>
          <div className="mb-4 flex items-baseline">
            <p className="text-slate-600 mr-2">最新のスコア:</p>
            <p className="text-3xl font-bold text-teal-600">{latestScore?.toFixed(0)}</p>
            <p className="text-slate-500 ml-1">/ 100</p>
          </div>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <LineChart
                data={formattedData}
                margin={{
                  top: 5, right: 30, left: -10, bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" stroke="#64748b" />
                <YAxis domain={[0, 100]} allowDecimals={false} stroke="#64748b" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '0.5rem'
                  }}
                  formatter={(value: number) => value.toFixed(0)}
                />
                <Legend />
                <Line type="monotone" dataKey="QOLスコア" stroke="#14b8a6" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      ) : (
        <div className="text-center py-16 text-slate-500">
          <p>まだQOLの記録がありません。</p>
          <p className="mt-1">最初の記録を追加してみましょう。</p>
        </div>
      )}
    </Card>
  );
};
