import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { toast } from 'sonner'; // For notifications

import { ShoppingCart, CreditCard, Truck, User, MapPin, Home, ShieldCheck } from 'lucide-react';

// Schemas for validation
const shippingAddressSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  addressLine1: z.string().min(5, { message: "Address is too short." }),
  addressLine2: z.string().optional(),
  city: z.string().min(2, { message: "City name is too short." }),
  postalCode: z.string().min(4, { message: "Postal code is too short." }),
  country: z.string().min(2, { message: "Please select a country." }),
  phoneNumber: z.string().min(7, { message: "Phone number is too short." }).optional(),
});

type ShippingAddressValues = z.infer<typeof shippingAddressSchema>;

const paymentDetailsSchema = z.object({
  cardholderName: z.string().min(2, { message: "Cardholder name is too short." }),
  cardNumber: z.string().refine(val => /^\d{13,19}$/.test(val.replace(/\s/g, '')), { message: "Invalid card number format." }),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: "Expiry date must be MM/YY." }),
  cvc: z.string().regex(/^\d{3,4}$/, { message: "CVC must be 3 or 4 digits." }),
  billingSameAsShipping: z.boolean().default(true),
  billingAddressLine1: z.string().optional(),
  billingCity: z.string().optional(),
  billingPostalCode: z.string().optional(),
  billingCountry: z.string().optional(),
}).refine(data => {
    if (!data.billingSameAsShipping) {
      return !!data.billingAddressLine1 && !!data.billingCity && !!data.billingPostalCode && !!data.billingCountry;
    }
    return true;
  }, {
  message: "Billing address details are required if different from shipping.",
  path: ["billingAddressLine1"], // Path to show error if condition fails, applies to a specific field or general form.
});

type PaymentDetailsValues = z.infer<typeof paymentDetailsSchema>;


