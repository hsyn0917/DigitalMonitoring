import { GoogleGenAI } from "@google/genai";
import type { AdverseEvent } from '../types';

// Assume process.env.API_KEY is configured in the environment
if (!process.env.API_KEY) {
  // In a real app, you'd want to handle this more gracefully.
  // For this context, we'll log an error.
  console.error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const getProactiveCareTips = async (events: AdverseEvent[], medication: string, qolScore?: number | null): Promise<string> => {
  const systemInstruction = `あなたは、がん患者さんをサポートするアシスタントです。治療の副作用に対する、医学的ではない一般的なセルフケアのヒントを提供してください。回答はマークダウン形式で、読みやすく、シンプルな箇条書きにし、全体で140字以内に収めてください。重要：いかなる対策を試す前にも、必ず主治医や医療チームに相談するべきであるという免責事項を、回答の最後に必ず太字で含めてください。あなたの回答は、支援的で分かりやすいものにしてください。病状の診断や治療計画の提供は行わないでください。`;

  if (events.length === 0) {
    return "現在報告されている症状はありません。症状を記録すると、あなたに合わせたケアのヒントが表示されます。";
  }

  const symptomsString = events.map(e => `・${e.symptom} (グレード${e.grade})`).join('\n');
  
  let userPrompt = `私の最近の症状と健康状態に基づき、最も重要で実践しやすいセルフケアのヒントを、箇条書きで、全体で140字以内で、簡潔に教えてください。\n\n`;
  userPrompt += `■ 最近の症状\n${symptomsString}\n\n`;

  if (medication && medication !== '特になし' && medication !== "経過観察") {
    userPrompt += `■ 服用中の薬剤\n${medication}\n\n`;
  }
  
  if (qolScore !== null && qolScore !== undefined) {
    userPrompt += `■ 最新のQOLスコア（全体的な健康状態）\n${qolScore.toFixed(0)} / 100 点\n\n`;
  }

  userPrompt += `これらの情報から、最も優先すべき症状に対する具体的なアドバイスをお願いします。`;


  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.5,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching proactive tips from Gemini API:", error);
    return "申し訳ありません、現在情報を取得できません。しばらくしてからもう一度お試しください。";
  }
};