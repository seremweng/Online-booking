'use server';

import { generatePersonalizedRecommendations, RecommendationPreferences } from '@/ai/flows/personalized-recommendation';
import { z } from 'zod';

const FormSchema = z.object({
  interests: z.string().min(1, 'Please enter at least one interest.'),
  budget: z.enum(['low', 'medium', 'high']),
  travelStyle: z.enum(['adventurous', 'relaxed', 'cultural']),
});

export type State = {
  message?: string | null;
  recommendations?: string[];
  errors?: {
    interests?: string[];
    budget?: string[];
    travelStyle?: string[];
  }
}

export async function getRecommendations(
  prevState: State,
  formData: FormData,
): Promise<State> {
  const validatedFields = FormSchema.safeParse({
    interests: formData.get('interests'),
    budget: formData.get('budget'),
    travelStyle: formData.get('travelStyle'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Get Recommendations.',
    };
  }

  const preferences: RecommendationPreferences = validatedFields.data;

  try {
    const result = await generatePersonalizedRecommendations(preferences);
    if (result && result.recommendations) {
      return { recommendations: result.recommendations, message: 'Here are your personalized recommendations!' };
    }
    return { message: 'Could not generate recommendations at this time.' };
  } catch (e) {
    console.error(e);
    return { message: 'An unexpected error occurred.' };
  }
}
