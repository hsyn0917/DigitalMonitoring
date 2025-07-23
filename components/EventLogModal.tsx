
import React, { useState } from 'react';
import type { AdverseEvent, Symptom } from '../types';
import { XIcon } from './Icons';
import { CTCAE_GRADES } from '../constants';

interface EventLogModalProps {
  onClose: () => void;
  onSubmit: (event: Omit<AdverseEvent, 'id' | 'date'>) => void;
  symptoms: Symptom[];
}

export const EventLogModal: React.FC<EventLogModalProps> = ({ onClose, onSubmit, symptoms }) => {
  const [symptom, setSymptom] = useState(symptoms[0]);
  const [grade, setGrade] = useState(1);
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ symptom, grade, notes });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md animate-fade-in-up my-8">
        <div className="p-5 border-b border-slate-200 flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-800">症状を報告する</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <XIcon className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-6">
            <div>
              <label htmlFor="symptom" className="block text-sm font-medium text-slate-700 mb-1">症状の種類</label>
              <select id="symptom" value={symptom} onChange={e => setSymptom(e.target.value)} className="mt-1 block w-full py-2 px-3 border border-slate-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                {symptoms.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">症状の程度</label>
              <div className="space-y-2">
                {Object.entries(CTCAE_GRADES).map(([gradeKey, gradeInfo]) => {
                  const gradeValue = parseInt(gradeKey, 10);
                  return (
                    <div
                      key={gradeValue}
                      onClick={() => setGrade(gradeValue)}
                      className={`p-3 border rounded-lg cursor-pointer transition-all ${
                        grade === gradeValue
                          ? 'bg-indigo-50 border-indigo-500 ring-2 ring-indigo-500'
                          : 'bg-white border-slate-300 hover:bg-slate-50'
                      }`}
                      role="radio"
                      aria-checked={grade === gradeValue}
                      tabIndex={0}
                      onKeyDown={(e) => e.key === ' ' || e.key === 'Enter' ? setGrade(gradeValue) : null}
                    >
                      <p className="font-semibold text-slate-800">{gradeInfo.title}</p>
                      <p className="text-sm text-slate-600 mt-1">{gradeInfo.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-slate-700 mb-1">メモ (任意)</label>
              <textarea id="notes" value={notes} onChange={e => setNotes(e.target.value)} rows={3} className="mt-1 block w-full py-2 px-3 border border-slate-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="いつ、どんな状況で症状が出ましたか？"></textarea>
            </div>
          </div>
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-white border border-slate-300 text-slate-700 font-semibold rounded-md shadow-sm hover:bg-slate-50 mr-3">キャンセル</button>
            <button type="submit" className="px-4 py-2 bg-rose-600 text-white font-semibold rounded-md shadow-sm hover:bg-rose-700">報告する</button>
          </div>
        </form>
      </div>
    </div>
  );
};
