import Image from 'next/image';
import Link from 'next/link';

const LOGO_URL = process.env.NEXT_PUBLIC_STORAGE_URL 
  ? `${process.env.NEXT_PUBLIC_STORAGE_URL}/website-assets/circle-dish-logo.png`
  : '/images/circle-dish-logo.png'; // Fallback for local dev

export default function Header() {
  return (
    <header className="bg-background border-b border-gray-100">
      <div className="container-max">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <Image
              src={LOGO_URL}
              alt="Circle Dish - Cook. Share. Discover."
              width={200}
              height={60}
              priority
              className="h-12 w-auto"
              unoptimized={!!process.env.NEXT_PUBLIC_STORAGE_URL}
            />
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="nav-link">
              Features
            </Link>
            <Link href="#about" className="nav-link">
              About
            </Link>
            <button className="btn-secondary">
              Sign In
            </button>
            <button className="btn-primary">
              Get Started
            </button>
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
