import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Eye, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";

interface LabubuProductCardProps {
  id: string | number;
  slug: string; // For linking to product detail page, e.g., "sleepy-cloud-labubu"
  name: string;
  price: number;
  imageUrl: string;
  isNew?: boolean;
  isOutOfStock?: boolean;
  // For Labubu specific aesthetics, consider adding props like 'series' or 'themeColor'
}

const LabubuProductCard: React.FC<LabubuProductCardProps> = ({
  id,
  slug,
  name,
  price,
  imageUrl,
  isNew = false,
  isOutOfStock = false,
}) => {
  const { toast } = useToast();
  console.log('LabubuProductCard loaded for:', name);

  const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Prevent link navigation if card is wrapped in Link
    if (!isOutOfStock) {
      toast({
        title: "Added to Cart! ✨",
        description: `${name} is on its way to your collection!`,
      });
      console.log(`Added product ${id} (${name}) to cart.`);
      // Here you would typically dispatch an action to update cart state
    }
  };

  return (
    <Card className="w-full overflow-hidden transition-all duration-300 hover:shadow-lg group border-2 border-transparent hover:border-pink-200 flex flex-col bg-white rounded-xl shadow-md">
      {/* Whimsical touch: could add a small decorative SVG or image absolutely positioned here */}
      <CardHeader className="p-0 relative">
        <Link to={`/product-detail?slug=${slug}`} aria-label={`View details for ${name}`}>
          <AspectRatio ratio={1 / 1} className="bg-gray-100 rounded-t-lg">
            <img
              src={imageUrl || 'https://via.placeholder.com/300x300?text=Labubu+Doll'}
              alt={name}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105 rounded-t-lg"
            />
          </AspectRatio>
        </Link>
        {isOutOfStock && (
          <Badge variant="destructive" className="absolute top-3 right-3 z-10 text-xs px-2 py-1">
            Sold Out
          </Badge>
        )}
        {isNew && !isOutOfStock && (
          <Badge className="absolute top-3 left-3 z-10 bg-pink-400 hover:bg-pink-500 text-white text-xs px-2 py-1 border-pink-400">
            <Sparkles className="w-3 h-3 mr-1" /> New
          </Badge>
        )}
      </CardHeader>

      <CardContent className="p-4 space-y-2 flex-grow">
        <CardTitle className="text-lg font-semibold line-clamp-2 text-slate-800 group-hover:text-pink-600 transition-colors">
          <Link to={`/product-detail?slug=${slug}`} className="focus:outline-none focus:ring-2 focus:ring-pink-300 rounded">
            {name}
          </Link>
        </CardTitle>
        <p className="text-xl font-bold text-pink-500">${price.toFixed(2)}</p>
        {/* Placeholder for short description or tags if needed */}
        {/* <p className="text-xs text-gray-500 line-clamp-2">A very charming Labubu doll waiting for a new home.</p> */}
      </CardContent>

      <CardFooter className="p-3 border-t bg-slate-50 rounded-b-lg">
        <div className="flex w-full gap-2 sm:gap-3">
          <Button
            variant="outline"
            className="flex-1 border-pink-400 text-pink-500 hover:bg-pink-50 hover:text-pink-600 focus:ring-pink-300"
            asChild
          >
            <Link to={`/product-detail?slug=${slug}`}>
              <Eye className="mr-2 h-4 w-4" />
              Details
            </Link>
          </Button>
          <Button
            className="flex-1 bg-pink-500 hover:bg-pink-600 text-white focus:ring-pink-300 disabled:bg-gray-300"
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            aria-label={isOutOfStock ? `${name} is out of stock` : `Add ${name} to cart`}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            {isOutOfStock ? "Unavailable" : "Add to Cart"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LabubuProductCard;