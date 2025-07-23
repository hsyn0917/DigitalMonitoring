import React, { useState } from 'react';
import { Card } from './Card';
import { SparklesIcon } from './Icons';
import { getProactiveCareTips } from '../services/geminiService';
import type { AdverseEvent } from '../types';

const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
  const createMarkup = (text: string) => {
    // **bold** => <strong>bold</strong>
    const boldedText = text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-slate-800">$1</strong>');
    return { __html: boldedText };
  };

  const lines = content.split('\n');

  const elements: React.ReactNode[] = [];
  let listItems: string[] = [];

  const flushList = (key: string) => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={key} className="list-disc pl-5 space-y-1">
          {listItems.map((item, i) => (
            <li key={i} dangerouslySetInnerHTML={createMarkup(item)} />
          ))}
        </ul>
      );
      listItems = []; // Clear the array
    }
  };

  lines.forEach((line, index) => {
    if (line.trim() === '') return;

    if (line.startsWith('・') || line.startsWith('* ')) {
      const liContent = line.startsWith('・') ? line.substring(1).trim() : line.substring(2).trim();
      listItems.push(liContent);
    } else {
      flushList(`ul-${index}`);

      if (line.startsWith('#### ')) {
        elements.push(<h4 key={index} className="font-semibold text-md mt-4 mb-2" dangerouslySetInnerHTML={createMarkup(line.substring(5))} />);
      } else if (line.startsWith('### ')) {
        elements.push(<h3 key={index} className="font-bold text-lg mt-4 mb-2" dangerouslySetInnerHTML={createMarkup(line.substring(4))} />);
      } else if (line.startsWith('## ')) {
        elements.push(<h2 key={index} className="font-bold text-xl mt-6 mb-3" dangerouslySetInnerHTML={createMarkup(line.substring(3))} />);
      } else if (line.includes('必ず主治医や医療チームに相談するべきである')) {
        elements.push(<p key={index} className="mt-4 bg-amber-100 p-3 rounded-md border border-amber-200 text-amber-900 text-sm" dangerouslySetInnerHTML={createMarkup(line)} />);
      } else {
        elements.push(<p key={index} dangerouslySetInnerHTML={createMarkup(line)} />);
      }
    }
  });
  
  flushList('ul-last');

  return (
    <div className="prose prose-sm max-w-none text-slate-600 text-left w-full">
      {elements}
    </div>
  );
};

interface GeminiCareTipsProps {
  medication: string;
  qolScore?: number | null;
  adverseEvents: AdverseEvent[];
}

export const GeminiCareTips: React.FC<GeminiCareTipsProps> = ({ medication, qolScore, adverseEvents }) => {
  const [tips, setTips] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetTips = async () => {
    setIsLoading(true);
    setError(null);
    setTips('');
    
    const recentEvents = adverseEvents.slice(0, 3);

    try {
      const result = await getProactiveCareTips(recentEvents, medication, qolScore);
      setTips(result);
    } catch (err) {
      setError('ヒントの取得中にエラーが発生しました。');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <Card>
      <div className="flex items-center mb-4">
        <SparklesIcon className="w-6 h-6 text-indigo-500 mr-3" />
        <h3 className="text-xl font-bold text-slate-700">AIからのケア提案</h3>
      </div>
      
      {tips === '' && !isLoading && (
        <div className="text-center">
          <p className="text-slate-600 mb-4">あなたの最新の症状とQOLの状態に基づいた、パーソナルなケアのヒントをAIが提案します。</p>
          <button 
            onClick={handleGetTips}
            className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 transition-colors"
          >
            AIからのケア提案を見る
          </button>
        </div>
      )}

      <div className="mt-4 p-4 bg-slate-100 rounded-lg min-h-[150px] flex items-center justify-center">
        {isLoading && <div className="text-center text-slate-500">AIがあなたの状況を分析しています...</div>}
        {error && <div className="text-center text-red-500">{error}</div>}
        {tips && !isLoading && <MarkdownRenderer content={tips} />}
      </div>
    </Card>
  );
};