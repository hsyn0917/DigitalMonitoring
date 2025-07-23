import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { QLQC30Record } from '../types';
import { Card } from './Card';
import { TrendingUpIcon } from './Icons';
import { calculateQLQC30Scores } from '../utils/scoring';

interface QLQC30ResultsProps {
  records: QLQC30Record[];
}

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-3 bg-white border border-slate-200 rounded-lg shadow-sm">
        <p className="font-semibold text-slate-700">{`日付: ${label}`}</p>
        {payload.map((pld: any) => (
          <div key={pld.dataKey} style={{ color: pld.color }}>
            {`${pld.name}: ${pld.value.toFixed(1)} / 100`}
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const QLQC30Results: React.FC<QLQC30ResultsProps> = ({ records }) => {
  const formattedData = records
    .map(r => ({
      date: new Date(r.date).toLocaleDateString('ja-JP', { month: '2-digit', day: '2-digit' }),
      originalDate: new Date(r.date),
      scores: calculateQLQC30Scores(r.answers),
    }))
    .sort((a,b) => a.originalDate.getTime() - b.originalDate.getTime())
    .map(d => ({
        date: d.date,
        '全体的な健康状態': d.scores.globalHealthStatus,
    }));

  const latestScore = formattedData.length > 0 ? formattedData[formattedData.length - 1]['全体的な健康状態'] : null;

  return (
    <Card>
      <div className="flex items-center mb-2">
        <TrendingUpIcon className="w-6 h-6 text-teal-600 mr-3" />
        <h3 className="text-xl font-bold text-slate-700">QOL (全体的な健康状態) の推移</h3>
      </div>
      {records.length > 1 ? (
         <>
          <p className="text-slate-600 mb-2 text-sm">スコアが高いほど、健康状態が良いことを示します (0-100点)。</p>
          {latestScore !== null &&
            <div className="mb-4 flex items-baseline">
                <p className="text-slate-600 mr-2">最新スコア:</p>
                <p className="text-3xl font-bold text-teal-600">{latestScore.toFixed(0)}</p>
                <p className="text-slate-500 ml-1">/ 100</p>
            </div>
          }
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <LineChart
                data={formattedData}
                margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" stroke="#64748b" />
                <YAxis domain={[0, 100]} stroke="#64748b" />
                <Tooltip content={<CustomTooltip />} />
                <Legend verticalAlign="top" height={36} />
                <Line type="monotone" dataKey="全体的な健康状態" stroke="#14b8a6" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      ) : (
        <div className="text-center py-16 text-slate-500">
          <p>QOLアンケートの記録がまだ1件以下です。</p>
          <p className="mt-1">記録が2件以上になると、推移グラフが表示されます。</p>
        </div>
      )}
    </Card>
  );
};