const CheckoutPage = () => {
  console.log('CheckoutPage loaded');
  const navigate = useNavigate();
  const [activeAccordionItem, setActiveAccordionItem] = useState<string | undefined>("shipping-address");
  const [shippingCost, setShippingCost] = useState<number>(5.00); // Default shipping cost

  const shippingForm = useForm<ShippingAddressValues>({
    resolver: zodResolver(shippingAddressSchema),
    defaultValues: {
      fullName: "",
      email: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      postalCode: "",
      country: "",
      phoneNumber: "",
    },
  });

  const paymentForm = useForm<PaymentDetailsValues>({
    resolver: zodResolver(paymentDetailsSchema),
    defaultValues: {
      cardholderName: "",
      cardNumber: "",
      expiryDate: "",
      cvc: "",
      billingSameAsShipping: true,
    },
  });

  const onSubmitShipping = (data: ShippingAddressValues) => {
    console.log("Shipping Data:", data);
    toast.success("Shipping address saved!", { description: "Proceed to select shipping method."});
    setActiveAccordionItem("shipping-method");
  };

  const onSelectShippingMethod = (value: string) => {
    const cost = value === "express" ? 15.00 : 5.00;
    setShippingCost(cost);
    console.log("Shipping Method Selected:", value, "Cost:", cost);
    toast.success("Shipping method selected!", { description: `You chose ${value === 'express' ? 'Express' : 'Standard'} Shipping.` });
    setActiveAccordionItem("payment-details");
  };
  
  const onSubmitPayment = (data: PaymentDetailsValues) => {
    console.log("Payment Data:", data);
    // Combine all data here if needed
    const shippingData = shippingForm.getValues();
    console.log("Full Order Details:", { shipping: shippingData, payment: data, shippingCost });
    
    toast.success("Order Placed! 🎉", {
      description: "Your Labubu is on its way! Order #LB12345.",
      duration: 5000,
    });
    // Simulate redirect to a confirmation page or homepage after a delay
    setTimeout(() => {
      navigate("/"); // Navigate to homepage as per App.tsx
    }, 3000);
  };

  // Placeholder order items
  const orderItems = [
    { id: 1, name: "Sleepy Cloud Labubu", quantity: 1, price: 25.99, imageUrl: "https://placehold.co/100x100/fecaca/831843?text=Labubu1" },
    { id: 2, name: "Adventure Time Labubu", quantity: 1, price: 29.99, imageUrl: "https://placehold.co/100x100/fecaca/831843?text=Labubu2" },
  ];
  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + shippingCost;

  return (
    <div className="bg-pink-50 min-h-screen flex flex-col font-sans">
      {/* Simplified Header for Checkout Page */}
      <header className="bg-white shadow-md py-4 px-6 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-3xl font-bold text-pink-600 hover:text-pink-700 transition-colors">
            Labubu Store
          </Link>
          <div className="flex items-center space-x-2 text-pink-500">
            <ShieldCheck className="h-6 w-6" />
            <span className="text-sm font-medium">Secure Checkout</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 flex-grow">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/"> <Home className="h-4 w-4 mr-1 inline-block" />Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/cart"> <ShoppingCart className="h-4 w-4 mr-1 inline-block" />Cart</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-semibold text-pink-600">Checkout</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-4xl font-bold text-pink-700 mb-8 text-center">Complete Your Purchase</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Steps */}
          <div className="lg:col-span-2">
            <Accordion 
              type="single" 
              collapsible 
              className="w-full space-y-4" 
              value={activeAccordionItem}
              onValueChange={setActiveAccordionItem}
            >
              {/* Step 1: Shipping Address */}
              <AccordionItem value="shipping-address" className="bg-white rounded-lg shadow-lg border border-pink-200">
                <AccordionTrigger className="text-xl font-semibold px-6 py-4 hover:bg-pink-100 transition-colors rounded-t-lg">
                  <span className="flex items-center"><User className="mr-3 h-6 w-6 text-pink-500" />1. Shipping Address</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 border-t border-pink-200">
                  <Form {...shippingForm}>
                    <form onSubmit={shippingForm.handleSubmit(onSubmitShipping)} className="space-y-6">
                      <FormField
                        control={shippingForm.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-pink-700">Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Labubu Lover" {...field} className="border-pink-300 focus:border-pink-500 focus:ring-pink-500" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={shippingForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-pink-700">Email Address</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="lover@labubu.world" {...field} className="border-pink-300 focus:border-pink-500 focus:ring-pink-500" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={shippingForm.control}
                        name="addressLine1"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-pink-700">Address Line 1</FormLabel>
                            <FormControl>
                              <Input placeholder="123 Labubu Lane" {...field} className="border-pink-300 focus:border-pink-500 focus:ring-pink-500" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={shippingForm.control}
                        name="addressLine2"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-pink-700">Address Line 2 (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="Apt, Suite, etc." {...field} className="border-pink-300 focus:border-pink-500 focus:ring-pink-500" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={shippingForm.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-pink-700">City</FormLabel>
                              <FormControl>
                                <Input placeholder="Dollsville" {...field} className="border-pink-300 focus:border-pink-500 focus:ring-pink-500" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={shippingForm.control}
                          name="postalCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-pink-700">Postal Code</FormLabel>
                              <FormControl>
                                <Input placeholder="LBU BBU" {...field} className="border-pink-300 focus:border-pink-500 focus:ring-pink-500" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={shippingForm.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-pink-700">Country</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="border-pink-300 focus:border-pink-500 focus:ring-pink-500">
                                  <SelectValue placeholder="Select a country" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="usa">United States</SelectItem>
                                <SelectItem value="canada">Canada</SelectItem>
                                <SelectItem value="uk">United Kingdom</SelectItem>
                                <SelectItem value="labubu_land">Labubu Land</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                       <FormField
                        control={shippingForm.control}
                        name="phoneNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-pink-700">Phone Number (Optional)</FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder="(555) LAB-UBUU" {...field} className="border-pink-300 focus:border-pink-500 focus:ring-pink-500" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" size="lg" className="w-full bg-pink-500 hover:bg-pink-600 text-white">
                        Continue to Shipping Method
                      </Button>
                    </form>
                  </Form>
                </AccordionContent>
              </AccordionItem>

              {/* Step 2: Shipping Method */}
              <AccordionItem value="shipping-method" className="bg-white rounded-lg shadow-lg border border-pink-200">
                <AccordionTrigger className="text-xl font-semibold px-6 py-4 hover:bg-pink-100 transition-colors rounded-t-lg" disabled={!shippingForm.formState.isValid}>
                  <span className="flex items-center"><Truck className="mr-3 h-6 w-6 text-pink-500" />2. Shipping Method</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 border-t border-pink-200">
                  <RadioGroup defaultValue="standard" onValueChange={onSelectShippingMethod} className="space-y-4">
                    <Label htmlFor="standard-shipping" className="flex items-center p-4 border border-pink-300 rounded-md hover:bg-pink-50 cursor-pointer transition-colors has-[:checked]:bg-pink-100 has-[:checked]:border-pink-500">
                      <RadioGroupItem value="standard" id="standard-shipping" className="mr-3" />
                      <div>
                        <span className="font-medium text-pink-700">Standard Shipping (5-7 days)</span>
                        <p className="text-sm text-gray-600">$5.00</p>
                      </div>
                    </Label>
                    <Label htmlFor="express-shipping" className="flex items-center p-4 border border-pink-300 rounded-md hover:bg-pink-50 cursor-pointer transition-colors has-[:checked]:bg-pink-100 has-[:checked]:border-pink-500">
                      <RadioGroupItem value="express" id="express-shipping" className="mr-3" />
                      <div>
                        <span className="font-medium text-pink-700">Express Shipping (1-3 days)</span>
                        <p className="text-sm text-gray-600">$15.00</p>
                      </div>
                    </Label>
                  </RadioGroup>
                </AccordionContent>
              </AccordionItem>

              {/* Step 3: Payment Details */}
              <AccordionItem value="payment-details" className="bg-white rounded-lg shadow-lg border border-pink-200">
                <AccordionTrigger className="text-xl font-semibold px-6 py-4 hover:bg-pink-100 transition-colors rounded-t-lg" disabled={!shippingForm.formState.isValid || activeAccordionItem === 'shipping-address'}>
                  <span className="flex items-center"><CreditCard className="mr-3 h-6 w-6 text-pink-500" />3. Payment Details</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 border-t border-pink-200">
                  <Form {...paymentForm}>
                    <form onSubmit={paymentForm.handleSubmit(onSubmitPayment)} className="space-y-6">
                      <FormField
                        control={paymentForm.control}
                        name="cardholderName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-pink-700">Cardholder Name</FormLabel>
                            <FormControl>
                              <Input placeholder="As it appears on card" {...field} className="border-pink-300 focus:border-pink-500 focus:ring-pink-500"/>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={paymentForm.control}
                        name="cardNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-pink-700">Card Number</FormLabel>
                            <FormControl>
                              <Input placeholder="•••• •••• •••• ••••" {...field} className="border-pink-300 focus:border-pink-500 focus:ring-pink-500"/>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={paymentForm.control}
                          name="expiryDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-pink-700">Expiry Date</FormLabel>
                              <FormControl>
                                <Input placeholder="MM/YY" {...field} className="border-pink-300 focus:border-pink-500 focus:ring-pink-500"/>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={paymentForm.control}
                          name="cvc"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-pink-700">CVC</FormLabel>
                              <FormControl>
                                <Input placeholder="•••" {...field} className="border-pink-300 focus:border-pink-500 focus:ring-pink-500"/>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={paymentForm.control}
                        name="billingSameAsShipping"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-pink-200 p-4 shadow-sm bg-pink-50">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel className="text-pink-700">
                                My billing address is the same as my shipping address
                              </FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                      {!paymentForm.watch("billingSameAsShipping") && (
                        <div className="space-y-4 p-4 border border-pink-200 rounded-md bg-pink-50">
                          <h3 className="text-md font-semibold text-pink-700">Billing Address</h3>
                           <FormField
                              control={paymentForm.control}
                              name="billingAddressLine1"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-pink-700">Billing Address Line 1</FormLabel>
                                  <FormControl><Input placeholder="Billing Address" {...field} className="border-pink-300 focus:border-pink-500 focus:ring-pink-500"/></FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                control={paymentForm.control}
                                name="billingCity"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel className="text-pink-700">Billing City</FormLabel>
                                    <FormControl><Input placeholder="Billing City" {...field} className="border-pink-300 focus:border-pink-500 focus:ring-pink-500"/></FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                                <FormField
                                control={paymentForm.control}
                                name="billingPostalCode"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel className="text-pink-700">Billing Postal Code</FormLabel>
                                    <FormControl><Input placeholder="Billing Postal" {...field} className="border-pink-300 focus:border-pink-500 focus:ring-pink-500"/></FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                            </div>
                            <FormField
                              control={paymentForm.control}
                              name="billingCountry"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-pink-700">Billing Country</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger className="border-pink-300 focus:border-pink-500 focus:ring-pink-500">
                                        <SelectValue placeholder="Select billing country" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="usa_billing">United States</SelectItem>
                                      <SelectItem value="canada_billing">Canada</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                        </div>
                      )}
                      <Button 
                        type="submit" 
                        size="lg" 
                        className="w-full bg-green-500 hover:bg-green-600 text-white text-lg py-3"
                        disabled={!shippingForm.formState.isValid || activeAccordionItem !== 'payment-details'}
                      >
                        <CreditCard className="mr-2 h-5 w-5" /> Place Order Securely
                      </Button>
                    </form>
                  </Form>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Order Summary */}
          <aside className="lg:col-span-1">
            <Card className="sticky top-24 shadow-xl border-2 border-pink-300 bg-white">
              <CardHeader className="bg-pink-100 border-b border-pink-300 rounded-t-lg">
                <CardTitle className="text-2xl text-pink-700 flex items-center">
                  <ShoppingCart className="mr-3 h-7 w-7" /> Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {orderItems.map(item => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center">
                      <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded-md object-cover mr-3 border border-pink-200" />
                      <div>
                        <p className="font-semibold text-pink-600">{item.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-semibold text-pink-600">${item.price.toFixed(2)}</p>
                  </div>
                ))}
                <hr className="my-4 border-pink-200" />
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping</span>
                    <span>${shippingCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-pink-700 mt-2">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-pink-50 border-t border-pink-200 p-6 rounded-b-lg">
                 <p className="text-xs text-pink-500 text-center w-full">
                  Your Labubus are excited to meet you! Thanks for shopping with us. ✨
                </p>
              </CardFooter>
            </Card>
          </aside>
        </div>
      </main>

      {/* Simplified Footer */}
      <footer className="bg-pink-200 text-center py-8 text-pink-800 mt-12">
        <p className="font-semibold">&copy; {new Date().getFullYear()} Labubu Doll Store. All Rights Reserved.</p>
        <p className="text-sm">For the love of cute and whimsical friends!</p>
        <div className="mt-2">
            <Link to="/product-listing" className="text-pink-600 hover:underline mx-2">Continue Shopping</Link>
            <span className="text-pink-400">|</span>
            <Link to="/" className="text-pink-600 hover:underline mx-2">Back to Home</Link>
        </div>
      </footer>
    </div>
  );
};

export default CheckoutPage;