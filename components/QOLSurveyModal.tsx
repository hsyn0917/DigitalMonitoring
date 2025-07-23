
import React, { useState } from 'react';
import { XIcon } from './Icons';

interface QOLSurveyModalProps {
  onClose: () => void;
  onSubmit: (record: { score: number }) => void;
}

export const QOLSurveyModal: React.FC<QOLSurveyModalProps> = ({ onClose, onSubmit }) => {
  const [score, setScore] = useState(7);
  
  const qolLabels: { [key: number]: string } = {
    1: '非常に悪い',
    2: 'かなり悪い',
    3: '悪い',
    4: '少し悪い',
    5: 'どちらでもない',
    6: '少し良い',
    7: '良い',
    8: 'かなり良い',
    9: '非常に良い',
    10: '最高に良い',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ score });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md animate-fade-in-up">
        <div className="p-5 border-b border-slate-200 flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-800">QOL(生活の質)を記録する</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <XIcon className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-6 text-center">
            <label htmlFor="qol-score" className="block text-sm font-medium text-slate-700 mb-2">
              過去1週間の全般的な体調や気分はどうでしたか？
              <div className="mt-2 text-slate-500">
                (1: 最も悪い状態, 10: 最も良い状態)
              </div>
            </label>
            <div className="my-6">
                <span className="text-5xl font-bold text-teal-600">{score}</span>
                {qolLabels[score] && <span className="ml-3 text-lg text-slate-600 font-medium">{qolLabels[score]}</span>}
            </div>
            <input 
              type="range" 
              id="qol-score" 
              min="1" 
              max="10" 
              value={score} 
              onChange={e => setScore(parseInt(e.target.value, 10))} 
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600" 
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1 px-1">
                <span>1</span>
                <span>5</span>
                <span>10</span>
            </div>
          </div>
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-white border border-slate-300 text-slate-700 font-semibold rounded-md shadow-sm hover:bg-slate-50 mr-3">キャンセル</button>
            <button type="submit" className="px-4 py-2 bg-teal-600 text-white font-semibold rounded-md shadow-sm hover:bg-teal-700">記録する</button>
          </div>
        </form>
      </div>
    </div>
  );
};
