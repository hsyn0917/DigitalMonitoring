import React, { useState, useMemo } from 'react';
import { QLQC30Answers } from '../types';
import { QLQ_C30_QUESTIONS, QLQ_C30_INSTRUCTIONS } from '../constants/qlq-c30-questions';
import { Card } from './Card';

interface QLQC30SurveyProps {
  onSubmit: (answers: QLQC30Answers) => void;
}

export const QLQC30Survey: React.FC<QLQC30SurveyProps> = ({ onSubmit }) => {
  const [answers, setAnswers] = useState<QLQC30Answers>({});

  const handleAnswerChange = (questionId: string, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = QLQ_C30_QUESTIONS.length;
  const allAnswered = totalQuestions === answeredCount;

  const firstUnansweredId = useMemo(() => {
    if (allAnswered) return null;
    return QLQ_C30_QUESTIONS.find(q => answers[q.id] === undefined)?.id;
  }, [answers, allAnswered]);

  const handleJumpToUnanswered = () => {
    if (firstUnansweredId) {
      const element = document.getElementById(`question-${firstUnansweredId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Focusing can be jarring, but let's highlight it instead
        element.classList.add('animate-pulse', 'bg-amber-50', 'rounded-lg');
        setTimeout(() => {
          element.classList.remove('animate-pulse', 'bg-amber-50', 'rounded-lg');
        }, 1500);
      }
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (allAnswered) {
      onSubmit(answers);
    } else {
      handleJumpToUnanswered();
    }
  };

  return (
    <>
      <Card className="max-w-4xl mx-auto pb-32">
        <div className="mb-6 border-b pb-4">
          <h2 className="text-2xl font-bold text-slate-800">週次QOLアンケート (EORTC QLQ-C30)</h2>
          <p className="mt-2 text-slate-600">{QLQ_C30_INSTRUCTIONS}</p>
        </div>

        <form id="qlq-survey-form" onSubmit={handleSubmit}>
          <div className="space-y-6">
            {QLQ_C30_QUESTIONS.map((q, index) => (
              <div key={q.id} id={`question-${q.id}`} className="py-2 transition-colors duration-1000" tabIndex={-1}>
                {q.sectionHeader && <h3 className="text-lg font-semibold text-slate-700 mt-6 mb-4 pt-4 border-t">{q.sectionHeader}</h3>}
                <fieldset>
                  <legend className="block text-base font-semibold text-slate-700">
                    {`Q${index + 1}. ${q.question}`}
                  </legend>
                  {q.note && <p className="text-sm text-slate-500 mt-1">{q.note}</p>}
                  <div className="mt-4 flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-y-3 gap-x-6">
                    {q.options.map(option => (
                      <div key={option.value} className="flex items-center">
                        <input
                          type="radio"
                          id={`${q.id}-${option.value}`}
                          name={q.id}
                          value={option.value}
                          checked={answers[q.id] === option.value}
                          onChange={() => handleAnswerChange(q.id, option.value)}
                          required
                          className="h-4 w-4 text-teal-600 border-slate-400 focus:ring-teal-500"
                        />
                        <label htmlFor={`${q.id}-${option.value}`} className="ml-2 block text-sm text-slate-700">
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </fieldset>
              </div>
            ))}
          </div>
        </form>
      </Card>

      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-slate-200 shadow-t-xl z-10 animate-fade-in-up">
        <div className="w-full bg-slate-200 h-1">
          <div
            className="bg-teal-500 h-1 rounded-r-full transition-all duration-300 ease-out"
            style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
          ></div>
        </div>
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4 p-3">
          <div className="text-sm text-slate-600">
            <strong className="text-slate-800">{answeredCount}</strong> / {totalQuestions} 問 回答済み
          </div>
          <div className="flex items-center gap-3">
            {!allAnswered && (
              <button
                type="button"
                onClick={handleJumpToUnanswered}
                className="px-4 py-2 text-sm bg-amber-500 text-white font-semibold rounded-md shadow-sm hover:bg-amber-600 transition-colors"
              >
                未回答の質問へ
              </button>
            )}
            <button
              type="submit"
              form="qlq-survey-form"
              className="px-4 py-2 text-sm bg-teal-600 text-white font-semibold rounded-md shadow-sm hover:bg-teal-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
              disabled={!allAnswered}
            >
              回答する
            </button>
          </div>
        </div>
      </div>
    </>
  );
};