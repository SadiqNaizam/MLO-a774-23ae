import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import LabubuProductCard from '@/components/LabubuProductCard'; // Assuming this path is correct as per project structure

// shadcn/ui Components
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Lucide React Icons
import { Search as SearchIcon, Home as HomeIcon, ListFilter, Tag } from 'lucide-react';

// Sample Product Data Interface
interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  imageUrl: string;
  isNew?: boolean;
  isOutOfStock?: boolean;
  series?: string; // For filtering
}

// Sample Product Data
const sampleProducts: Product[] = [
  { id: '1', slug: 'sleepy-cloud-labubu', name: 'Sleepy Cloud Labubu', price: 29.99, imageUrl: 'https://placehold.co/300x300/fbcfe8/9d174d?text=Sleepy+Cloud&font=lora', isNew: true, series: 'Dreamy Series' },
  { id: '2', slug: 'sunny-day-labubu', name: 'Sunny Day Labubu', price: 32.50, imageUrl: 'https://placehold.co/300x300/fef08a/c026d3?text=Sunny+Day&font=lora', series: 'Summer Fun' },
  { id: '3', slug: 'forest-sprite-labubu', name: 'Forest Sprite Labubu', price: 28.00, imageUrl: 'https://placehold.co/300x300/dcfce7/15803d?text=Forest+Sprite&font=lora', isOutOfStock: true, series: 'Enchanted Forest' },
  { id: '4', slug: 'mini-monster-labubu', name: 'Mini Monster Labubu', price: 25.99, imageUrl: 'https://placehold.co/300x300/e0e7ff/3730a3?text=Mini+Monster&font=lora', series: 'Spooky Cute' },
  { id: '5', slug: 'dreamy-galaxy-labubu', name: 'Dreamy Galaxy Labubu', price: 35.00, imageUrl: 'https://placehold.co/300x300/f3e8ff/581c87?text=Dreamy+Galaxy&font=lora', isNew: true, series: 'Dreamy Series' },
  { id: '6', slug: 'adventure-time-labubu', name: 'Adventure Time Labubu', price: 31.00, imageUrl: 'https://placehold.co/300x300/fee2e2/9f1239?text=Adventure+Time&font=lora', series: 'Summer Fun' },
  { id: '7', slug: 'winter-wonder-labubu', name: 'Winter Wonder Labubu', price: 33.00, imageUrl: 'https://placehold.co/300x300/e0f2fe/075985?text=Winter+Wonder&font=lora', series: 'Enchanted Forest' },
  { id: '8', slug: 'robo-buddy-labubu', name: 'Robo Buddy Labubu', price: 38.00, imageUrl: 'https://placehold.co/300x300/d1d5db/1f2937?text=Robo+Buddy&font=lora', series: 'Spooky Cute' },
];

const seriesOptions = ['Dreamy Series', 'Summer Fun', 'Enchanted Forest', 'Spooky Cute', 'Classic Collection'];

const ProductListingPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedSeries, setSelectedSeries] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  useEffect(() => {
    console.log('ProductListingPage loaded');
  }, []);

  const filteredAndSortedProducts = sampleProducts
    .filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(product => selectedSeries.length === 0 || (product.series && selectedSeries.includes(product.series)))
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'newest') { // Basic "newest" sort, prioritizing `isNew` flag
        if (a.isNew && !b.isNew) return -1;
        if (!a.isNew && b.isNew) return 1;
        return sampleProducts.indexOf(a) - sampleProducts.indexOf(b); // Fallback to original order for tie-breaking
      }
      return 0;
    });

  const totalPages = Math.ceil(filteredAndSortedProducts.length / productsPerPage);
  const currentProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handleSeriesChange = (seriesName: string, checked: boolean | string) => {
    setSelectedSeries(prev =>
      checked ? [...prev, seriesName] : prev.filter(s => s !== seriesName)
    );
    setCurrentPage(1); // Reset to first page on filter change
  };
  
  const handleSortChange = (value: string) => {
    setSortBy(value);
    setCurrentPage(1); // Reset to first page on sort change
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page on search change
  }

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const paginationItems = [];
  if (totalPages > 0) {
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        paginationItems.push(
          <PaginationItem key={i}>
            <PaginationLink href="#" isActive={i === currentPage} onClick={(e) => { e.preventDefault(); handlePageChange(i); }}>
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      paginationItems.push(
        <PaginationItem key={1}>
          <PaginationLink href="#" isActive={1 === currentPage} onClick={(e) => { e.preventDefault(); handlePageChange(1); }}>1</PaginationLink>
        </PaginationItem>
      );
      if (currentPage > 3) {
        paginationItems.push(<PaginationItem key="start-ellipsis"><PaginationEllipsis /></PaginationItem>);
      }
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);
      if (currentPage <= 3) endPage = Math.min(totalPages - 1, 4);
      if (currentPage >= totalPages - 2) startPage = Math.max(2, totalPages - 3);

      for (let i = startPage; i <= endPage; i++) {
        paginationItems.push(
          <PaginationItem key={i}>
            <PaginationLink href="#" isActive={i === currentPage} onClick={(e) => { e.preventDefault(); handlePageChange(i); }}>
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
      if (currentPage < totalPages - 2) {
        paginationItems.push(<PaginationItem key="end-ellipsis"><PaginationEllipsis /></PaginationItem>);
      }
      paginationItems.push(
        <PaginationItem key={totalPages}>
          <PaginationLink href="#" isActive={totalPages === currentPage} onClick={(e) => { e.preventDefault(); handlePageChange(totalPages); }}>{totalPages}</PaginationLink>
        </PaginationItem>
      );
    }
  }


  return (
    <div className="flex flex-col min-h-screen bg-rose-50 font-sans text-slate-800">
      <header className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-pink-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link to="/" className="text-3xl font-bold text-pink-600 hover:text-pink-700 transition-colors" style={{ fontFamily: "'Comic Sans MS', 'Chalkboard SE', 'cursive'" }}>
            Labubu Store
          </Link>
          <div className="relative hidden md:block lg:w-1/3 md:w-1/2">
            <Input
              type="search"
              placeholder="Search Labubu dolls..."
              className="pl-10 w-full border-pink-300 focus:border-pink-500 focus:ring-pink-500 rounded-full shadow-sm"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-pink-400" />
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-6 lg:p-8 flex-grow">
        <Breadcrumb className="mb-6 text-sm">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/" className="hover:text-pink-600 transition-colors flex items-center text-slate-600">
                  <HomeIcon className="h-4 w-4 mr-1.5" /> Home
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-medium text-pink-700">Shop All</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <div className="relative md:hidden mb-6">
            <Input
              type="search"
              placeholder="Search Labubu dolls..."
              className="pl-10 w-full border-pink-300 focus:border-pink-500 focus:ring-pink-500 rounded-lg shadow-sm"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-pink-400" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 xl:gap-8">
          <aside className="lg:col-span-1">
            <Card className="shadow-lg rounded-xl border-pink-100 bg-white/95 sticky top-24"> {/* Sticky filter bar */}
              <CardHeader className="border-b border-pink-100">
                <CardTitle className="text-xl font-semibold text-pink-700 flex items-center">
                  <ListFilter className="h-5 w-5 mr-2.5 text-pink-500" />
                  Filter & Sort
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 space-y-6">
                <div>
                  <Label htmlFor="sort-by" className="block text-sm font-medium text-slate-700 mb-1.5">Sort by</Label>
                  <Select value={sortBy} onValueChange={handleSortChange}>
                    <SelectTrigger id="sort-by" className="w-full border-pink-300 focus:border-pink-500 focus:ring-pink-500 rounded-md shadow-sm">
                      <SelectValue placeholder="Select sorting" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-pink-200 shadow-lg rounded-md">
                      <SelectItem value="newest">Newest Arrivals</SelectItem>
                      <SelectItem value="price-asc">Price: Low to High</SelectItem>
                      <SelectItem value="price-desc">Price: High to Low</SelectItem>
                      <SelectItem value="name-asc">Name: A to Z</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <h3 className="text-md font-semibold text-slate-800 mb-3 flex items-center">
                    <Tag className="h-4 w-4 mr-2 text-pink-500" />
                    Collections
                  </h3>
                  <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1"> {/* Scrollable series filter */}
                    {seriesOptions.map((series) => (
                      <div key={series} className="flex items-center space-x-2.5 py-1">
                        <Checkbox
                          id={`series-${series.toLowerCase().replace(/\s+/g, '-')}`}
                          checked={selectedSeries.includes(series)}
                          onCheckedChange={(checked) => handleSeriesChange(series, checked as boolean)}
                          className="data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-600 border-pink-300 focus:ring-pink-400"
                        />
                        <Label
                          htmlFor={`series-${series.toLowerCase().replace(/\s+/g, '-')}`}
                          className="text-sm font-medium text-slate-600 cursor-pointer hover:text-pink-600 transition-colors"
                        >
                          {series}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          <section className="lg:col-span-3">
            {currentProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
                {currentProducts.map((product) => (
                  <LabubuProductCard key={product.id} {...product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-xl shadow-md border border-pink-100">
                <img src="https://placehold.co/150x150/fef2f2/f472b6?text=Sad+Labubu&font=lora" alt="No products found" className="mx-auto mb-6 rounded-full shadow-lg" />
                <p className="text-2xl text-pink-600 font-semibold mb-2">Oops! No Labubus found.</p>
                <p className="text-slate-500 max-w-sm mx-auto">Try adjusting your filters, checking for typos in your search, or exploring all our cute collections!</p>
              </div>
            )}

            {totalPages > 1 && (
              <Pagination className="mt-10 justify-center">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1); }}
                      className={currentPage === 1 ? "pointer-events-none opacity-60" : "hover:bg-pink-100"}
                    />
                  </PaginationItem>
                  {paginationItems}
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => { e.preventDefault(); handlePageChange(currentPage + 1); }}
                      className={currentPage === totalPages ? "pointer-events-none opacity-60" : "hover:bg-pink-100"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </section>
        </div>
      </main>

      <footer className="bg-pink-700 text-pink-100 p-8 text-center mt-auto border-t-4 border-pink-500">
        <div className="container mx-auto">
          <p className="font-semibold mb-2 text-lg" style={{ fontFamily: "'Comic Sans MS', 'Chalkboard SE', 'cursive'" }}>Labubu Doll Store &copy; {new Date().getFullYear()}</p>
          <p className="text-sm">Bringing joy one Labubu at a time! Follow us on social media for updates!</p>
          <div className="mt-4 space-x-4 text-sm">
            <Link to="/#" className="hover:text-white transition-colors">About Us</Link>
            <Link to="/#" className="hover:text-white transition-colors">Contact</Link>
            <Link to="/#" className="hover:text-white transition-colors">FAQ</Link>
            <Link to="/#" className="hover:text-white transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductListingPage;