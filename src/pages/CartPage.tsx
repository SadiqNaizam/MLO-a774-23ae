import React, 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from "@/components/ui/table";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Trash2, ShoppingCart, ArrowLeft } from 'lucide-react';

// Placeholder data for cart items - reflecting Labubu theme
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  slug: string; // For linking back to product detail if needed
}

const initialItems: CartItem[] = [
  { id: 'labubu001', name: 'Sleepy Cloud Labubu', price: 25.99, quantity: 1, imageUrl: 'https://placehold.co/80x80/fce7f3/c026d3?text=Labubu1&font=lora', slug: 'sleepy-cloud-labubu' },
  { id: 'labubu002', name: 'Rainbow Fairy Labubu', price: 29.99, quantity: 2, imageUrl: 'https://placehold.co/80x80/e0f2fe/0ea5e9?text=Labubu2&font=lora', slug: 'rainbow-fairy-labubu' },
  { id: 'labubu003', name: 'Forest Adventure Labubu', price: 22.50, quantity: 1, imageUrl: 'https://placehold.co/80x80/dcfce7/16a34a?text=Labubu3&font=lora', slug: 'forest-adventure-labubu' },
];

// Simple Header placeholder
const LabubuHeader = () => (
  <header className="bg-pink-100 border-b border-pink-200 py-4 px-6 shadow-sm">
    <div className="container mx-auto flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-pink-600 hover:text-pink-700 transition-colors" style={{ fontFamily: "'Comic Sans MS', 'Chalkboard SE', 'Marker Felt', sans-serif" }}>
        Labubu Land 💖
      </Link>
      <nav className="flex items-center space-x-6">
        <Link to="/product-listing" className="text-pink-500 hover:text-pink-700 transition-colors">Shop All</Link>
        <Link to="/cart" className="text-pink-500 hover:text-pink-700 transition-colors">
          <ShoppingCart className="inline-block h-6 w-6" /> Cart
        </Link>
        {/* Add other nav links if needed */}
      </nav>
    </div>
  </header>
);

// Simple Footer placeholder
const LabubuFooter = () => (
  <footer className="bg-pink-50 py-8 px-6 mt-12 border-t border-pink-200 text-center">
    <p className="text-pink-500 text-sm">&copy; {new Date().getFullYear()} Labubu Land. All rights reserved. Made with love for Labubus! ✨</p>
  </footer>
);


const CartPage = () => {
  const [cartItems, setCartItems] = React.useState<CartItem[]>(initialItems);
  const navigate = useNavigate();

  console.log('CartPage loaded');

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return; // Or allow 0 to remove item
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  // Placeholder for shipping, can be made dynamic
  const shippingCost = cartItems.length > 0 ? 5.00 : 0;
  const total = subtotal + shippingCost;

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col">
      <LabubuHeader />

      <main className="container mx-auto px-4 py-8 flex-grow">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Shopping Cart</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-3xl font-bold text-pink-700 mb-8 text-center" style={{ fontFamily: "'Comic Sans MS', 'Chalkboard SE', 'Marker Felt', sans-serif" }}>
          Your Magical Cart ✨
        </h1>

        {cartItems.length === 0 ? (
          <Card className="text-center py-12 bg-white shadow-lg rounded-xl border-2 border-pink-200">
            <CardContent>
              <ShoppingCart className="mx-auto h-16 w-16 text-pink-300 mb-4" />
              <p className="text-xl text-pink-600 mb-2">Your cart is currently empty!</p>
              <p className="text-gray-500 mb-6">Looks like you haven't added any Labubu friends yet.</p>
              <Button onClick={() => navigate('/product-listing')} className="bg-pink-500 hover:bg-pink-600 text-white">
                <ArrowLeft className="mr-2 h-4 w-4" /> Continue Shopping
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items Table */}
            <div className="lg:col-span-2">
              <Card className="shadow-lg rounded-xl border-2 border-pink-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl text-pink-600">Review Your Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableCaption className="sr-only">Your selected Labubu dolls.</TableCaption>
                    <TableHeader>
                      <TableRow className="border-pink-200">
                        <TableHead className="w-[100px] text-pink-700">Image</TableHead>
                        <TableHead className="text-pink-700">Product</TableHead>
                        <TableHead className="text-right text-pink-700">Price</TableHead>
                        <TableHead className="text-center text-pink-700">Quantity</TableHead>
                        <TableHead className="text-right text-pink-700">Total</TableHead>
                        <TableHead className="text-center text-pink-700">Remove</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cartItems.map(item => (
                        <TableRow key={item.id} className="border-pink-100 hover:bg-pink-50/50">
                          <TableCell>
                            <Link to={`/product-detail?slug=${item.slug}`}>
                              <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-md shadow-sm border border-pink-200" />
                            </Link>
                          </TableCell>
                          <TableCell className="font-medium text-pink-700">
                            <Link to={`/product-detail?slug=${item.slug}`} className="hover:text-pink-500 transition-colors">
                              {item.name}
                            </Link>
                          </TableCell>
                          <TableCell className="text-right text-gray-600">${item.price.toFixed(2)}</TableCell>
                          <TableCell className="text-center">
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                              min="1"
                              className="w-16 text-center mx-auto border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                            />
                          </TableCell>
                          <TableCell className="text-right text-gray-700 font-semibold">${(item.price * item.quantity).toFixed(2)}</TableCell>
                          <TableCell className="text-center">
                            <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(item.id)} className="text-red-500 hover:text-red-700 hover:bg-red-100">
                              <Trash2 className="h-5 w-5" />
                              <span className="sr-only">Remove {item.name}</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="shadow-lg rounded-xl border-2 border-pink-200 bg-white sticky top-8">
                <CardHeader>
                  <CardTitle className="text-xl text-pink-600">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-gray-700">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping (Est.)</span>
                    <span>${shippingCost.toFixed(2)}</span>
                  </div>
                  <hr className="border-pink-200 my-2" />
                  <div className="flex justify-between font-bold text-lg text-pink-700">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-3">
                  <Button 
                    size="lg" 
                    className="w-full bg-pink-500 hover:bg-pink-600 text-white text-base py-3" 
                    onClick={() => navigate('/checkout')} // Path from App.tsx
                  >
                    Proceed to Checkout <ShoppingCart className="ml-2 h-5 w-5" />
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-pink-400 text-pink-500 hover:bg-pink-50 hover:text-pink-600"
                    onClick={() => navigate('/product-listing')} // Path from App.tsx
                  >
                     <ArrowLeft className="mr-2 h-4 w-4" /> Continue Shopping
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </main>
      <LabubuFooter />
    </div>
  );
};

export default CartPage;