'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing personalized recommendations
 * for activities and attractions near the hotel based on the user's profile and preferences.
 *
 * The flow uses a prompt to generate recommendations based on user profile and preferences.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendationPreferencesSchema = z.object({
  interests: z.string().describe('A comma separated list of user interests, e.g., history, art, hiking'),
  budget: z.string().describe('The user\u2019s budget, e.g., low, medium, high'),
  travelStyle: z.string().describe('The user\u2019s travel style, e.g., adventurous, relaxed, cultural'),
});

export type RecommendationPreferences = z.infer<typeof RecommendationPreferencesSchema>;

const RecommendationResponseSchema = z.object({
  recommendations: z.array(z.string()).describe('A list of personalized recommendations for activities and attractions.'),
});

export type RecommendationResponse = z.infer<typeof RecommendationResponseSchema>;


export async function generatePersonalizedRecommendations(preferences: RecommendationPreferences): Promise<RecommendationResponse> {
  return personalizedRecommendationFlow(preferences);
}

const personalizedRecommendationPrompt = ai.definePrompt({
  name: 'personalizedRecommendationPrompt',
  input: {schema: RecommendationPreferencesSchema},
  output: {schema: RecommendationResponseSchema},
  prompt: `You are a personalized travel recommendation expert. Based on the user's preferences, provide a list of activities and attractions near the hotel.

  User Preferences:
  Interests: {{{interests}}}
  Budget: {{{budget}}}
  Travel Style: {{{travelStyle}}}

  Recommendations:
  `,
});

const personalizedRecommendationFlow = ai.defineFlow(
  {
    name: 'personalizedRecommendationFlow',
    inputSchema: RecommendationPreferencesSchema,
    outputSchema: RecommendationResponseSchema,
  },
  async preferences => {
    const {output} = await personalizedRecommendationPrompt(preferences);
    return output!;
  }
);
