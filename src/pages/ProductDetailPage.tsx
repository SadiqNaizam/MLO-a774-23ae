import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner'; // For notifications

// Custom Components
import LabubuProductCard from '@/components/LabubuProductCard';

// Shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

// Lucide Icons
import { ShoppingCart, Plus, Minus, Star, Heart, Home, Package, Info, MessageSquare } from 'lucide-react';

// Mock Product Data
interface ProductReview {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

interface ProductSpecification {
  title: string;
  content: string;
}

interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  images: string[];
  description: string;
  shortDescription: string;
  specifications: ProductSpecification[];
  availability: 'In Stock' | 'Out of Stock' | 'Pre-order';
  sku: string;
  reviews: ProductReview[];
  series?: string;
  tags?: string[];
}

const mockProducts: Record<string, Product> = {
  "sleepy-cloud-labubu": {
    id: "1",
    slug: "sleepy-cloud-labubu",
    name: "Sleepy Cloud Labubu",
    price: 29.99,
    images: [
      "https://placehold.co/600x600/E0F2FE/0EA5E9?text=Labubu+Cloud+1&font=lora",
      "https://placehold.co/600x600/FBCFE8/DB2777?text=Labubu+Cloud+2&font=lora",
      "https://placehold.co/600x600/F3E8FF/7E22CE?text=Labubu+Cloud+3&font=lora",
    ],
    description: "Drift into dreams with the Sleepy Cloud Labubu, adorned in a fluffy cloud-themed outfit. This charming doll is perfect for gentle cuddles and imaginative play, bringing a touch of sky-blue serenity to your collection. Each detail is crafted with love, making it a precious addition for any Labubu enthusiast.",
    shortDescription: "A dreamy companion in a fluffy cloud outfit, ready for cuddles.",
    specifications: [
      { title: "Material", content: "High-quality Vinyl, Soft Fabric Outfit" },
      { title: "Height", content: "Approximately 10cm (4 inches)" },
      { title: "Series", content: "Dreamland Collection" },
      { title: "Designer", content: "Kasing Lung x POP MART" },
      { title: "Packaging", content: "Collector's Edition Whimsical Box" }
    ],
    availability: "In Stock",
    sku: "LBB-DC-001",
    series: "Dreamland Collection",
    tags: ["Cloud", "Sleepy", "Blue", "Cute"],
    reviews: [
      { id: "r1", author: "Ella F.", rating: 5, comment: "Absolutely adorable! The details are amazing, so soft and cuddly.", date: "2024-07-15" },
      { id: "r2", author: "Ben K.", rating: 4, comment: "My daughter loves it. Very well made and arrived quickly!", date: "2024-07-10" }
    ]
  },
  "strawberry-bliss-labubu": { // For related products
    id: "2",
    slug: "strawberry-bliss-labubu",
    name: "Strawberry Bliss Labubu",
    price: 32.50,
    images: ["https://placehold.co/600x600/FCE7F3/DB2777?text=Strawberry+Labubu&font=lora"],
    description: "Sweet and delightful, the Strawberry Bliss Labubu is a treat for the eyes.",
    shortDescription: "A berry sweet Labubu in a strawberry outfit.",
    specifications: [{ title: "Material", content: "Vinyl" }, { title: "Height", content: "10cm" }],
    availability: "In Stock",
    sku: "LBB-SB-002",
    reviews: []
  },
};

const relatedProductsData = [
  { id: "sb01", slug: "strawberry-bliss-labubu", name: "Strawberry Bliss Labubu", price: 32.50, imageUrl: "https://placehold.co/300x300/FCE7F3/DB2777?text=Strawberry+Bliss&font=lora", isNew: true },
  { id: "fe01", slug: "forest-explorer-labubu", name: "Forest Explorer Labubu", price: 28.00, imageUrl: "https://placehold.co/300x300/D1FAE5/059669?text=Forest+Explorer&font=lora" },
  { id: "cs01", slug: "cosmic-star-labubu", name: "Cosmic Star Labubu", price: 35.00, imageUrl: "https://placehold.co/300x300/E0E7FF/4338CA?text=Cosmic+Star&font=lora", isOutOfStock: true },
  { id: "sp01", slug: "spring-flower-labubu", name: "Spring Flower Labubu", price: 30.00, imageUrl: "https://placehold.co/300x300/FEF3C7/F59E0B?text=Spring+Flower&font=lora" },
];


