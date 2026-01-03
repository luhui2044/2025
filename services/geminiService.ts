
import { GoogleGenAI, Type } from "@google/genai";

// 助手函数：安全获取 API Key 并在使用时初始化客户端
const getAiClient = () => {
  // 兼容性处理：如果 process 不存在则使用空字符串，防止报错导致白屏
  const apiKey = typeof process !== 'undefined' ? process.env.API_KEY : '';
  return new GoogleGenAI({ apiKey: apiKey });
};

export const generateStudyPlan = async (goal: string, subject: string, days: number) => {
  const ai = getAiClient();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `你是一位资深的中学生学习教练。请为目标 "${goal}"（科目：${subject}）制定一个为期 ${days} 天的详细分步学习计划。请务必使用中文回答。`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          steps: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING, description: "步骤标题，使用中文" },
                duration: { type: Type.STRING, description: "预计时长，例如：45分钟" },
              },
              required: ["title", "duration"]
            }
          }
        },
        required: ["steps"]
      }
    }
  });

  return JSON.parse(response.text);
};

export const breakDownTask = async (taskTitle: string) => {
  const ai = getAiClient();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `请将这个学习任务拆解为 3-5 个适合中学生的操作小步骤，使用中文回答： "${taskTitle}"`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "子步骤标题，使用中文" }
          },
          required: ["title"]
        }
      }
    }
  });

  return JSON.parse(response.text);
};

export const getMotivationalTip = async (stats: string) => {
    const ai = getAiClient();
    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `根据学生当前状态： "${stats}"，给出一句简短（1句）、鼓励且酷酷的动力语录。语调要符合13岁学生的口味，使用中文回答。`,
    });
    return response.text;
};
