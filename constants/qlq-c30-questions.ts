import { QLQC30Question } from '../types';

const F_S_OPTIONS = [
    { value: 1, label: 'まったくない' },
    { value: 2, label: '少しある' },
    { value: 3, label: '多い' },
    { value: 4, label: 'とても多い' },
];

const GQH_OPTIONS = [
    { value: 1, label: '1' }, { value: 2, label: '2' }, { value: 3, label: '3' },
    { value: 4, label: '4' }, { value: 5, label: '5' }, { value: 6, label: '6' },
    { value: 7, label: '7' },
];

export const QLQ_C30_INSTRUCTIONS = "私達は、あなたとあなたの健康状態について関心を持っています。あなたの状態に、もっともよく当てはまる番号一つを選び、全設問にお答え下さい。「正しい」答えや「誤った」答え、といったものはありません。なお、お答え頂いた内容については秘密厳守とさせていただきます。";

export const QLQ_C30_QUESTIONS: QLQC30Question[] = [
  { id: 'q1', question: '重い買い物袋やスーツケースを運ぶなどの力仕事に支障がありますか。', options: F_S_OPTIONS, type: 'functional/symptom' },
  { id: 'q2', question: '長い距離を歩くことに支障がありますか。', options: F_S_OPTIONS, type: 'functional/symptom' },
  { id: 'q3', question: '屋外の短い距離を歩くことに支障がありますか。', options: F_S_OPTIONS, type: 'functional/symptom' },
  { id: 'q4', question: '一日中ベッドやイスで過ごさなければなりませんか。', options: F_S_OPTIONS, type: 'functional/symptom' },
  { id: 'q5', question: '食べること、衣類を着ること、顔や体を洗うこと、トイレを使うことに人の手を借りる必要がありますか。', options: F_S_OPTIONS, type: 'functional/symptom' },
  
  { id: 'q6', sectionHeader: 'この一週間について:', question: '仕事をすることや日常生活活動に支障がありましたか。', options: F_S_OPTIONS, type: 'functional/symptom' },
  { id: 'q7', question: '趣味やレジャーをするのに支障がありましたか。', options: F_S_OPTIONS, type: 'functional/symptom' },
  { id: 'q8', question: '息切れがありましたか。', options: F_S_OPTIONS, type: 'functional/symptom' },
  { id: 'q9', question: '痛みがありましたか。', options: F_S_OPTIONS, type: 'functional/symptom' },
  { id: 'q10', question: '休息をとる必要がありましたか。', options: F_S_OPTIONS, type: 'functional/symptom' },
  { id: 'q11', question: '睡眠に支障がありましたか。', options: F_S_OPTIONS, type: 'functional/symptom' },
  { id: 'q12', question: '体力が弱くなったと感じましたか。', options: F_S_OPTIONS, type: 'functional/symptom' },
  { id: 'q13', question: '食欲がないと感じましたか。', options: F_S_OPTIONS, type: 'functional/symptom' },
  { id: 'q14', question: '吐き気がありましたか。', options: F_S_OPTIONS, type: 'functional/symptom' },
  { id: 'q15', question: '吐きましたか。', options: F_S_OPTIONS, type: 'functional/symptom' },
  { id: 'q16', question: '便秘がありましたか。', options: F_S_OPTIONS, type: 'functional/symptom' },
  { id: 'q17', question: '下痢がありましたか。', options: F_S_OPTIONS, type: 'functional/symptom' },
  { id: 'q18', question: '疲れていましたか。', options: F_S_OPTIONS, type: 'functional/symptom' },
  { id: 'q19', question: '痛みがあなたの日々の活動のさまたげになりましたか。', options: F_S_OPTIONS, type: 'functional/symptom' },
  { id: 'q20', question: 'ものごとに集中しにくいことがありましたか。たとえば新聞を読むときや、テレビを見るとき。', options: F_S_OPTIONS, type: 'functional/symptom' },
  { id: 'q21', question: '緊張した気分でしたか。', options: F_S_OPTIONS, type: 'functional/symptom' },
  { id: 'q22', question: '心配がありましたか。', options: F_S_OPTIONS, type: 'functional/symptom' },
  { id: 'q23', question: '怒りっぽい気分でしたか。', options: F_S_OPTIONS, type: 'functional/symptom' },
  { id: 'q24', question: '落ち込んだ気分でしたか。', options: F_S_OPTIONS, type: 'functional/symptom' },
  { id: 'q25', question: 'もの覚えが悪くなったと思いましたか。', options: F_S_OPTIONS, type: 'functional/symptom' },
  { id: 'q26', question: '身体の調子や治療の実施が、家族の一員としてのあなたの生活のさまたげになりましたか。', options: F_S_OPTIONS, type: 'functional/symptom' },
  { id: 'q27', question: '身体の調子や治療の実施が、あなたの社会的な活動のさまたげになりましたか。', options: F_S_OPTIONS, type: 'functional/symptom' },
  { id: 'q28', question: '身体の調子や治療の実施が、あなたの経済上の問題になりましたか。', options: F_S_OPTIONS, type: 'functional/symptom' },
  
  { id: 'q29', sectionHeader: '次の質問では、1から7の数字のうち、あなたにもっともよく当てはまる数字を選んで下さい。', question: 'この一週間のあなたの健康状態は全体としてどの程度だったでしょうか。', note: '1: とても悪い / 7: とてもよい', options: GQH_OPTIONS, type: 'gqh' },
  { id: 'q30', question: 'この一週間、あなたの全体的な生活の質はどの程度だったでしょうか。', note: '1: とても悪い / 7: とてもよい', options: GQH_OPTIONS, type: 'gqh' },
];