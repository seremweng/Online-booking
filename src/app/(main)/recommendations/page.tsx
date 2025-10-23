import { Lightbulb } from 'lucide-react';
import { RecommendationsForm } from './recommendations-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function RecommendationsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <Lightbulb className="mx-auto h-12 w-12 text-accent" />
        <h1 className="mt-4 text-4xl md:text-5xl font-headline font-bold text-primary">
          Craft Your Perfect Itinerary
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Tell us your travel style, and our AI-powered concierge will suggest personalized activities and attractions near the hotel.
        </p>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <Card>
            <CardHeader>
                <CardTitle>Your Preferences</CardTitle>
                <CardDescription>Help us understand what you're looking for.</CardDescription>
            </CardHeader>
            <CardContent>
                <RecommendationsForm />
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
