import React, { useState, useCallback } from 'react';
import { Patient, QLQC30Answers, AdverseEvent } from './types';
import { DEFAULT_SYMPTOMS } from './constants';
import { Header } from './components/Header';
import { PatientDashboard } from './components/PatientDashboard';
import { ClinicianDashboard } from './components/ClinicianDashboard';
import { EventLogModal } from './components/EventLogModal';
import { RoleSelection } from './components/RoleSelection';
import { QLQC30Survey } from './components/QLQC30Survey';

// --- Mock Data ---
const initialPatients: Patient[] = [
  {
    id: 'p1',
    name: '田中 太郎',
    medication: 'オシメルチニブ (タグリッソ)',
    adverseEvents: [
      { id: 'evt1', date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), symptom: '下痢', grade: 2, notes: '1日に4〜6回の排便があった。' },
      { id: 'evt2', date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), symptom: '発疹・乾燥肌', grade: 2, notes: '顔と胸に発疹が広がり、かゆみがある。' },
      { id: 'evt3', date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), symptom: '口内炎', grade: 1, notes: '少ししみるが、食事は普通に摂れる。' },
    ].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    qlqc30Records: [
      { id: 'qol1', date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), answers: { q1: 2, q2: 2, q3: 1, q4: 1, q5: 2, q6: 2, q7: 1, q8: 2, q9: 3, q10: 2, q11: 2, q12: 1, q13: 1, q14: 2, q15: 1, q16: 2, q17: 2, q18: 3, q19: 1, q20: 1, q21: 2, q22: 2, q23: 1, q24: 1, q25: 2, q26: 2, q27: 1, q28: 3, q29: 5, q30: 5 } },
      { id: 'qol2', date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), answers: { q1: 2, q2: 3, q3: 2, q4: 2, q5: 3, q6: 3, q7: 2, q8: 3, q9: 3, q10: 3, q11: 3, q12: 2, q13: 2, q14: 3, q15: 2, q16: 3, q17: 3, q18: 4, q19: 2, q20: 2, q21: 3, q22: 3, q23: 2, q24: 2, q25: 3, q26: 3, q27: 2, q28: 4, q29: 4, q30: 4 } },
    ].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
  },
  {
    id: 'p2',
    name: '佐藤 花子',
    medication: 'オシメルチニブ (タグリッソ)',
    adverseEvents: [
      { id: 'evt4', date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), symptom: '倦怠感', grade: 3, notes: 'ほとんど一日中横になっている必要がある。' },
      { id: 'evt5', date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), symptom: '食欲不振', grade: 2, notes: '食事量が半分以下になった。' },
    ].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    qlqc30Records: [
       { id: 'qol4', date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), answers: { q1: 3, q2: 3, q3: 2, q4: 2, q5: 3, q6: 4, q7: 3, q8: 4, q9: 4, q10: 4, q11: 4, q12: 3, q13: 3, q14: 4, q15: 3, q16: 4, q17: 4, q18: 4, q19: 3, q20: 3, q21: 4, q22: 4, q23: 3, q24: 3, q25: 4, q26: 4, q27: 3, q28: 4, q29: 3, q30: 2 } },
    ].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
  },
    {
    id: 'p3',
    name: '鈴木 一郎',
    medication: '経過観察',
    adverseEvents: [
        { id: 'evt6', date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), symptom: '痛み', grade: 1, notes: '時々軽い痛みがある。' },
    ].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    qlqc30Records: [
       { id: 'qol6', date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(), answers: { q1: 1, q2: 1, q3: 1, q4: 1, q5: 1, q6: 1, q7: 1, q8: 1, q9: 1, q10: 1, q11: 1, q12: 1, q13: 1, q14: 1, q15: 1, q16: 1, q17: 1, q18: 1, q19: 1, q20: 1, q21: 1, q22: 1, q23: 1, q24: 1, q25: 1, q26: 1, q27: 1, q28: 1, q29: 7, q30: 7 } },
    ].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
  }
];
// --- End Mock Data ---


const App: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [view, setView] = useState<'patient' | 'clinician' | 'selection' | 'qlq-survey'>('selection');

  const [isEventModalOpen, setEventModalOpen] = useState(false);
  
  const handleAddAdverseEvent = useCallback((event: Omit<AdverseEvent, 'id' | 'date'>) => {
    setPatients(prevPatients => {
        const updatedPatients = [...prevPatients];
        const patientToUpdate = updatedPatients[0]; // For demo, always update the first patient
        const newEvents: AdverseEvent[] = [{ ...event, id: `evt${Date.now()}`, date: new Date().toISOString() }, ...patientToUpdate.adverseEvents];
        updatedPatients[0] = { ...patientToUpdate, adverseEvents: newEvents };
        return updatedPatients;
    });
    setEventModalOpen(false);
  }, []);

  const handleAddQLQC30Record = useCallback((answers: QLQC30Answers) => {
    setPatients(prevPatients => {
        const updatedPatients = [...prevPatients];
        const patientToUpdate = updatedPatients[0]; // For demo, always update the first patient
        const newRecord = { answers, id: `qol${Date.now()}`, date: new Date().toISOString() };
        const newRecords = [newRecord, ...patientToUpdate.qlqc30Records];
        updatedPatients[0] = { ...patientToUpdate, qlqc30Records: newRecords };
        return updatedPatients;
    });
    setView('patient');
  }, []);
  
  // For demo purposes, we'll use the first patient for the patient view.
  const currentPatient = patients[0];

  const renderContent = () => {
    switch (view) {
      case 'patient':
        return (
          <PatientDashboard
            patient={currentPatient}
            onLogEventClick={() => setEventModalOpen(true)}
            onStartQLQSurveyClick={() => setView('qlq-survey')}
          />
        );
      case 'clinician':
        return <ClinicianDashboard patients={patients} />;
      case 'qlq-survey':
        return (
          <QLQC30Survey 
            onSubmit={handleAddQLQC30Record}
          />
        );
      case 'selection':
      default:
        return <RoleSelection onSelectRole={setView} />;
    }
  };


  return (
    <div className="min-h-screen bg-slate-50">
      {view !== 'selection' && <Header onGoHome={() => setView('selection')} />}
      <main className="p-4 sm:p-6 lg:p-8">
        {renderContent()}
      </main>
      
      {view === 'patient' && isEventModalOpen && (
        <EventLogModal
          onClose={() => setEventModalOpen(false)}
          onSubmit={handleAddAdverseEvent}
          symptoms={DEFAULT_SYMPTOMS}
        />
      )}
    </div>
  );
};

export default App;