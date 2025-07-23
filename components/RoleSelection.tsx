import React from 'react';
import { UserIcon, UsersIcon } from './Icons';

interface RoleSelectionProps {
  onSelectRole: (role: 'patient' | 'clinician') => void;
}

export const RoleSelection: React.FC<RoleSelectionProps> = ({ onSelectRole }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-150px)] animate-fade-in-up">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-800">ケアサポート</h1>
        <p className="mt-2 text-lg text-slate-600">がん治療中のあなたと医療チームをつなぐアプリ</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl">
        <button
          onClick={() => onSelectRole('patient')}
          className="group flex flex-col items-center justify-center p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
        >
          <div className="bg-teal-100 p-6 rounded-full mb-6 group-hover:scale-110 transition-transform">
            <UserIcon className="h-16 w-16 text-teal-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-700">患者様はこちら</h2>
          <p className="mt-2 text-slate-500">日々の体調や症状を記録・管理します。</p>
        </button>
        <button
          onClick={() => onSelectRole('clinician')}
          className="group flex flex-col items-center justify-center p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <div className="bg-indigo-100 p-6 rounded-full mb-6 group-hover:scale-110 transition-transform">
            <UsersIcon className="h-16 w-16 text-indigo-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-700">医療関係者の方はこちら</h2>
          <p className="mt-2 text-slate-500">担当患者の状況をモニタリングします。</p>
        </button>
      </div>
    </div>
  );
};
