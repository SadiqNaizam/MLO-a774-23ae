import React from 'react';
import { Link } from 'react-router-dom';
import HeroBanner from '@/components/HeroBanner'; // Custom component
import LabubuProductCard from '@/components/LabubuProductCard'; // Custom component
import { Button } from '@/components/ui/button'; // shadcn/ui
import { ShoppingBag, Search, Heart } from 'lucide-react'; // Icons for header/footer or general use

// Placeholder data for LabubuProductCard components
const featuredProducts = [
  {
    id: '1',
    slug: 'dreamy-unicorn-labubu',
    name: 'Dreamy Unicorn Labubu',
    price: 59.99,
    imageUrl: 'https://placehold.co/400x400/f3e8ff/86198f?text=Unicorn+Labubu&font=lora', // Light purple bg, dark purple text
    isNew: true,
  },
  {
    id: '2',
    slug: 'starry-night-labubu',
    name: 'Starry Night Labubu',
    price: 64.50,
    imageUrl: 'https://placehold.co/400x400/e0f2fe/075985?text=Starry+Labubu&font=lora', // Light blue bg, dark blue text
  },
  {
    id: '3',
    slug: 'sunflower-joy-labubu',
    name: 'Sunflower Joy Labubu',
    price: 55.00,
    imageUrl: 'https://placehold.co/400x400/fef9c3/b45309?text=Sunflower+Labubu&font=lora', // Light yellow bg, dark yellow text
  },
  {
    id: '4',
    slug: 'sleepy-cloud-labubu',
    name: 'Sleepy Cloud Labubu', // From user journey
    price: 62.00,
    imageUrl: 'https://placehold.co/400x400/cffafe/0e7490?text=Cloud+Labubu&font=lora', // Light cyan bg, dark cyan text
    isOutOfStock: true,
  }
];

// Simple Header component structure as per user journey mapping
const SiteHeader = () => {
  console.log('SiteHeader loaded for Homepage');
  return (
    <header className="bg-pink-100/80 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
        <Link to="/" className="text-3xl font-bold text-pink-600 hover:text-pink-700 transition-colors" style={{ fontFamily: "'Comic Sans MS', 'Chalkboard SE', 'Marker Felt', sans-serif" }}>
          Labubu Store
        </Link>
        <nav className="space-x-4 sm:space-x-6">
          <Link to="/product-listing" className="text-gray-700 hover:text-pink-500 transition-colors font-medium">
            Shop All
          </Link>
          <Link to="/cart" className="text-gray-700 hover:text-pink-500 transition-colors font-medium flex items-center">
            <ShoppingBag className="h-5 w-5 mr-1" /> Cart
          </Link>
          {/* Example other links
          <Link to="/about" className="text-gray-700 hover:text-pink-500 transition-colors font-medium">
            About Us
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-pink-500 transition-colors font-medium">
            Contact
          </Link>
          */}
        </nav>
      </div>
    </header>
  );
};

// Simple Footer component structure
const SiteFooter = () => {
  console.log('SiteFooter loaded for Homepage');
  return (
    <footer className="bg-pink-800 text-pink-100 text-center p-8 mt-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          <div>
            <h3 className="text-xl font-semibold mb-2 text-white">Labubu Store</h3>
            <p className="text-sm">Your magical place for all things Labubu!</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-white">Quick Links</h3>
            <ul className="space-y-1">
              <li><Link to="/product-listing" className="hover:underline">Shop All</Link></li>
              <li><Link to="/cart" className="hover:underline">My Cart</Link></li>
              <li><Link to="/#faq" className="hover:underline">FAQs</Link></li> {/* Example hash link */}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-white">Follow Us</h3>
            <p className="text-sm">Join the Labubu community!</p>
            {/* Placeholder for social icons */}
            <div className="flex justify-center space-x-3 mt-2">
                <Heart className="w-6 h-6 hover:text-pink-300 cursor-pointer"/>
                <Search className="w-6 h-6 hover:text-pink-300 cursor-pointer"/> {/* Just example icons */}
            </div>
          </div>
        </div>
        <p className="text-sm border-t border-pink-700 pt-6">
          &copy; {new Date().getFullYear()} Labubu Doll Store. All rights reserved. Made with <Heart className="inline h-4 w-4 text-red-400" /> for Labubu fans!
        </p>
      </div>
    </footer>
  );
};


const Homepage = () => {
  console.log('Homepage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50"> {/* Whimsical gradient background */}
      <SiteHeader />

      <main className="flex-grow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Hero Section */}
          <HeroBanner
            title="Welcome to the Labubu Universe!"
            subtitle="Discover enchanting Labubu dolls, new arrivals, and exclusive collections. Your adventure starts here!"
            ctaText="Explore Collections"
            ctaLink="/product-listing" // Ensures link to Product Listing Page
            imageUrl="https://placehold.co/1600x700/fce7f3/db2777?text=Labubu+Magic!&font=pacifico" // Pinkish placeholder
          />

          {/* Featured Products Section */}
          <section className="mt-12 sm:mt-16">
            <h2 
              className="text-3xl sm:text-4xl font-bold text-center text-pink-600 mb-8 sm:mb-10"
              style={{ fontFamily: "'Comic Sans MS', 'Chalkboard SE', 'Marker Felt', sans-serif" }}
            >
              Fan Favorites
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
              {featuredProducts.map((product) => (
                <LabubuProductCard
                  key={product.id}
                  id={product.id}
                  slug={product.slug}
                  name={product.name}
                  price={product.price}
                  imageUrl={product.imageUrl}
                  isNew={product.isNew}
                  isOutOfStock={product.isOutOfStock}
                />
              ))}
            </div>
            <div className="text-center mt-10 sm:mt-12">
              <Link to="/product-listing">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-pink-500 text-pink-600 hover:bg-pink-500 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg px-10 py-3 rounded-full font-semibold"
                >
                  View All Products
                </Button>
              </Link>
            </div>
          </section>

           {/* Additional Content Section (Example) */}
          <section className="mt-12 sm:mt-16 py-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-purple-600 mb-6">
              Why You'll Love Labubu
            </h2>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="p-4">
                <Sparkles className="mx-auto h-12 w-12 text-yellow-400 mb-3" />
                <h3 className="text-xl font-semibold text-slate-700 mb-1">Unique Designs</h3>
                <p className="text-sm text-slate-500">Each Labubu is crafted with love and a touch of magic.</p>
              </div>
              <div className="p-4">
                <Heart className="mx-auto h-12 w-12 text-red-400 mb-3" />
                <h3 className="text-xl font-semibold text-slate-700 mb-1">Collectible Joy</h3>
                <p className="text-sm text-slate-500">Build your dream collection of adorable characters.</p>
              </div>
              <div className="p-4">
                <ShoppingBag className="mx-auto h-12 w-12 text-green-400 mb-3" />
                <h3 className="text-xl font-semibold text-slate-700 mb-1">Easy Shopping</h3>
                <p className="text-sm text-slate-500">A delightful experience from browsing to unboxing.</p>
              </div>
            </div>
          </section>

        </div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default Homepage;