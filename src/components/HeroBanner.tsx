import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface HeroBannerProps {
  imageUrl?: string;
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
}

const HeroBanner: React.FC<HeroBannerProps> = ({
  imageUrl = "https://placehold.co/1600x800/fecaca/831843?text=Labubu+Adventures!&font=lora", // Light red/pink bg, dark pink text for placeholder image
  title = "New Summer Collection!",
  subtitle = "Explore the latest adorable Labubu arrivals, perfect for sunny adventures!",
  ctaText = "Shop Now",
  ctaLink = "/product-listing", // Matches route in App.tsx
}) => {
  console.log('HeroBanner loaded');

  return (
    <section 
      className="relative group w-full rounded-lg overflow-hidden shadow-xl" // Added group for hover effects on children
      style={{ minHeight: 'clamp(350px, 50vh, 600px)' }} // Responsive height
    >
      {/* Background Image Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-in-out group-hover:scale-105"
        style={{ backgroundImage: `url(${imageUrl})` }}
        aria-hidden="true"
      />
      
      {/* Overlay Layer for Text Contrast */}
      <div className="absolute inset-0 bg-black/40"></div> {/* Overlay for better text readability */}

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-6 sm:p-8 md:p-12 text-white">
        <h1 
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4"
          style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
        >
          {title}
        </h1>
        {subtitle && (
          <p 
            className="text-lg sm:text-xl md:text-2xl max-w-xl lg:max-w-2xl mb-8"
            style={{ textShadow: '0 1px 3px rgba(0,0,0,0.4)' }}
          >
            {subtitle}
          </p>
        )}
        <Link to={ctaLink} className="group/button"> {/* Nested group for button-specific hover */}
          <Button 
            size="lg" 
            className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-75"
          >
            {ctaText}
            <ArrowRight className="ml-2 h-5 w-5 group-hover/button:translate-x-1 transition-transform duration-300" />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default HeroBanner;