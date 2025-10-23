import { Building, Github, Twitter, Youtube } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-card/50">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col items-center text-center">
          <Link href="/" className="flex items-center space-x-2">
            <Building className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold font-headline">
              Dzimbahwe Lodges
            </span>
          </Link>
          <p className="max-w-md mx-auto mt-4 text-muted-foreground">
            Experience the warmth of heritage and luxury.
          </p>
          <div className="flex justify-center mt-6">
            <Link href="#" className="mx-2 text-muted-foreground hover:text-primary" aria-label="Twitter">
              <Twitter className="h-6 w-6" />
            </Link>
            <Link href="#" className="mx-2 text-muted-foreground hover:text-primary" aria-label="Github">
              <Github className="h-6 w-6" />
            </Link>
            <Link href="#" className="mx-2 text-muted-foreground hover:text-primary" aria-label="YouTube">
              <Youtube className="h-6 w-6" />
            </Link>
          </div>
        </div>

        <hr className="my-8 border-border" />

        <div className="flex flex-col items-center sm:flex-row sm:justify-between">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Dzimbahwe Lodges. All Rights Reserved.
          </p>
          <div className="flex mt-3 -mx-2 sm:mt-0">
            <Link href="#" className="mx-2 text-sm text-muted-foreground hover:text-primary">
              Terms of Service
            </Link>
            <Link href="#" className="mx-2 text-sm text-muted-foreground hover:text-primary">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
