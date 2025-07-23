import React from 'react';
import { StethoscopeIcon, HomeIcon } from './Icons';

interface HeaderProps {
    onGoHome: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onGoHome }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <StethoscopeIcon className="h-8 w-8 text-teal-600" />
            <h1 className="ml-3 text-2xl font-bold text-slate-800">
              ケアサポート
            </h1>
          </div>
          <button 
             onClick={onGoHome} 
             className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-slate-600 bg-slate-100 rounded-md hover:bg-slate-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
             aria-label="ホームに戻る"
          >
            <HomeIcon className="w-5 h-5" />
            ホームに戻る
          </button>
        </div>
      </div>
    </header>
  );
};
