import type { User } from "@/interfaces/user";
import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";

const openaiProvider = createOpenAI({
  apiKey: process.env.OPENAIProvider_API_KEY,
  compatibility: "strict",
});

const AQI_THRESHOLD = 100;

export class AIAgent {
  private userProfile: User;

  constructor(UserProfile: User) {
    this.userProfile = UserProfile;
  }

  async getPersonlizedRecommendations(currentAQI: number): Promise<string[]> {
    const prompt = `
        Given the following user profile and current AQL:
        User: ${JSON.stringify(this.userProfile)}
        Current AQI: ${currentAQI}
        AQI Threshold: ${AQI_THRESHOLD}

        Provide 3 personlized health recommendations considering the user's health conditions and activity level, and the current air quality. Each recommendation should be a short, actionable sentence.
    `;

    const { text } = await generateText({
      model: openaiProvider("gpt-4-turbo"),
      prompt,
    });

    return text
      .split("\n")
      .filter((recommendation) => recommendation.trim() !== "");
  }

  async getDailyChallenge(currentAQI: number): Promise<string> {
    const prompt = `
        Given the following user profile and current AQL:
        User: ${JSON.stringify(this.userProfile)}
        Current AQI: ${currentAQI}
        AQI Threshold: ${AQI_THRESHOLD}

        Provide a daily challenge related to improving air quality or reducing exposure to air pollution. The challengde should be tailored to the user's profile and current air quality conditions.
    `;

    const { text } = await generateText({
      model: openaiProvider("gpt-4-turbo"),
      prompt,
    });

    return text.trim();
  }

  async getImpactAnalysis(
    completedChallenges: number,
    daysTracked: number
  ): Promise<string> {
    const prompt = `
      Given the following user profile and activity data:
      User: ${JSON.stringify(this.userProfile)}
      Completed Challenges: ${completedChallenges}
      Days Tracked: ${daysTracked}

      Provide a brief analysis of the user's environmental impact based on their completed challenges 
      and tracking consistency. Include an estimate of CO2 saved if applicable.
    `;

    const { text } = await generateText({
      model: openaiProvider("gpt-4-turbo"),
      prompt: prompt,
    });

    return text.trim();
  }
}
