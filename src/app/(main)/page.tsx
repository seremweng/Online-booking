import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { RoomSearchForm } from '@/components/room-search-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { mockAttractions, mockRooms } from '@/lib/mock-data';
import { RoomCard } from '@/components/room-card';

export default function HomePage() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-sunset');

  return (
    <div className="flex flex-col">
      <section className="relative h-[60vh] md:h-[70vh] w-full flex items-center justify-center">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            priority
            className="object-cover"
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tight">
            Welcome to Dzimbahwe
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl">
            Book your stay at the heart of heritage and experience unparalleled luxury.
          </p>
          <div className="mt-8 max-w-4xl mx-auto">
            <RoomSearchForm />
          </div>
        </div>
      </section>

      <section id="about" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">A Legacy of Warmth</h2>
              <p className="mt-4 text-lg text-foreground/80">
                Nestled near the ancient Great Zimbabwe ruins, Dzimbahwe Hotel offers a unique blend of modern luxury and rich cultural heritage. Our name, inspired by the Shona word for "great house of stone," reflects our commitment to providing a stay that is both grand and deeply rooted in local tradition.
              </p>
              <p className="mt-4 text-lg text-foreground/80">
                From our earthy, sunset-inspired decor to our personalized service, every detail is crafted to make you feel at home, while offering a gateway to the wonders of Zimbabwe.
              </p>
              <Button asChild size="lg" className="mt-6">
                <Link href="/rooms">Explore Our Rooms</Link>
              </Button>
            </div>
            <div className="order-1 md:order-2">
                <Card className="overflow-hidden">
                    <CardContent className="p-0">
                         <Image
                            src="https://picsum.photos/seed/dz7/600/500"
                            alt="Great Zimbabwe Ruins"
                            width={600}
                            height={500}
                            className="w-full h-auto object-cover rounded-lg"
                            data-ai-hint="ancient ruins"
                        />
                    </CardContent>
                </Card>
            </div>
          </div>
        </div>
      </section>

      <section id="featured-rooms" className="py-16 md:py-24 bg-card/50">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-center text-primary">
                Our Accommodations
            </h2>
            <p className="mt-4 text-lg text-center text-muted-foreground max-w-3xl mx-auto">
                Discover your perfect sanctuary. Each room is designed with comfort, elegance, and a touch of African warmth.
            </p>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {mockRooms.map(room => (
                    <RoomCard key={room.id} room={room} />
                ))}
            </div>
        </div>
      </section>


      <section id="attractions" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-center text-primary">
            Discover the Region
          </h2>
          <p className="mt-4 text-lg text-center text-muted-foreground max-w-3xl mx-auto">
            Let us guide you to the most breathtaking experiences our beautiful region has to offer.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {mockAttractions.map((attraction) => (
              <Card key={attraction.id} className="overflow-hidden group">
                <CardContent className="p-0 relative">
                  <Image
                    src={attraction.image.imageUrl}
                    alt={attraction.name}
                    width={400}
                    height={300}
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={attraction.image.imageHint}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <h3 className="absolute bottom-4 left-4 text-xl font-bold font-headline text-white">
                    {attraction.name}
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>
           <div className="text-center mt-12">
                <Button asChild size="lg">
                    <Link href="/recommendations">Get Personal Recommendations</Link>
                </Button>
            </div>
        </div>
      </section>
    </div>
  );
}