const ProductDetailPage: React.FC = () => {
  console.log('ProductDetailPage loaded');
  const [searchParams] = useSearchParams();
  const productSlug = searchParams.get('slug');

  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (productSlug && mockProducts[productSlug]) {
      setProduct(mockProducts[productSlug]);
    } else {
      setProduct(null); // Handle product not found
    }
    setQuantity(1); // Reset quantity when product changes
  }, [productSlug]);

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(Math.max(1, newQuantity));
  };

  const handleAddToCart = () => {
    if (product && product.availability === "In Stock") {
      toast.success(`${product.name} added to your cart!`, {
        description: `Quantity: ${quantity}. Time for a new friend!`,
        icon: <ShoppingCart className="h-5 w-5 text-pink-500" />,
      });
      console.log(`Added ${quantity} of ${product.name} (ID: ${product.id}) to cart.`);
      // Add to cart logic would go here (e.g., update context/state)
    }
  };

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen bg-pink-50">
        {/* Simplified Header for Not Found */}
        <header className="bg-pink-100 text-pink-700 p-4 shadow-md sticky top-0 z-50">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold font-['Comic_Sans_MS',_cursive]">Labubu Doll Store</Link>
            <nav className="space-x-4">
              <Link to="/" className="hover:text-pink-500 transition-colors">Home</Link>
              <Link to="/product-listing" className="hover:text-pink-500 transition-colors">Shop All</Link>
              <Link to="/cart" className="hover:text-pink-500 transition-colors">
                <ShoppingCart className="inline-block h-5 w-5" /> Cart
              </Link>
            </nav>
          </div>
        </header>
        <main className="flex-grow flex flex-col items-center justify-center text-center p-8">
          <img src="https://placehold.co/200x200/FBCFE8/DB2777?text=Sad+Labubu&font=lora" alt="Sad Labubu" className="w-48 h-48 mb-8 rounded-full shadow-lg" />
          <h1 className="text-4xl font-bold text-pink-600 mb-4">Oh no! Product Not Found</h1>
          <p className="text-gray-600 mb-8 text-lg">We couldn't find the Labubu you're looking for. Maybe it's on an adventure?</p>
          <Button asChild size="lg" className="bg-pink-500 hover:bg-pink-600 text-white">
            <Link to="/product-listing">Explore Other Labubus</Link>
          </Button>
        </main>
        <footer className="bg-pink-100 text-pink-700 p-6 text-center">
          <p>&copy; {new Date().getFullYear()} Labubu Doll Store. All whimsical rights reserved.</p>
        </footer>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-pink-50 selection:bg-pink-200 selection:text-pink-800">
      {/* Header */}
      <header className="bg-pink-100 text-pink-700 p-4 shadow-md sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold font-['Comic_Sans_MS',_cursive] hover:text-pink-500 transition-colors">Labubu Doll Store</Link>
          <nav className="space-x-3 sm:space-x-4">
            <Button variant="ghost" asChild className="hover:bg-pink-200 hover:text-pink-600">
              <Link to="/"><Home className="mr-1 h-4 w-4 sm:mr-2"/>Home</Link>
            </Button>
            <Button variant="ghost" asChild className="hover:bg-pink-200 hover:text-pink-600">
              <Link to="/product-listing"><Package className="mr-1 h-4 w-4 sm:mr-2"/>Shop All</Link>
            </Button>
            <Button variant="ghost" asChild className="hover:bg-pink-200 hover:text-pink-600">
              <Link to="/cart"><ShoppingCart className="mr-1 h-4 w-4 sm:mr-2"/>Cart</Link>
            </Button>
          </nav>
        </div>
      </header>

      <ScrollArea className="flex-1">
        <main className="container mx-auto px-4 py-6 sm:py-8">
          {/* Breadcrumbs */}
          <Breadcrumb className="mb-6 text-sm text-gray-600">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/" className="hover:text-pink-500">Home</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/product-listing" className="hover:text-pink-500">Product Listing</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-pink-600 font-medium">{product.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Product Details Grid */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left: Image Carousel */}
            <Card className="shadow-xl rounded-xl overflow-hidden bg-white border-pink-200">
              <CardContent className="p-2 sm:p-4">
                <Carousel className="w-full max-w-md mx-auto" opts={{ loop: true }}>
                  <CarouselContent>
                    {product.images.map((img, index) => (
                      <CarouselItem key={index} className="rounded-lg overflow-hidden">
                        <img src={img} alt={`${product.name} - View ${index + 1}`} className="w-full h-auto object-cover aspect-square rounded-md" />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  {product.images.length > 1 && (
                    <>
                      <CarouselPrevious className="left-2 bg-white/70 hover:bg-pink-100 text-pink-500 border-pink-300" />
                      <CarouselNext className="right-2 bg-white/70 hover:bg-pink-100 text-pink-500 border-pink-300" />
                    </>
                  )}
                </Carousel>
              </CardContent>
            </Card>

            {/* Right: Product Info & Actions */}
            <div className="space-y-4 py-2">
              <h1 className="text-3xl sm:text-4xl font-bold text-pink-700">{product.name}</h1>
              {product.series && <p className="text-md text-pink-500">{product.series}</p>}

              <div className="flex items-baseline space-x-2">
                <p className="text-3xl font-bold text-pink-600">${product.price.toFixed(2)}</p>
                {product.availability === "In Stock" && <Badge className="bg-green-100 text-green-700 border-green-300">In Stock</Badge>}
                {product.availability === "Out of Stock" && <Badge variant="destructive">Out of Stock</Badge>}
                {product.availability === "Pre-order" && <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-300">Pre-order</Badge>}
              </div>
              
              <p className="text-gray-700 leading-relaxed">{product.shortDescription}</p>
              
              <div className="flex items-center space-x-2 my-6">
                <span className="text-sm font-medium text-gray-700">Quantity:</span>
                <Button variant="outline" size="icon" onClick={() => handleQuantityChange(quantity - 1)} disabled={quantity <= 1} className="border-pink-300 hover:bg-pink-50">
                  <Minus className="h-4 w-4 text-pink-500" />
                </Button>
                <Input type="number" value={quantity} onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)} className="w-16 text-center border-pink-300 focus:border-pink-500 focus:ring-pink-500" min="1" />
                <Button variant="outline" size="icon" onClick={() => handleQuantityChange(quantity + 1)} className="border-pink-300 hover:bg-pink-50">
                  <Plus className="h-4 w-4 text-pink-500" />
                </Button>
              </div>
              
              <Button 
                size="lg" 
                className="w-full bg-pink-500 hover:bg-pink-600 text-white text-lg py-3 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105" 
                onClick={handleAddToCart} 
                disabled={product.availability !== "In Stock"}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {product.availability === "In Stock" ? "Add to Cart" : "Currently Unavailable"}
              </Button>
              <Button variant="outline" size="lg" className="w-full mt-2 border-pink-400 text-pink-500 hover:bg-pink-50 hover:text-pink-600">
                <Heart className="mr-2 h-5 w-5" /> Add to Wishlist
              </Button>
            </div>
          </div>

          {/* Tabs for Description, Details, Reviews */}
          <Tabs defaultValue="description" className="mt-10 sm:mt-16">
            <TabsList className="grid w-full grid-cols-3 bg-pink-100 rounded-lg p-1">
              <TabsTrigger value="description" className="data-[state=active]:bg-white data-[state=active]:text-pink-600 data-[state=active]:shadow-md hover:bg-pink-50">
                <Info className="mr-2 h-4 w-4" />Description
              </TabsTrigger>
              <TabsTrigger value="details" className="data-[state=active]:bg-white data-[state=active]:text-pink-600 data-[state=active]:shadow-md hover:bg-pink-50">
                <Package className="mr-2 h-4 w-4" />Details & Dimensions
              </TabsTrigger>
              <TabsTrigger value="reviews" className="data-[state=active]:bg-white data-[state=active]:text-pink-600 data-[state=active]:shadow-md hover:bg-pink-50">
                 <MessageSquare className="mr-2 h-4 w-4" />Reviews ({product.reviews.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-4">
              <Card className="bg-white shadow-lg rounded-lg border-pink-100">
                <CardContent className="p-6 text-gray-700 leading-relaxed whitespace-pre-line">
                  {product.description}
                  {product.tags && product.tags.length > 0 && (
                    <div className="mt-4">
                      <span className="font-semibold text-pink-600">Tags: </span>
                      {product.tags.map(tag => <Badge key={tag} variant="secondary" className="mr-1 bg-pink-100 text-pink-700">{tag}</Badge>)}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="details" className="mt-4">
              <Card className="bg-white shadow-lg rounded-lg border-pink-100">
                <CardContent className="p-6">
                  <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
                    {product.specifications.map((spec, index) => (
                      <AccordionItem value={`item-${index}`} key={index} className="border-pink-200">
                        <AccordionTrigger className="text-md font-medium text-pink-700 hover:text-pink-500 hover:no-underline">{spec.title}</AccordionTrigger>
                        <AccordionContent className="text-gray-600 pt-1 pb-3">{spec.content}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-4">
              <Card className="bg-white shadow-lg rounded-lg border-pink-100">
                <CardHeader>
                    <CardTitle className="text-pink-700">Customer Reviews</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {product.reviews.length > 0 ? (
                    product.reviews.map(review => (
                      <div key={review.id} className="border-b border-pink-100 pb-4 last:border-b-0">
                        <div className="flex items-center mb-1">
                          {Array(5).fill(0).map((_, i) => (
                            <Star key={i} className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                          ))}
                           <span className="ml-2 text-sm font-semibold text-pink-600">{review.author}</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-1">{new Date(review.date).toLocaleDateString()}</p>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600 py-4 text-center">✨ Be the first to share your thoughts on this Labubu! ✨</p>
                  )}
                  <Button variant="outline" className="mt-4 w-full sm:w-auto border-pink-400 text-pink-500 hover:bg-pink-50 hover:text-pink-600">Write a Review</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Related Products Section */}
          <section className="mt-16 sm:mt-24">
            <h2 className="text-3xl font-bold mb-8 text-center text-pink-700">You Might Also Like These Labubus!</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProductsData.map(prod => (
                <LabubuProductCard
                  key={prod.id}
                  id={prod.id}
                  slug={prod.slug}
                  name={prod.name}
                  price={prod.price}
                  imageUrl={prod.imageUrl}
                  isNew={prod.isNew}
                  isOutOfStock={prod.isOutOfStock}
                />
              ))}
            </div>
          </section>
        </main>
      </ScrollArea>

      {/* Footer */}
      <footer className="bg-pink-100 text-pink-700 p-8 text-center mt-auto">
        <p className="font-semibold">&copy; {new Date().getFullYear()} Labubu Doll Store.</p>
        <p className="text-sm">Bringing joy and whimsy to collectors worldwide. Made with ♡.</p>
        <div className="mt-2 space-x-3">
            <Link to="/about" className="hover:text-pink-500 text-xs">About Us</Link>
            <Link to="/contact" className="hover:text-pink-500 text-xs">Contact</Link>
            <Link to="/faq" className="hover:text-pink-500 text-xs">FAQ</Link>
        </div>
      </footer>
    </div>
  );
};

export default ProductDetailPage;