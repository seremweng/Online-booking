'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getRecommendations, State } from './actions';
import { List, Loader2, Wand2 } from 'lucide-react';
import React from 'react';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full" aria-disabled={pending} disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Wand2 className="mr-2 h-4 w-4" />
          Get Recommendations
        </>
      )}
    </Button>
  );
}

export function RecommendationsForm() {
  const initialState: State = { message: null, errors: {} };
  const [state, dispatch] = useFormState(getRecommendations, initialState);

  return (
    <div>
        <form action={dispatch} className="space-y-6">
        <div className="space-y-2">
            <Label htmlFor="interests">Interests</Label>
            <Input
            id="interests"
            name="interests"
            placeholder="e.g., history, art, hiking, food"
            aria-describedby="interests-error"
            />
            <div id="interests-error" aria-live="polite" aria-atomic="true">
            {state.errors?.interests &&
                state.errors.interests.map((error: string) => (
                <p className="mt-2 text-sm text-destructive" key={error}>
                    {error}
                </p>
                ))}
            </div>
        </div>

        <div className="space-y-2">
            <Label htmlFor="budget">Budget</Label>
            <Select name="budget" defaultValue="medium">
            <SelectTrigger id="budget">
                <SelectValue placeholder="Select your budget" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
            </SelectContent>
            </Select>
        </div>

        <div className="space-y-2">
            <Label htmlFor="travelStyle">Travel Style</Label>
            <Select name="travelStyle" defaultValue="relaxed">
            <SelectTrigger id="travelStyle">
                <SelectValue placeholder="Select your travel style" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="adventurous">Adventurous</SelectItem>
                <SelectItem value="relaxed">Relaxed</SelectItem>
                <SelectItem value="cultural">Cultural</SelectItem>
            </SelectContent>
            </Select>
        </div>

        <SubmitButton />
        </form>

      {state.recommendations && state.recommendations.length > 0 && (
        <div className="mt-8">
            <Card className="bg-primary/5">
                <CardHeader>
                    <CardTitle className="flex items-center text-primary">
                        <Wand2 className="mr-2 h-5 w-5" />
                        Your Personalized Suggestions
                    </CardTitle>
                    <CardDescription>{state.message}</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3">
                        {state.recommendations.map((rec, index) => (
                            <li key={index} className="flex items-start">
                                <List className="h-5 w-5 mr-3 mt-1 text-accent flex-shrink-0" />
                                <span>{rec}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
        )}

        {state.message && !state.recommendations && (
            <div className="mt-4 text-sm text-destructive" aria-live="polite">
                {state.message}
            </div>
        )}
    </div>
  );
}
